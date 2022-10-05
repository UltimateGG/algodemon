require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');
const { connectToDatabase } = require('./database');
const { sendDiscordMessage } = require('./utils');
const { auth, adminAuth } = require('./middleware/authMiddleware');
const { errorHandler } = require('./middleware/errorMiddleware');

const PORT = 80;


app.set('trust proxy', true);
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));

app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1');
  res.removeHeader('X-Powered-By');
  next();
});

// Serve static react app assets
app.use(express.static(path.join(__dirname, 'frontend/build/')));

app.post('/api/contact', asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (name.length > 200 || email.length > 200 || message.length > 2040 || !name || !email || !message) 
    throw new Error('Invalid data');

  // Send to discord webhook
  await sendDiscordMessage('@everyone - Contact Form', {
    title: name,
    color: 0x1349d3,
    fields: [
      { name: 'Email', value: email },
      { name: 'Message', value: message },
    ]
  });

  res.status(200).json({ message: 'Sent' });
}));

// TODO
app.get('/api/user', auth, async (req, res) => {
  res.status(200).json(req.user);
});

// Routes
app.use('/api/payment', require('./routes/payment'));
app.use('/api/affiliates', require('./routes/affiliates'));
app.use('/api/admin', auth, adminAuth, require('./routes/admin'));

// Serve static react app
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'frontend/build/index.html')));

app.use(errorHandler);


connectToDatabase().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
