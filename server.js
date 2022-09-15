const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const PORT = 80;


app.set('trust proxy', true);

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '1mb' }));

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

    // TODO: Send to discord webhook

    res.status(200).json({ message: 'Sent' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}.`);
});
