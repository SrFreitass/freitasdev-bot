import { Telegraf } from "telegraf";
import "dotenv/config";
import { createBrowser } from "../scraping/index.js";
import { jogodavelha, search, start } from "./commands.js";

export const botTelegram = new Telegraf(process.env.KEY_API_TELEGRAM);
export const browser = await createBrowser();

botTelegram.start(start);
botTelegram.command("search", (ctx) => search({ ctx, browser }));
botTelegram.command("jogodavelha", (ctx) => jogodavelha({ ctx, botTelegram }));
botTelegram.launch();
