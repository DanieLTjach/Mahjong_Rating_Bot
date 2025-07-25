"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const dotenv_1 = require("dotenv");
const axios_1 = __importDefault(require("axios"));
const telegram_button_menu_1 = require("telegram-button-menu");
const menu_1 = require("telegram-button-menu/menu");
const account_export_1 = require("./commands/Account/account_export");
const achievements_export_1 = require("./commands/Admin/Achievements/achievements_export");
const club_export_1 = require("./commands/Admin/Clubs/club_export");
const game_export_1 = require("./commands/Admin/Games/game_export");
const user_export_1 = require("./commands/Admin/Users/user_export");
const menu_2 = require("./menu");
/*
  Add Game
  ** Techinical command: get chat id (With theme id)
*/
(0, dotenv_1.config)();
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN || "");
telegram_button_menu_1.commandManager.register(new user_export_1.User_Remove());
telegram_button_menu_1.commandManager.register(new user_export_1.User_Activate());
telegram_button_menu_1.commandManager.register(new game_export_1.Game_View());
telegram_button_menu_1.commandManager.register(new game_export_1.Game_Remove());
telegram_button_menu_1.commandManager.register(new club_export_1.Club_View());
telegram_button_menu_1.commandManager.register(new club_export_1.Club_Remove());
telegram_button_menu_1.commandManager.register(new club_export_1.Club_Edit());
telegram_button_menu_1.commandManager.register(new club_export_1.Club_Create());
telegram_button_menu_1.commandManager.register(new achievements_export_1.Achievement_Add());
telegram_button_menu_1.commandManager.register(new achievements_export_1.Achievement_Grant());
telegram_button_menu_1.commandManager.register(new account_export_1.Account_Edit());
telegram_button_menu_1.commandManager.register(new account_export_1.Account_Register());
telegram_button_menu_1.commandManager.register(new account_export_1.Account_View());
menu_1.menuManager.setMenuStructure(menu_2.MENU_STRUCTURE);
(0, telegram_button_menu_1.setupMenu)(bot);
bot.start((ctx) => menu_1.menuManager.displayMenu(ctx, "main_menu"));
bot.command("add", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const text = ctx.message.text || "";
    const lines = text.split("\n");
    if (lines.length !== 5 || !lines[0].toLowerCase().startsWith("/add")) {
        return ctx.reply("⚠️ Invalid format.");
    }
    const club_id = ctx.chat.id;
    const modified_by = ctx.from.id;
    const players_data = [];
    for (let i = 1; i <= 4; i++) {
        const line = lines[i].trim();
        const regex = /^@([A-Za-z0-9_]{5,32})\s+(-?\d+)$/;
        const match = line.match(regex);
        if (!match) {
            return ctx.reply(`⚠️ Line ${i} is invalid. Use: @username points”`);
        }
        const [, username, ptsStr] = match;
        const points = parseInt(ptsStr, 10);
        let userId;
        console.log(username);
        try {
            const resp = yield axios_1.default.get(`${process.env.API_URL}user/getByNickname`, { data: { nickname: `@${username}` } });
            console.log("RESP FROM GETBYNICKNAME: ", resp.data.message);
            userId = resp.data.message.user_id;
        }
        catch (err) {
            console.error("Lookup failed:", err);
            return ctx.reply(`⚠️ Could not resolve @${username}.`);
        }
        players_data.push({
            user_id: userId,
            points,
            start_place: i,
        });
    }
    const totalPoints = players_data.reduce((sum, p) => sum + p.points, 0);
    if (totalPoints !== 120000) {
        return ctx.reply(`⚠️ Total points must be exactly 120000, but got ${totalPoints}. ` +
            `Please double-check your values.`);
    }
    function formatDate(date) {
        const pad = (n) => n.toString().padStart(2, '0');
        return (`${date.getFullYear()}-` +
            `${pad(date.getMonth() + 1)}-` +
            `${pad(date.getDate())} ` +
            `${pad(date.getHours())}:` +
            `${pad(date.getMinutes())}:` +
            `${pad(date.getSeconds())}`);
    }
    const payload = {
        game_type: 0,
        players_data,
        modified_by: 0,
        created_at: formatDate(new Date()),
        club_id: 2,
    };
    try {
        const resp = yield axios_1.default.post(`${process.env.API_URL}game/add`, payload);
        if (resp.status === 200 && resp.data.message) {
            return ctx.reply(`✅ ${resp.data.message}`);
        }
        else {
            console.error("Backend error:", resp.data);
            return ctx.reply(`❌ Failed to add game: ${resp.data.message || resp.statusText}`);
        }
    }
    catch (err) {
        console.error("Axios error:", err);
        const msg = ((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || err.message;
        return ctx.reply(`🚨 Error adding game: ${msg}`);
    }
}));
bot.launch(() => {
    console.log("Bot is running...");
}).catch((error) => {
    console.error("Failed to launch bot:", error);
});
