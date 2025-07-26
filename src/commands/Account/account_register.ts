import { Command, CommandContext } from "telegram-button-menu/command";

export default class Account_Register extends Command {
    public get name(): string {
        return "register_account";
    }

    async execute(commandContext: CommandContext): Promise<void> {
        await commandContext.ctx.reply("This is the first command");
    }
}