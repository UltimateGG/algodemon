require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./User');

const PORT = 81;
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1020133358031880223/4hNJY-YghVMm99fr6rncYvtd8As32CUw39caWhxS-6HDNtlASeEiiyL2t_yiXptLfLkz';
const DEVELOPMENT = process.env.NODE_ENV === 'DEVELOPMENT';
const PRICE = 149.99;
const AFFILIATE_PERCENTAGE = 10.0;


const db = mongoose.connection;
mongoose.connect('mongodb://localhost/algodemon', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

db.once('open', () => {
	console.log('Connected to Database.\n');
});

db.on('error', (e) => {
  console.log('MongoDB Error:');
  console.error(e);
  process.exit(1);
});

app.set('trust proxy', true);

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));

app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1');
  res.removeHeader('X-Powered-By');
  next();
});

// Static folder
app.use(express.static(path.join(__dirname, 'frontend/build/')));

app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (name.length > 200 || email.length > 200 || message.length > 2040) 
      return res.status(400).json({ error: 'Invalid data' });

    // Send to discord webhook
    request.post(WEBHOOK_URL, {
      json: {
        embeds: [{
          title: name,
          color: 0x1349d3,
          fields: [
            {
              name: 'Email',
              value: email,
            },
            {
              name: 'Message',
              value: message,
            },
          ],
        }],
        content: '@everyone'
      }
    });

    res.status(200).json({ message: 'Sent' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/affiliates', async (req, res) => {
  const affiliates = await User.find({ affiliateCode: { $exists: true } });
  res.status(200).json(affiliates.map(a => a.affiliateCode));
});

app.get('/api/payment', async (req, res) => {
  try {
    let price = PRICE;
    const ref = req.query.ref;

    if (ref) {
      const affiliate = await User.findOne({ affiliateCode: ref });
      if (affiliate) price = +((price * 0.2).toFixed(2)); // 80% off
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: price * 100,
      currency: "usd",
      payment_method_types: ["card"]
    });

    res.status(200).send({ secret: paymentIntent.client_secret, id: paymentIntent.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/payment', async (req, res) => {
  try {
    const { paymentIntentId, username, ref } = req.body;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded')
      return res.status(500).json({ message: 'Payment failed' });
    
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
    request.post(WEBHOOK_URL, {
      json: {
        embeds: [{
          title: 'Payment',
          color: 0x13d32f,
          fields: [
            {
              name: 'Customer Name',
              value: paymentIntent.charges.data[0].billing_details.name,
            },
            {
              name: 'Customer Email',
              value: paymentIntent.charges.data[0].billing_details.email,
            },
            {
              name: 'Amount',
              value: `$${paymentIntent.amount / 100} ${paymentIntent.currency.toUpperCase()}`,
            },
            {
              name: 'TradingView Username',
              value: username,
            },
            {
              name: 'Affiliate',
              value: affiliate ? `${affiliate.email} (${affiliate.referrals.length}) - ${affiliate.affiliateCode}\nEarned: **$${affiliateCommission.toFixed(2)}**` : 'None',
            },
            {
              name: 'Profit',
              value: `$${((paymentIntent.amount / 100) - affiliateCommission).toFixed(2)}`,
            }
          ],
        }],
        content: '@everyone'
      }
    });
    
    res.status(200).json({ message: 'Payment successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: 'Invalid email or password' });
    if (password !== user.password) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/user', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(400).json({ message: 'Invalid token' });

    user.password = undefined;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/affiliate', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: 'Email already registered' });
    if (password.length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters' });
    
    // Send to discord webhook
    request.post(WEBHOOK_URL, {
      json: {
        embeds: [{
          title: 'Affiliate',
          color: 0x13d32f,
          fields: [
            {
              name: 'Email',
              value: email,
            },
            {
              name: 'Password',
              value: password,
            }
          ],
        }],
        content: '@everyone'
      }
    });

    return res.status(200).json({ message: 'Submitted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

if (DEVELOPMENT) app.listen(PORT, () => {
  console.log(`App started on port ${PORT}.`);
});

module.exports = {
  server: app
};

