const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const paypal = require('paypal-rest-sdk');
const { logInfo } = require('../utils/logging');
const { sendDiscordMessage } = require('../utils/utils');

const PRICE = 124.95;//149.99;
const AFFILIATE_PERCENTAGE = 10.0; // Affiliates earn 10%
paypal.configure({
  'mode': process.env.NODE_ENV === 'DEVELOPMENT' ? 'sandbox' : 'live',
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_CLIENT_SECRET
});


router.get('/intent', asyncHandler(async (req, res) => {
  const ref = req.query.ref;
  const affiliate = await User.findOne({ affiliateCode: ref });

  let price = PRICE;
  if (affiliate) price = +((price * 0.2).toFixed(2)); // 80% off

  const payment = {
    'intent': 'SALE',
    'payer': {
      'payment_method': 'paypal'
    },
    'redirect_urls': {
      'return_url': `${process.env.BASE_URL}/#/success`,
      'cancel_url': `${process.env.BASE_URL}/#/pricing`
    },
    'transactions': [{
      'item_list': {
        'items': [{
          'name': 'AlgoDemon Trading Indicator',
          'sku': '001',
          'price': price,
          'currency': 'USD',
          'quantity': 1
        }]
      },
      'amount': {
        'currency': 'USD',
        'total': price
      },
      'description': 'AlgoDemon Trading Indicator'
    }]
  };

  paypal.payment.create(payment, (error, payment) => {
    if (error) {
      console.error(error);
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url')
          res.json({ id: payment.links[i].href.split('&token=EC-')[1] });
      }
    }
  });
}));

router.post('/verify', asyncHandler(async (req, res) => {
  const { paymentId, payerId, username, ref } = req.body;
  const affiliate = await User.findOne({ affiliateCode: ref });
  
  let price = PRICE;
  if (affiliate) price = +((price * 0.2).toFixed(2)); // 80% off

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": price
      }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, async (error, payment) => {
    if (error) {
      console.error(error);
      throw error;
    } else {
      if (!payment.state === 'approved') throw new Error('Payment not approved');

      // Add to affiliates referrals
      const affiliateCommission = ((PRICE * 0.2) * (AFFILIATE_PERCENTAGE / 100.0));

      if (affiliate) {
        affiliate.referrals.push({
          username: username,
          amount: +(affiliateCommission.toFixed(2))
        });
        
        await affiliate.save();
      }
      
      // Send to discord webhook
      const amt = Number(payment.transactions[0].amount.total);
      await sendDiscordMessage('@everyone - **New Sale**', {
        title: 'Payment',
        color: 0x13d32f,
        fields: [
          { name: 'Customer Name', value: payment.payer.payer_info.first_name + ' ' + payment.payer.payer_info.last_name, },
          { name: 'Customer Email', value: payment.payer.payer_info.email, },
          { name: 'Amount', value: `$${amt} ${payment.transactions[0].amount.currency}`, },
          { name: 'TradingView Username', value: username, },
          { name: 'Affiliate', value: affiliate ? `${affiliate.email} (${affiliate.referrals.length}) - ${affiliate.affiliateCode}\nEarned: **$${affiliateCommission.toFixed(2)}**` : 'None', },
          { name: 'Profit', value: `$${(amt - affiliateCommission).toFixed(2)}`, }
        ]
      });

      logInfo('New sale from ' + username, payment);
      res.status(200).json({ message: 'Payment successful', id: paymentId, log: {
        name: payment.payer.payer_info.first_name + ' ' + payment.payer.payer_info.last_name,
        email: payment.payer.payer_info.email,
        address: payment.payer.payer_info.shipping_address.line1,
        city: payment.payer.payer_info.shipping_address.city,
        state: payment.payer.payer_info.shipping_address.state,
        zip: payment.payer.payer_info.shipping_address.postal_code,
        country: payment.payer.payer_info.shipping_address.country_code,
      }});
    }
  });
}));


module.exports = router;
