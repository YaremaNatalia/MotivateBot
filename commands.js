import messages from "./helpers/messages.js";
import getRandomSticker from "./helpers/getSticker.js";
import bot from "./bot.js";

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Українська", callback_data: "motivate_ukr" },
          { text: "English", callback_data: "motivate_eng" },
          { text: "Español", callback_data: "motivate_esp" },
        ],
      ],
    },
  };

  bot.sendMessage(chatId, messages.welcomeMessage, options);
});

bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const callbackData = query.data;

  if (callbackData.startsWith("motivate")) {
    const language = callbackData.split("_")[1];

    if (!messages.phrases[language]) {
      console.error(`Invalid language: ${language}`);
      return;
    }

    const greetingMessage = messages.greetings[language];
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: messages.motivateButtonName[language],
              callback_data: `generate_${language}`,
            },
          ],
        ],
      },
    };

    try {
      await bot.sendMessage(chatId, greetingMessage, options);
    } catch (error) {
      console.error("Error sending greeting message", error);
    }
  }

  if (callbackData.startsWith("generate")) {
    const language = callbackData.split("_")[1];

    const stickerPath = getRandomSticker();
    if (stickerPath) {
      try {
        await bot.sendSticker(chatId, stickerPath);
      } catch (error) {
        console.error("Error sending sticker", error);
        await bot.sendMessage(chatId, "👋😊");
      }
    } else {
      await bot.sendMessage(chatId, "👋😊");
    }

    const randomPhrase =
      messages.phrases[language][
        Math.floor(Math.random() * messages.phrases[language].length)
      ];

    if (!randomPhrase) {
      console.error("Random phrase is empty.");
      return;
    }

    const styledMessage = `${messages.fireworks} ${randomPhrase} ${messages.fireworks}`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: messages.moreMotivateButtonName[language],
              callback_data: `generate_${language}`,
            },
          ],
        ],
      },
    };

    try {
      await bot.sendMessage(chatId, styledMessage, options);
    } catch (error) {
      console.error("Error sending message", error);
    }
  }
});
