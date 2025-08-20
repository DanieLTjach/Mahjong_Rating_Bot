import { Command, CommandContext } from "telegram-button-menu/command";

export default class Event_List extends Command {
    public get name(): string {
        return "view_events";
    }

    async execute(commandContext: CommandContext): Promise<void> {
        await commandContext.ctx.reply("This is the first command");
    }
}