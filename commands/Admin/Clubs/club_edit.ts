import { Command, CommandContext } from "telegram-button-menu/command";

export default class Club_Edit extends Command {
    public get name(): string {
        return "edit_club";
    }

    async execute(commandContext: CommandContext): Promise<void> {
        await commandContext.ctx.reply("This is the first command");
    }
}