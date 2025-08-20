import { Command, CommandContext } from "telegram-button-menu/command";

export default class Event_Remove extends Command {
    public get name(): string {
        return "delete_event";
    }

    async execute(commandContext: CommandContext): Promise<void> {
        await commandContext.ctx.reply("This is the first command");
    }
}