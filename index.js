"use strict";

module.exports = function (RED) {
  // Р РµРіРёСЃС‚СЂР°С†РёСЏ РЅРѕРґС‹ РґР»СЏ РѕС‚РїСЂР°РІРєРё РєРѕРјР°РЅРґ
  require("./nodes/alice-send")(RED);

  // Р РµРіРёСЃС‚СЂР°С†РёСЏ РєРѕРЅС„РёРіСѓСЂР°С†РёРѕРЅРЅРѕР№ РЅРѕРґС‹
  require("./nodes/alice-login")(RED);
};
