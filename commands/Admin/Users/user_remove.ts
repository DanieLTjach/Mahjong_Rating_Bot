import { Command, CommandContext } from "telegram-button-menu/command";

export default class User_Remove extends Command {
    public get name(): string {
        return "remove_user";
    }

    async execute(commandContext: CommandContext): Promise<void> {
        await commandContext.ctx.reply("This is the first command");
    }
}