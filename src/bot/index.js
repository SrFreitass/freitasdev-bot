import { Telegraf } from "telegraf";
import "dotenv/config";
import { createBrowser } from "./scraping/index.js";
import { ConfigCommands } from "./commands/_configCommands.js";

export const botTelegram = new Telegraf(process.env.KEY_API_TELEGRAM);
export const browser = await createBrowser();
ConfigCommands({ botTelegram });
botTelegram.launch();
