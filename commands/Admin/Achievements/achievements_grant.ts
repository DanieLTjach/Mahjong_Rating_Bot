import { Command, CommandContext } from "telegram-button-menu/command";

export default class Achievement_Grant extends Command {
    public get name(): string {
        return "grant_achievement";
    }

    async execute(commandContext: CommandContext): Promise<void> {
        await commandContext.ctx.reply("This is the first command");
    }
}