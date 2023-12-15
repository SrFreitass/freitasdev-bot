import { browser } from "../index.js";
import { start } from "./start.js";
import { search } from "./search.js";
import { jogodavelha } from "./jogodavelha.js";

export const ConfigCommands = ({ botTelegram }) => {
  botTelegram.start(start);
  botTelegram.command("search", (ctx) => search({ ctx, browser, botTelegram }));
  botTelegram.command("jogodavelha", (ctx) =>
    jogodavelha({ ctx, botTelegram })
  );
};
