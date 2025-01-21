"use strict";

const axios = require("axios");

class YandexDevices {
  constructor(config) {
    this.config = config;
  }

  async getDevices(token) {
    try {
      const response = await axios.get("https://iot.quasar.yandex.ru/m/user/devices", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data.devices;
    } catch (error) {
      throw new Error("Ошибка получения устройств: " + error.message);
    }
  }
}

module.exports = { YandexDevices };