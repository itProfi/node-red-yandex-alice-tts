"use strict";

const axios = require("axios");

class YandexSend {
  constructor(config) {
    this.config = config;
  }

  async sendCommand(token, text) {
    try {
      const response = await axios.post(
        "https://iot.quasar.yandex.ru/m/user/scenarios",
        {
          name: "Node-RED Command",
          steps: [
            {
              type: "scenarios.steps.actions",
              parameters: {
                launch_devices: this.config.devices,
                requested_speaker_capabilities: [
                  {
                    type: "devices.capabilities.quasar.server_action",
                    state: { instance: "text_action", value: text },
                  },
                ],
              },
            },
          ],
        },
        {
          headers: { Authorization: Bearer  },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error("РћС€РёР±РєР° РѕС‚РїСЂР°РІРєРё РєРѕРјР°РЅРґС‹: " + error.message);
    }
  }
}

module.exports = { YandexSend };
