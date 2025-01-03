import { Bot, InlineKeyboard, InputFile } from "grammy";
import dotenv from "dotenv";
import getSticker from "./helpers/getSticker.js";
import messages from "./helpers/messages.js";
import stickers from "./helpers/stickers.js";
import getRandomSticker from "./helpers/getSticker.js";

dotenv.config();

const { TELEGRAF_TOKEN, API_URL } = process.env;

const bot = new Bot(TELEGRAF_TOKEN);
const userLanguages = {};

bot.command("start", async (ctx) => {
  const keyboard = new InlineKeyboard()
    .text("Українська", "motivate_ukr")
    .text("English", "motivate_eng")
    .text("Español", "motivate_esp");

  await ctx.reply(messages.welcomeMessage, {
    reply_markup: keyboard,
  });
});

bot.on("callback_query:data", async (ctx) => {
  const userName = ctx.from.first_name;
  const callbackData = ctx.callbackQuery.data;

  if (callbackData.startsWith("motivate")) {
    const language = callbackData.split("_")[1];

    if (!messages.phrases[language]) {
      console.error(`Invalid language: ${language}`);
      await ctx.answerCallbackQuery({ text: "Invalid language selected!" });
      return;
    }
    userLanguages[ctx.from.id] = language;
    const greetingMessage = messages.greetings(userName, language);
    const keyboard = new InlineKeyboard().text(
      messages.motivateButtonName[language],
      `generate_${language}`
    );

    try {
      await ctx.reply(greetingMessage, { reply_markup: keyboard });
      await ctx.answerCallbackQuery(); // Закриває callback-запит
    } catch (error) {
      console.error("Error sending greeting message", error);
    }
  }

  if (callbackData.startsWith("generate")) {
    const language = callbackData.split("_")[1];
    const randomSticker = getRandomSticker();
    if (randomSticker) {
      try {
        await ctx.replyWithSticker(randomSticker);
      } catch (error) {
        console.error("Error sending sticker", error);
        await ctx.reply("👋😊");
      }
    } else {
      await ctx.reply("👋😊");
    }

    const randomPhrase =
      messages.phrases[language][
        Math.floor(Math.random() * messages.phrases[language].length)
      ];

    if (!randomPhrase) {
      console.error("Random phrase is empty.");
      return;
    }

    const styledMessage = `${messages.fireworks}${randomPhrase}${messages.fireworks}`;
    const keyboard = new InlineKeyboard().text(
      messages.moreMotivateButtonName[language],
      `generate_${language}`
    );

    try {
      await ctx.reply(styledMessage, { reply_markup: keyboard });
      await ctx.answerCallbackQuery(); // Закриває callback-запит
    } catch (error) {
      console.error("Error sending message", error);
    }
  }
});

bot.on("message", async (ctx) => {
  const language = userLanguages[ctx.from.id];
  const randomSticker = getRandomSticker();
  try {
    if (randomSticker) {
      try {
        await ctx.replyWithSticker(randomSticker);
      } catch (error) {
        console.error("Sticker not found.");
        await ctx.reply("👋😊");
      }
    } else {
      await ctx.reply("👋😊");
    }

    const reactionText = messages.onMessageReaction[language];
    const keyboard = new InlineKeyboard().text(
      messages.moreMotivateButtonName[language],
      `generate_${language}`
    );

    await ctx.reply(reactionText, { reply_markup: keyboard });
    await ctx.answerCallbackQuery(); // Закриває callback-запит
  } catch (error) {
    console.error("Error processing message", error);
  }
});

bot.start();
