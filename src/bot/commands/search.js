import { newPage } from "../scraping/index.js";

export const search = async ({ ctx, browser, botTelegram }) => {
  console.log(ctx.message.text);
  const name = ctx.message.from.first_name;
  const message = ctx.message.text.replace("/search", "").trim();

  console.log(name, message);
  ctx.reply(
    `Aguarde um momento ${name} ♥, estamos buscando as melhores ofertas...`
  );
  ctx.reply("Aguarde um momento, estamos buscando as melhores ofertas...");
  try {
    console.log(message);
    const { search, itemsFiltered } = await newPage(browser, message);
    ctx.reply(res);
    ctx.reply("Envie 1 a 10 para selecionar o produto.");
    botTelegram.on("text", (ctx) => {
      const option = Number(ctx.message.text);

      if (option < 1 || option > 10 || !option) {
        ctx.reply("Por favor escolha um produto válido.");
        return;
      }

      ctx.reply(itemsFiltered[option].url);
    });
  } catch (err) {
    console.log(err);
    ctx.reply("Ocorreu um erro, tente novamente mais tarde.");
  }
};
