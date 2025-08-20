import { Telegraf } from "telegraf";
import { config } from "dotenv";
import axios, { Axios } from "axios";

import { setupMenu, commandManager } from "telegram-button-menu";
import { menuManager } from "telegram-button-menu/menu";

import { TestTranslateImpl } from "./translate";

import { Account_Edit, Account_Register, Account_View} from "./commands/Account/account_export";
import { Achievement_Add, Achievement_Grant } from "./commands/Admin/Achievements/achievements_export"
import { Club_Create, Club_Edit, Club_Remove, Club_View} from "./commands/Admin/Clubs/club_export";
import { Game_Remove, Game_View } from "./commands/Admin/Games/game_export";
import {  User_Activate, User_Remove } from "./commands/Admin/Users/user_export";
import { Event_Add, Event_Edit, Event_List, Event_Remove } from "./commands/Admin/Events/event_export";


import { MENU_STRUCTURE } from "./menu";


/*
  Add Game
  ** Techinical command: get chat id (With theme id)
*/

config();

const bot = new Telegraf(process.env.BOT_TOKEN || "");

commandManager.register(new User_Remove());
commandManager.register(new User_Activate());
commandManager.register(new Game_View());
commandManager.register(new Game_Remove());
commandManager.register(new Club_View());
commandManager.register(new Club_Remove());
commandManager.register(new Club_Edit());
commandManager.register(new Club_Create());
commandManager.register(new Achievement_Add());
commandManager.register(new Achievement_Grant());
commandManager.register(new Account_Edit());
commandManager.register(new Account_Register());
commandManager.register(new Account_View());
commandManager.register(new Event_Add());
commandManager.register(new Event_Edit());
commandManager.register(new Event_List());
commandManager.register(new Event_Remove());

menuManager.setMenuStructure(MENU_STRUCTURE);
setupMenu(bot);

bot.start((ctx) => menuManager.displayMenu(ctx, "main_menu"));

bot.command("add", async (ctx) => {
  const text = ctx.message.text || "";
  
  const lines = text.split("\n");

  if (lines.length !== 5 || !lines[0].toLowerCase().startsWith("/add")) {
    return ctx.reply(
      "⚠️ Invalid format."
    );
  }

  const club_id = ctx.chat.id;       
  const modified_by = ctx.from.id; 

 const players_data: Array<{
   user_id: number;
   points: number;
   start_place: number;
 }> = [];
 for (let i = 1; i <= 4; i++) {
   const line = lines[i].trim();
   const regex = /^@([A-Za-z0-9_]{5,32})\s+(-?\d+)$/;
   const match = line.match(regex);
   if (!match) {
     return ctx.reply(`⚠️ Line ${i} is invalid. Use: @username points”`);
   }
   const [, username, ptsStr] = match;
   const points = parseInt(ptsStr, 10);
let userId: number;
console.log(username)
try {
  const resp = await axios.get(
    `${process.env.API_URL}user/getByNickname`,
    { data: { nickname: `@${username}` } }
  );
  console.log("RESP FROM GETBYNICKNAME: ",resp.data.message);
  userId = resp.data.message.user_id;
} catch (err) {
  console.error("Lookup failed:", err);
  return ctx.reply(`⚠️ Could not resolve @${username}.`);
}

players_data.push({
  user_id:   userId,
  points,
  start_place: i,
});
 }
  const totalPoints = players_data.reduce((sum, p) => sum + p.points, 0);
  if (totalPoints !== 120000) {
    return ctx.reply(
      `⚠️ Total points must be exactly 120000, but got ${totalPoints}. ` +
      `Please double-check your values.`
    );
  }

  // Вынести formatDate

  function formatDate(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return (
    `${date.getFullYear()}-` +
    `${pad(date.getMonth() + 1)}-` +
    `${pad(date.getDate())} ` +
    `${pad(date.getHours())}:` +
    `${pad(date.getMinutes())}:` +
    `${pad(date.getSeconds())}`
  );
}

  const payload = {
    game_type: 0,                    
    players_data,
    modified_by: 0,
    created_at: formatDate(new Date()),  
    club_id: 2,
  };

  try {
    const resp = await axios.post(`${process.env.API_URL}game/add`, payload);
    if (resp.status === 200 && resp.data.message) {
      return ctx.reply(`✅ ${resp.data.message}`);
    } else {
      console.error("Backend error:", resp.data);
      return ctx.reply(`❌ Failed to add game: ${resp.data.message || resp.statusText}`);
    }
  } catch (err: any) {
    console.error("Axios error:", err);
    const msg = err.response?.data?.message || err.message;
    return ctx.reply(`🚨 Error adding game: ${msg}`);
  }
});

// // TEST

// bot.command("test", async(ctx) => { 
//   const entities = ctx.message.entities || [];
//   for (const e of entities) {
//     if (e.type === 'text_mention' && e.user) {
//       console.log(`Mentioned user: ${e.user.username} — ${e.user.id}`);
//     }
//   }
// })

bot.launch(() => {
  console.log("Bot is running...");
}).catch((error) => {
  console.error("Failed to launch bot:", error);
});

export default bot;