"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestTranslateImpl = void 0;
const translate_1 = require("telegram-button-menu/translate");
const storage_1 = require("./storage");
class TestTranslateImpl extends translate_1.Translate {
    constructor() {
        super(...arguments);
        this.translations = {
            en: {
                "MENU_YOU_ARE_IN": "You are in the menu:",
                "MENU_BACK": "Back",
            },
            ua: {
                "MENU_YOU_ARE_IN": "Ви в меню:",
                "MENU_BACK": "Назад",
            },
        };
    }
    getUserLanguage(ctx) {
        var _a, _b;
        return ((_b = storage_1.storage.get((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id)) === null || _b === void 0 ? void 0 : _b.languageCode) || 'en';
    }
    translate(lang, key, params) {
        if (!this.translations[lang]) {
            return key;
        }
        let translation = this.translations[lang][key] || key;
        if (params) {
            for (const [paramKey, paramValue] of Object.entries(params)) {
                translation = translation.replace(`{${paramKey}}`, paramValue);
            }
        }
        return translation;
    }
}
exports.TestTranslateImpl = TestTranslateImpl;
