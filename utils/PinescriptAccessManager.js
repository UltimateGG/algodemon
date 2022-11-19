const request = require('request');

const baseURL = 'https://www.tradingview.com/pine_perm/';

class PinescriptAccessManager {
  constructor(sessionToken, scriptId) {
    this.sessionToken = sessionToken;
    this.scriptId = scriptId;
  }

  pineRequest = (url, form) => {
    form['pine_id'] = this.scriptId;
  
    return new Promise((resolve, reject) => {
      request.post(`${baseURL}${url}`, {
        headers: {
          'accept': 'application/json, text/javascript, */*; q=0.01',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'cookie': `sessionid=${this.sessionToken};`,
          'referer': 'https://www.tradingview.com/',
        },
        form
    }, (err, res, body) => {
        if (err) return reject(err);
        const data = JSON.parse(body);
  
        if (data.code === 'login_required') {
          console.log('Your session token is invalid. Please update it for TradingView integration to work.');
          return reject('Failed to authenticate with TradingView');
        }
  
        resolve(data);
      });
    });
  }
  
  getUser = (username) => {
    return new Promise(async (resolve, reject) => {
      const data = await this.pineRequest('list_users/?limit=10&order_by=-created', { username });
      const results = data.results;
  
      if (results.length > 1) return reject('Multiple users found with that username');
      resolve(results[0]);
    });
  }
  
  addUser = (username, expirationDays = -1) => {
    return new Promise(async (resolve, reject) => {
      if (process.env.NODE_ENV === 'DEVELOPMENT') return resolve({ id: 1 });
      const expiration = new Date();
      expiration.setDate(expiration.getDate() + expirationDays);
  
      const data = await this.pineRequest('add/', { 'username_recip': username, expiration: expirationDays !== -1 ? expiration.toISOString() : undefined });
  
      if (data.status !== 'ok' && data.status !== 'exists') return reject('Failed to add user to indicator: ' + JSON.stringify(data));
      resolve(data);
    });
  }
  
  removeUser = (username) => {
    return new Promise(async (resolve, reject) => {
      if (process.env.NODE_ENV === 'DEVELOPMENT') return resolve({ status: 'ok' });
      const data = await this.pineRequest('remove/', { 'username_recip': username });
  
      if (data.status !== 'ok') return reject('Failed to remove user');
      resolve(data);
    });
  }
}

module.exports = PinescriptAccessManager;
