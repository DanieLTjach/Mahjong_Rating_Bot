import { Command, CommandContext } from "telegram-button-menu/command";

export default class Account_Edit extends Command {
    public get name(): string {
        return "edit_account";
    }

    async execute(commandContext: CommandContext): Promise<void> {
        await commandContext.ctx.reply("This is the first command");
    }
}