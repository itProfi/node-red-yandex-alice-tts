"use strict";

module.exports = function (RED) {
  function YandexConfigNode(config) {
    RED.nodes.createNode(this, config);

    // Поля конфигурации
    this.oauthToken = config.oauthToken;
    this.folderId = config.folderId;
    this.useGPT = config.useGPT;
    this.devices = config.devices.split(",").map((device) => device.trim());
  }

  RED.nodes.registerType("yandex-config", YandexConfigNode, {
    credentials: {
      oauthToken: { type: "password" },
    },
  });
};