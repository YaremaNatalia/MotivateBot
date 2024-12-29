import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const { TELEGRAM_TOKEN, RAILWAY_API_URL } = process.env;

// const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: false });
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
bot.setWebHook(`${RAILWAY_API_URL}/webhook`);

export default bot;
