require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');
const { connectToDatabase } = require('./utils/database');
const { sendDiscordMessage } = require('./utils/utils');
const { auth, adminAuth, authWs } = require('./middleware/authMiddleware');
const { errorHandler } = require('./middleware/errorMiddleware');
const wss = require('./routes/analytics');
const logger = require('./utils/logging');

const PORT = 80;
const server = http.createServer(app);


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

// Routes
app.use('/api/payment', require('./routes/payment'));
app.use('/api/affiliates', require('./routes/affiliates'));
app.use('/api/admin', auth, adminAuth, require('./routes/admin'));


server.on('upgrade', async (req, socket, head) => {
  if (!req.url.startsWith('/al/c')) return socket.destroy();
  await authWs(req);

  wss.handleUpgrade(req, socket, head, (ws) => {
    ws.user = req.user;
    req.ip = req.headers['x-forwarded-for'];
    wss.emit('connection', ws, req, req.user);
  });
});

// Serve static react app
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'frontend/build/index.html')));

app.use(errorHandler);


connectToDatabase().then(() => {
  server.listen(PORT, () => logger.logInfo(`Server running on port ${PORT}`));
});
