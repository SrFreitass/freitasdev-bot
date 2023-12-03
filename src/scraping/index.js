import puppeteer from "puppeteer";
import { Telegraf } from "telegraf";
import { botTelegram } from "../bot/index.js";

import "dotenv/config";

export const createBrowser = async () => {
  const browser = await puppeteer.launch({ headless: false });
  return browser;
};

export const newPage = async (browser, message) => {
  const page = await browser.newPage();
  let search = "";
  let items = [];

  await page.goto(
    `https://lista.mercadolivre.com.br/${message}_OrderId_PRICE_NoIndex_True`
  );

  await page.waitForSelector(".ui-search-layout__item");

  items = await page.evaluate(() => {
    return [...document.querySelectorAll(".ui-search-layout__item")].map(
      (item) => {
        return {
          title: item.querySelector(".ui-search-item__title").innerText,
          url: item.querySelector("a").href,
          price: `${
            item.querySelector(".andes-money-amount__fraction")
              ? item.querySelector(".andes-money-amount__fraction").innerText
              : ""
          }.${
            item.querySelector(".andes-money-amount__cents")
              ? item.querySelector(".andes-money-amount__cents").innerText
              : ""
          }`,
          stars: item.querySelector(".ui-search-reviews__rating-number")
            ? item.querySelector(".ui-search-reviews__rating-number").innerText
            : "Sem avaliação",
        };
      }
    );
  });

  items.slice(0, 10).forEach((product, index) => {
    search += `\n 🛒${index + 1} ${product.title} \n 💸${
      product.price
    }  \n ⭐ ${product.stars}\n`;
  });

  return search;
};
