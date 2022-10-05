const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const PRICE = 149.99;
const AFFILIATE_PERCENTAGE = 10.0; // Affiliates earn 10%


router.get('/paymentIntent', asyncHandler(async (req, res) => {
  let price = PRICE;
  const ref = req.query.ref;

  if (ref) {
    const affiliate = await User.findOne({ affiliateCode: ref });
    if (affiliate) price = +((price * 0.2).toFixed(2)); // 80% off
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: price * 100,
    currency: 'usd',
    payment_method_types: ['card']
  });

  res.status(200).send({ secret: paymentIntent.client_secret, id: paymentIntent.id });
}));

router.post('/verify', asyncHandler(async (req, res) => {
  const { paymentIntentId, username, ref } = req.body;
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  
  if (paymentIntent.status !== 'succeeded')
    throw new Error('Payment failed');
  
  // Add to affiliates referrals
  const affiliate = await User.findOne({ affiliateCode: ref });
  const affiliateCommission = ((PRICE * 0.2) * (AFFILIATE_PERCENTAGE / 100.0));

  if (affiliate) {
    affiliate.referrals.push({
      username,
      amount: +(affiliateCommission.toFixed(2))
    });
    
    await affiliate.save();
  }
  
  // Send to discord webhook
  await sendDiscordMessage('@everyone - **New Sale**', {
    title: 'Payment',
    color: 0x13d32f,
    fields: [
      { name: 'Customer Name', value: paymentIntent.charges.data[0].billing_details.name, },
      { name: 'Customer Email', value: paymentIntent.charges.data[0].billing_details.email, },
      { name: 'Amount', value: `$${paymentIntent.amount / 100} ${paymentIntent.currency.toUpperCase()}`, },
      { name: 'TradingView Username', value: username, },
      { name: 'Affiliate', value: affiliate ? `${affiliate.email} (${affiliate.referrals.length}) - ${affiliate.affiliateCode}\nEarned: **$${affiliateCommission.toFixed(2)}**` : 'None', },
      { name: 'Profit', value: `$${((paymentIntent.amount / 100) - affiliateCommission).toFixed(2)}`, }
    ]
  });
  
  res.status(200).json({ message: 'Payment successful' });
}));


module.exports = router;
