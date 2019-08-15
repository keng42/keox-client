/**
 * Keox 客户端
 *
 * created by keng42 @2019-08-15 11:28:42
 */

const r2 = require('r2');

class KeoxClient {
  constructor(host = '') {
    this.host = host;
    this.headers = {};
  }

  setUser(id, token) {
    this.headers = {
      'x-keox-id': id,
      'x-keox-token': token,
    };
  }

  async post(path, data) {
    return r2.post(`${this.host}/api/v1/${path}`, {
      json: data,
      headers: this.headers,
    }).json;
  }

  async init(key) {
    return this.post('init', {
      key,
    });
  }

  async unseal(key) {
    return this.post('unseal', {
      key,
    });
  }

  async setTokens(creates = [], deletes = []) {
    return this.post('tokens', {
      creates,
      deletes,
    });
  }

  async setKeys(keys) {
    return this.post('keys', {
      keys,
    });
  }

  async getKeys() {
    const resp = await r2(`${this.host}/api/v1/keys`, {
      headers: this.headers,
    }).json;
    return resp;
  }
}

module.exports = KeoxClient;
