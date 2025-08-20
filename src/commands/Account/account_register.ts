import axios from "axios";
import bot from "../../index";
import { Command, CommandContext } from "telegram-button-menu/command";

export default class Account_Register extends Command {
    public get name(): string {
        return "register_account";
    }

    async execute(commandContext: CommandContext): Promise<void> {
        const messagesToDelete: Array<{ chatId: number; messageId: number }> = [];
        let bulkDeletionScheduled = false;

        const track = (msg: any) => {
            if (msg && msg.chat && typeof msg.message_id === "number") {
                messagesToDelete.push({ chatId: msg.chat.id, messageId: msg.message_id });
            }
        };

        const scheduleBulkDelete = (ctx: any, delayMs = 20000) => {
            if (bulkDeletionScheduled) return;
            bulkDeletionScheduled = true;
            setTimeout(async () => {
                for (const m of messagesToDelete) {
                    try {
                        await ctx.telegram.deleteMessage(m.chatId, m.messageId);
                    } catch {
                        // ignore
                    }
                }
            }, delayMs);
        };

        try {
            const payload = {
                column: "user_telegram_id",
                value: `${commandContext.ctx.from.id}`
            };
            const resp = await axios.get(`${process.env.API_URL}user/getBy`, {
                data: payload
            });
            console.log(resp.data);
            if (resp.data.message.user_id) {
                const m = await commandContext.ctx.reply("Ваш аккаунт вже зареєстровано.");
                track(m);
                scheduleBulkDelete(commandContext.ctx);
                return;
            }
        } catch (err) {
            const mErr = await commandContext.ctx.reply("Виникла помилка при перевірці реєстрації.");
            track(mErr);
            scheduleBulkDelete(commandContext.ctx);
            return;
        }

        if(commandContext.ctx.from.username === undefined) {
            const m = await commandContext.ctx.reply("Ваше @Nickname не встановлено. Для реєстрації аккаунта необхідно встановити @Nickname у налаштуваннях Telegram.");
            track(m);
            scheduleBulkDelete(commandContext.ctx);
            return;
        }

        const askMsg = await commandContext.ctx.reply(
            "Для реєстрації аккаунта напишіть як вас звати, у форматі: Ivan I (Ім'я та перша буква прізвища)."
        );
        track(askMsg);

        const userId = commandContext.ctx.from.id;
        let nameHandled = false;

        const nameHandler = async (ctx: any) => {
            if (nameHandled) return;
            if (!ctx.from || ctx.from.id !== userId) return;

            const userMessage = ctx.message;
            const name: string | undefined = userMessage?.text;
            if (!name) return;
            track(userMessage);

            const namePattern = /^[A-Za-z]+ [A-Za-z]$/;

            if (!namePattern.test(name)) {
                const invalidMsg = await ctx.reply(
                    "Неправильний формат імені. Використайте формат: Ivan I (латиниця, наприклад 'Pavlo P'). Спробуйте ще раз."
                );
                track(invalidMsg);
                return;
            }

            nameHandled = true;

            const payload = {
                user_name: `${name}`,
                user_telegram: `${commandContext.ctx.from.username}`,
                user_telegram_id: `${userId}`
            };

            try {
                const registerResp = await axios.post(
                    `${process.env.API_URL}user/register`,
                    payload
                );

                if (registerResp.status === 200 && registerResp.data?.message) {
                    const okMsg = await ctx.reply(`✅ Дякую, ${name}! Ваш аккаунт зареєстровано.`);
                    track(okMsg);
                } else {
                    const failMsg = await ctx.reply("❌ Помилка при реєстрації.");
                    track(failMsg);
                }
            } catch {
                const errMsg = await ctx.reply("❌ Помилка при реєстрації.");
                track(errMsg);
            } finally {
                scheduleBulkDelete(ctx);
                // Removed bot.off("text", nameHandler); Telegraf lacks 'off', guard (nameHandled) prevents duplicate processing
            }
        };

        bot.on("text", nameHandler);
    }
}