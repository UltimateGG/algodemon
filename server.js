require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const PORT = 80;
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1020133358031880223/4hNJY-YghVMm99fr6rncYvtd8As32CUw39caWhxS-6HDNtlASeEiiyL2t_yiXptLfLkz';
const DEVELOPMENT = process.env.NODE_ENV === 'DEVELOPMENT';
const URL = `${DEVELOPMENT ? 'http://localhost:3000/' : 'https://algodemon.com/'}`;
const PRICE = 29.99;


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

app.get('/api/payment', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: PRICE * 100,
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
    const { paymentIntentId, username } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Send to discord webhook
    if (paymentIntent.status === 'succeeded') {
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
              }
            ],
          }],
          content: '@everyone'
        }
      });
      
      res.status(200).json({ message: 'Payment successful' });
    } else {
      res.status(500).json({ message: 'Payment failed' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}.`);
});

module.exports = {
  app
};

