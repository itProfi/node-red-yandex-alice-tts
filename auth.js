"use strict";

const axios = require("axios");

class YandexAuth {
  constructor(config) {
    this.config = config;
  }

  async getToken() {
    try {
      const response = await axios.post("https://iam.api.cloud.yandex.net/iam/v1/tokens", {
        yandexPassportOauthToken: this.config.oauthToken,
      });

      if (response.data.iamToken) {
        return response.data.iamToken;
      } else {
        throw new Error("РўРѕРєРµРЅ РЅРµ РїРѕР»СѓС‡РµРЅ");
      }
    } catch (error) {
      throw new Error("РћС€РёР±РєР° Р°РІС‚РѕСЂРёР·Р°С†РёРё: " + error.message);
    }
  }
}

module.exports = { YandexAuth };
