const TelegramApi = require("node-telegram-bot-api");

require("dotenv").config();

const bot = new TelegramApi(process.env.TOKEN, { polling: true });

bot.on("message", (message) => {
  console.log(message);
});
