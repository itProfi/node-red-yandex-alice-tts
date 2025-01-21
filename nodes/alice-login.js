"use strict";

module.exports = function (RED) {
  function YandexConfigNode(config) {
    RED.nodes.createNode(this, config);

    // РЎРѕС…СЂР°РЅСЏРµРј РїР°СЂР°РјРµС‚СЂС‹ РєРѕРЅС„РёРіСѓСЂР°С†РёРё
    this.name = config.name;
    this.folderId = config.folderId;
    this.useGPT = config.useGPT;
    this.devices = config.devices;

    // РЎРѕС…СЂР°РЅСЏРµРј OAuth-С‚РѕРєРµРЅ РІ credentials
    this.oauthToken = this.credentials.oauthToken;
  }

  // Р РµРіРёСЃС‚СЂРёСЂСѓРµРј РЅРѕРґСѓ РІ Node-RED
  RED.nodes.registerType("yandex-config", YandexConfigNode, {
    credentials: {
      oauthToken: { type: "password" }, // OAuth-С‚РѕРєРµРЅ С…СЂР°РЅРёС‚СЃСЏ РєР°Рє РїР°СЂРѕР»СЊ
    },
  });
};
