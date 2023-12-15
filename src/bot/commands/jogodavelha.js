export const jogodavelha = async ({ ctx, botTelegram }) => {
  let grid;
  let countRequest = 0;
  // Functions for Game
  function newGrid() {
    return [
      ["ㅤㅤ", "ㅤㅤ", "ㅤㅤ"],
      ["ㅤㅤ", "ㅤㅤ", "ㅤㅤ"],
      ["ㅤㅤ", "ㅤㅤ", "ㅤㅤ"],
    ];
  }

  grid = newGrid();

  function generatePosBot() {
    const botposRow = Math.floor(Math.random() * 3);
    const botposColumn = Math.floor(Math.random() * 3);

    if (
      grid[botposRow][botposColumn] == "❌" ||
      grid[botposRow][botposColumn] == "🔵"
    ) {
      generatePosBot();
      return;
    }

    grid[botposRow][botposColumn] = "🔵";
  }

  function CheckWin() {
    for (let i = 0; i < 2; i++) {
      let player = "❌";
      i == 1 ? (player = "🔵") : (player = player);
      const congratulationsMessage = `Parabéns ${player} ganhou!`;

      for (let j = 0; j < 3; j++) {
        if (
          grid[0][j] == player &&
          grid[1][j] == player &&
          grid[2][j] == player
        ) {
          ctx.reply(congratulationsMessage);
          grid = newGrid();
          return;
        }

        if (
          grid[j][0] == player &&
          grid[j][1] == player &&
          grid[j][2] == player
        ) {
          ctx.reply(congratulationsMessage);
          grid = newGrid();
          return;
        }
      }

      if (
        grid[0][0] == player &&
        grid[1][1] == player &&
        grid[2][2] == player
      ) {
        ctx.reply(congratulationsMessage);
        grid = newGrid();
        return;
      }
    }
  }

  function rulesGame(pos) {
    if (!pos[0] || !pos[1] || pos[0] == NaN || pos[1] == [NaN]) {
      ctx.reply("Posição inválida ❌");
      return;
    }

    if (pos[0] > 3 || pos[0] <= 0 || pos[1] <= 0 || pos[1] > 3) {
      ctx.reply("Posição inválida ❌");
      return;
    }

    if (grid[pos[0] - 1][pos[1] - 1] == "🔵") {
      ctx.reply("Posição inválida ❌");
      return;
    }

    return true;
  }

  ctx.reply("Você quer jogar? Então vamos.");
  ctx.reply("Começe!");

  botTelegram.on("text", (ctx) => {
    if (countRequest < 0) return;

    if (countRequest >= 12) {
      ctx.reply("Suas ações foram limitadas, aguarde 20 segundos!");
      countRequest = -1;

      setTimeout(() => {
        countRequest = 0;
      }, 25000);

      return;
    }

    const pos = ctx.message.text.split(" ");
    pos[0] = Number(pos[0]);
    pos[1] = Number(pos[1]);

    // if rules is true, player Move
    if (rulesGame(pos)) {
      grid[pos[0] - 1][pos[1] - 1] = "❌";
      generatePosBot();
    }

    CheckWin();
    ctx.reply(JSON.stringify(grid).replaceAll("],", "]\n").replaceAll('"', ""));
    countRequest++;
  });
};
