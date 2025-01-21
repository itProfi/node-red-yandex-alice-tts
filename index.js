"use strict";

const { YandexAuth } = require("./auth");
const { YandexGPT } = require("./yandexgpt");
const { YandexDevices } = require("./devices");
const { YandexSend } = require("./send");

module.exports = function (RED) {
  function YandexAliceNode(config) {
    RED.nodes.createNode(this, config);

    // Получаем конфигурационный узел
    this.config = RED.nodes.getNode(config.config);

    // Инициализация модулей
    this.auth = new YandexAuth(this.config);
    this.gpt = new YandexGPT(this.config);
    this.devices = new YandexDevices(this.config);
    this.send = new YandexSend(this.config);

    // Обработка входящих сообщений
    this.on("input", async (msg) => {
      try {
        // Авторизация
        const token = await this.auth.getToken();
        if (!token) throw new Error("Ошибка авторизации");

        // Обработка команды через YandexGPT (если включено)
        const processedText = await this.gpt.processText(msg.payload);

        // Отправка команды на устройство
        const result = await this.send.sendCommand(token, processedText);
        msg.payload = result;
        this.send(msg);
      } catch (error) {
        this.error("Ошибка: " + error.message, msg);
      }
    });
  }

  RED.nodes.registerType("yandex-alice", YandexAliceNode);
};