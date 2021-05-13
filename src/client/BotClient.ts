import { AkairoClient, CommandHandler, ListenerHandler} from "discord-akairo";
import { User, Message } from "discord.js";
import { truncateSync } from "node:fs";
import { join } from "path";
import { prefix, owners } from "../Config";

declare module "discord-akairo" {
    interface AkairoClient {
        commmandHandler: CommandHandler,
        listenerHandler: ListenerHandler,
    }
}

interface BotOptions {
    token?: string;
    owners?: string;
}

export default class BotClient extends AkairoClient {
    public config: BotOptions;
    public listenerHandler: ListenerHandler = new ListenerHandler(this, {
        directory: join(__dirname, "..", "listeners"),
        prefix: prefix
   });

    public commandHandler: CommandHandler = new CommandHandler(this, {
         directory: join(__dirname, "..", "commands"),
         prefix: prefix,
         "allowMention": true,
         "handleEdits": true,
         "commandUtil": true,
         "commandUtilLifetime": 3e5,
         "defaultCooldown": 6e4,
         "argumentDefaults": {
             "prompt": {
                 modifyStart: {_: Message, str: string}: string => '${str}\n\ntype \'cancel' to cancel command...'
             }
         }
    });
}