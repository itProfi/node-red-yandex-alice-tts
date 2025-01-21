"use strict";

module.exports = function (RED) {
  function YandexSendNode(config) {
    RED.nodes.createNode(this, config);

    // Получаем конфигурационную ноду
    this.config = RED.nodes.getNode(config.config);

    // Обработка входящих сообщений
    this.on("input", async (msg) => {
      try {
        const token = await this.auth.getToken();
        if (!token) throw new Error("Ошибка авторизации");

        const processedText = await this.gpt.processText(msg.payload);
        const result = await this.send.sendCommand(token, processedText);

        msg.payload = result;
        this.send(msg);
      } catch (error) {
        this.error("Ошибка: " + error.message, msg);
      }
    });
  }

  RED.nodes.registerType("alice-send", YandexSendNode);
};