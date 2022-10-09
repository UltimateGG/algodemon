const request = require('request');
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const logger = require('./logging');


const sendDiscordMessage = async (content, embed) => {
  return new Promise((resolve, reject) => {
    request.post(WEBHOOK_URL, {
      json: {
        content,
        embeds: embed ? [{
          title: embed.name,
          color: embed.color,
          description: embed.description,
          fields: embed.fields,
        }] : undefined,
      }
    }, (err, res, body) => {
      if (err || res.statusCode !== 204) {
        logger.logError('Error sending discord message', err);
        return reject('Error fulfilling your request');
      }

      resolve();
    });
  });
}

module.exports = {
  sendDiscordMessage,
}
