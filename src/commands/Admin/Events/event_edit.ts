import { Command, CommandContext } from "telegram-button-menu/command";

export default class Event_Edit extends Command {
    public get name(): string {
        return "edit_event";
    }

    async execute(commandContext: CommandContext): Promise<void> {
        await commandContext.ctx.reply("This is the first command");
    }
}