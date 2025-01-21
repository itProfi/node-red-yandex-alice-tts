"use strict";

const axios = require("axios");

class YandexAuth {
  constructor(config) {
    this.config = config;
  }

  async getToken() {
    try {
      const response = await axios.post("https://iam.api.cloud.yandex.net/iam/v1/tokens", {
        yandexPassportOauthToken: this.config.credentials.oauthToken,
      });

      if (response.data.iamToken) {
        return response.data.iamToken;
      } else {
        throw new Error("Токен не получен");
      }
    } catch (error) {
      throw new Error("Ошибка авторизации: " + error.message);
    }
  }
}

module.exports = { YandexAuth };