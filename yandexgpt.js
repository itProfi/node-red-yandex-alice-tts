﻿"use strict";

const axios = require("axios");

class YandexGPT {
  constructor(config) {
    this.config = config;
  }

  async processText(text) {
    if (!this.config.useGPT) return text;

    try {
      const response = await axios.post(
        "https://llm.api.cloud.yandex.net/llm/v1alpha/completion",
        {
          model: "yandexgpt-lite",
          messages: [{ role: "user", content: text }],
        },
        {
          headers: {
            Authorization: `Bearer ${this.config.credentials.iamToken}`,
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      throw new Error("Ошибка обработки текста через YandexGPT: " + error.message);
    }
  }
}

module.exports = { YandexGPT };