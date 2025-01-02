// import messages from "./helpers/messages.js";
// import getRandomSticker from "./helpers/getSticker.js";
// import TelegramBot from "node-telegram-bot-api";
// import dotenv from "dotenv";
// import express from "express";

// dotenv.config();

// const { TELEGRAF_TOKEN, API_URL, PORT = 3000 } = process.env;

// const bot = new TelegramBot(TELEGRAF_TOKEN, { polling: false });
// bot.setWebHook(`${API_URL}/api/webhook`);
// const app = express();
// app.use(express.json());
// const URL = `${RAILWAY_API_URL}/bot${TELEGRAF_TOKEN}`;
// bot.setWebHook(URL);
// app.post(`/bot${TELEGRAF_TOKEN}`, (req, res) => {
//   try {
//     bot.processUpdate(req.body);
//     res.sendStatus(200);
//   } catch (error) {
//     console.error("Error processing webhook", error);
//     res.sendStatus(500);
//   }
// });

// // const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// bot.onText(/\/start/, (msg) => {
//   const chatId = msg.chat.id;
//   const options = {
//     reply_markup: {
//       inline_keyboard: [
//         [
//           { text: "Українська", callback_data: "motivate_ukr" },
//           { text: "English", callback_data: "motivate_eng" },
//           { text: "Español", callback_data: "motivate_esp" },
//         ],
//       ],
//     },
//   };

//   bot.sendMessage(chatId, messages.welcomeMessage, options);
// });

// bot.on("callback_query", async (query) => {
//   const chatId = query.message.chat.id;
//   const callbackData = query.data;

//   if (callbackData.startsWith("motivate")) {
//     const language = callbackData.split("_")[1];

//     if (!messages.phrases[language]) {
//       console.error(`Invalid language: ${language}`);
//       return;
//     }

//     const greetingMessage = messages.greetings[language];
//     const options = {
//       reply_markup: {
//         inline_keyboard: [
//           [
//             {
//               text: messages.motivateButtonName[language],
//               callback_data: `generate_${language}`,
//             },
//           ],
//         ],
//       },
//     };

//     try {
//       await bot.sendMessage(chatId, greetingMessage, options);
//     } catch (error) {
//       console.error("Error sending greeting message", error);
//     }
//   }

//   if (callbackData.startsWith("generate")) {
//     const language = callbackData.split("_")[1];

//     const stickerPath = getRandomSticker();
//     if (stickerPath) {
//       try {
//         await bot.sendSticker(chatId, stickerPath);
//       } catch (error) {
//         console.error("Error sending sticker", error);
//         await bot.sendMessage(chatId, "👋😊");
//       }
//     } else {
//       await bot.sendMessage(chatId, "👋😊");
//     }

//     const randomPhrase =
//       messages.phrases[language][
//         Math.floor(Math.random() * messages.phrases[language].length)
//       ];

//     if (!randomPhrase) {
//       console.error("Random phrase is empty.");
//       return;
//     }

//     const styledMessage = `${messages.fireworks} ${randomPhrase} ${messages.fireworks}`;
//     const options = {
//       reply_markup: {
//         inline_keyboard: [
//           [
//             {
//               text: messages.moreMotivateButtonName[language],
//               callback_data: `generate_${language}`,
//             },
//           ],
//         ],
//       },
//     };

//     try {
//       await bot.sendMessage(chatId, styledMessage, options);
//     } catch (error) {
//       console.error("Error sending message", error);
//     }
//   }
// });
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import express from "express";
import dotenv from "dotenv";
import webhook from "./api/webhook.js";

dotenv.config();

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json()); // Розпарсити JSON тіла запитів

// Налаштування шляху для webhook
app.post("/api/webhook", webhook);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
