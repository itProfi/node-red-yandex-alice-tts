"use strict";

const { YandexAuth } = require("../auth");
const { YandexGPT } = require("../yandexgpt");
const { YandexDevices } = require("../devices");
const { YandexSend } = require("../send");

module.exports = function (RED) {
  function YandexSendNode(config) {
    RED.nodes.createNode(this, config);

    // РџРѕР»СѓС‡Р°РµРј РєРѕРЅС„РёРіСѓСЂР°С†РёРѕРЅРЅС‹Р№ СѓР·РµР»
    this.config = RED.nodes.getNode(config.config);

    // РРЅРёС†РёР°Р»РёР·Р°С†РёСЏ РјРѕРґСѓР»РµР№
    this.auth = new YandexAuth(this.config);
    this.gpt = new YandexGPT(this.config);
    this.devices = new YandexDevices(this.config);
    this.send = new YandexSend(this.config);

    // РћР±СЂР°Р±РѕС‚РєР° РІС…РѕРґСЏС‰РёС… СЃРѕРѕР±С‰РµРЅРёР№
    this.on("input", async (msg) => {
      try {
        // РђРІС‚РѕСЂРёР·Р°С†РёСЏ
        const token = await this.auth.getToken();
        if (!token) throw new Error("РћС€РёР±РєР° Р°РІС‚РѕСЂРёР·Р°С†РёРё");

        // РћР±СЂР°Р±РѕС‚РєР° РєРѕРјР°РЅРґС‹ С‡РµСЂРµР· YandexGPT (РµСЃР»Рё РІРєР»СЋС‡РµРЅРѕ)
        const processedText = await this.gpt.processText(msg.payload);

        // РћС‚РїСЂР°РІРєР° РєРѕРјР°РЅРґС‹ РЅР° СѓСЃС‚СЂРѕР№СЃС‚РІРѕ
        const result = await this.send.sendCommand(token, processedText);
        msg.payload = result;
        this.send(msg);
      } catch (error) {
        this.error("РћС€РёР±РєР°: " + error.message, msg);
      }
    });
  }

  RED.nodes.registerType("yandex-send", YandexSendNode);
};
