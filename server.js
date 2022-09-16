const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const PORT = 80;
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1020133358031880223/4hNJY-YghVMm99fr6rncYvtd8As32CUw39caWhxS-6HDNtlASeEiiyL2t_yiXptLfLkz';


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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}.`);
});
