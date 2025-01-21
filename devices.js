"use strict";

const axios = require("axios");

class YandexDevices {
  constructor(config) {
    this.config = config;
  }

  async getDevices(token) {
    try {
      const response = await axios.get("https://iot.quasar.yandex.ru/m/user/devices", {
        headers: { Authorization: Bearer  },
      });

      return response.data.devices;
    } catch (error) {
      throw new Error("РћС€РёР±РєР° РїРѕР»СѓС‡РµРЅРёСЏ СѓСЃС‚СЂРѕР№СЃС‚РІ: " + error.message);
    }
  }
}

module.exports = { YandexDevices };
