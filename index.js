const axios = require("axios");
const { logger } = require("./logger");
require("dotenv").config();
const TelegramApi = require("node-telegram-bot-api");

const url = "https://evilinsult.com/generate_insult.php";
const bot = new TelegramApi(process.env.TOKEN, { polling: true });

const start = async () => {
  bot.setMyCommands([
    { command: "/offend", description: "Пришли оскорбление" }
  ]);

  bot.on("message", async (message) => {
    const text = message.text;
    const chatId = message.chat.id;
    const username = message.from.username;

    try {
      if (text === "/start") {
        return bot.sendMessage(chatId, `Здарова, @${username}, заебал!`);
      }

      if (text === "/offend") {
        const { data } = await axios.get(url, { params: { lang: "ru" } });
        return bot.sendMessage(chatId, data.replace(/\s\s+/g, " "));
      }

      return bot.sendMessage(
        chatId,
        `@${username}, ты что за хуету тут понаписал, пидор!`
      );
    } catch (error) {
      logger.info(error);
      return bot.sendMessage(chatId, "Что-то какая-то хуета произошла, пидор");
    }
  });
};

start();
