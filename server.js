require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const { connectToDatabase } = require('./utils/database');
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

// Routes
app.use('/api/payment', require('./routes/payment'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', auth, adminAuth, require('./routes/admin'));


server.on('upgrade', async (req, socket, head) => {
  if (!req.url.includes('/al/c')) return socket.destroy();
  await authWs(req);

  wss.handleUpgrade(req, socket, head, (ws) => {
    ws.user = req.user;
    req.ip = req.headers['x-forwarded-for'];
    if (process.env.NODE_ENV === 'DEVELOPMENT') req.ip = '::1';
    else if (!req.ip) logger.logError('No IP address found in request');

    wss.emit('connection', ws, req, req.user);
  });
});

// Serve static react app
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'frontend/build/index.html')));

app.use(errorHandler);


connectToDatabase().then(() => {
  server.listen(PORT, () => logger.logInfo(`Server running on port ${PORT}`));
});
