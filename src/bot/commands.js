import { newPage } from "../scraping/index.js";

export const start = async (ctx) => {
  ctx.reply(
    "Olá, seja bem vindo ao bot de melhores ofertas do mercado livre! 🛒 \n \n O que deseja procurar? (/search)"
  );
};

export const search = async ({ ctx, browser }) => {
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
    const res = await newPage(browser, message);
    ctx.reply(res);
  } catch (err) {
    console.log(err);
    ctx.reply("Ocorreu um erro, tente novamente mais tarde.");
  }
};

export const jogodavelha = async ({ ctx, botTelegram }) => {
  let grid = [
    ["ㅤㅤ", "ㅤㅤ", "ㅤㅤ"],
    ["ㅤㅤ", "ㅤㅤ", "ㅤㅤ"],
    ["ㅤㅤ", "ㅤㅤ", "ㅤㅤ"],
  ];

  let botposRow = Math.floor(Math.random() * 4);
  let botposColumn = Math.floor(Math.random() * 4);

  function generatePosBot() {
    botposRow = Math.floor(Math.random() * 4);
    botposColumn = Math.floor(Math.random() * 4);
  }

  grid[botposRow][botposColumn] == "❌"
    ? generatePosBot
    : grid[botposRow][botposColumn] == "🔵";

  ctx.reply("Você quer jogar? Então vamos.");

  ctx.reply("Começe!");
  ctx.reply(JSON.stringify(grid));

  botTelegram.on("text", (ctx) => {
    const pos = ctx.message.text.split(" ");
    pos[0] = Number(pos[0]);
    pos[1] = Number(pos[1]);

    if (!pos[0] || !pos[1] || pos[0] == NaN || pos[1] == [NaN]) {
      ctx.reply("Posição inválida ❌");
      return;
    }

    if (pos[0] > 3 || pos[0] <= 0 || pos[1] <= 0 || pos[1] > 3) {
      ctx.reply("Posição inválida ❌");
      return;
    }

    grid[pos[0] - 1][pos[1] - 1] = "❌";

    if (
      (grid[0][0] == "❌" && grid[0][1] == "❌" && grid[0][2] == "❌") ||
      (grid[1][0] == "❌" && grid[1][1] == "❌" && grid[1][2] == "❌") ||
      (grid[2][0] == "❌" && grid[2][1] == "❌" && grid[2][2] == "❌")
    ) {
      ctx.reply("Parabéns você ganhou!");
    }

    if (
      (grid[0][0] == "❌" && grid[1][0] == "❌" && grid[2][0] == "❌") ||
      (grid[0][1] == "❌" && grid[1][1] == "❌" && grid[2][1] == "❌") ||
      (grid[0][2] == "❌" && grid[1][2] == "❌" && grid[2][2] == "❌")
    ) {
      ctx.reply("Parabéns você ganhou!");
    }

    if (
      (grid[0][0] == "❌" && grid[1][1] == "❌" && grid[2][2] == "❌") ||
      (grid[2][2] == "❌" && grid[1][1] == "❌" && grid[0][0] == "❌")
    ) {
      ctx.reply("Parabéns você ganhou!");
    }
    ctx.reply(JSON.stringify(grid).replaceAll("],", "]\n").replaceAll('"', ""));

    console.log(grid);
  });
};
