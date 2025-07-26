import { Command, CommandContext } from "telegram-button-menu/command";

export default class Club_Create extends Command {
    public get name(): string {
        return "create_club";
    }

    async execute(commandContext: CommandContext): Promise<void> {
        await commandContext.ctx.reply("This is the first command");
    }
}