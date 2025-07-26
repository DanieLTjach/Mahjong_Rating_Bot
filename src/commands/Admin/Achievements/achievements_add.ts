import { Command, CommandContext } from "telegram-button-menu/command";

export default class Achievement_Add extends Command {
    public get name(): string {
        return "add_achievement";
    }

    async execute(commandContext: CommandContext): Promise<void> {
        await commandContext.ctx.reply("This is the first command");
    }
}