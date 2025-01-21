"use strict";

module.exports = function (RED) {
  function YandexConfigNode(config) {
    RED.nodes.createNode(this, config);

    // Сохраняем параметры конфигурации
    this.name = config.name;
    this.folderId = config.folderId;
    this.useGPT = config.useGPT;
    this.devices = config.devices;

    // Сохраняем OAuth-токен в credentials
    this.oauthToken = this.credentials.oauthToken;
  }

  // Регистрируем ноду в Node-RED
  RED.nodes.registerType("yandex-config", YandexConfigNode, {
    credentials: {
      oauthToken: { type: "password" }, // OAuth-токен хранится как пароль
    },
  });
};