import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const { TELEGRAM_TOKEN, RAILWAY_API_URL } = process.env;
const token = "7643769299:AAF3mg373NtHhk3bUTFe608Hvm0QDmQQJDk";
const url = "https://motivatebot-production.up.railway.app";

const bot = new TelegramBot(token, { polling: false });
bot.setWebHook(`${url}/webhook`);

export default bot;
