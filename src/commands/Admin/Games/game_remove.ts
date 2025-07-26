import { Command, CommandContext } from "telegram-button-menu/command";

export default class Game_Remove extends Command {
    public get name(): string {
        return "remove_game";
    }

    async execute(commandContext: CommandContext): Promise<void> {
        await commandContext.ctx.reply("This is the first command");
    }
}