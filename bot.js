const axios = require("axios");
const { logger } = require("./logger");
require("dotenv").config();

const TelegramApi = require("node-telegram-bot-api");
const url = "https://evilinsult.com/generate_insult.php";
const photo = "https://ibb.co/SnXTRFc";
const bot = new TelegramApi(process.env.TOKEN, { polling: true });

const start = async () => {
  const getBotInfo = async () => {
    try {
      return await bot.getMe();
    } catch (error) {
      logger.info(error);
    }
  };

  const botInfo = await getBotInfo();
  const getCommandNames = (command) =>
    botInfo ? [command, `${command}@${botInfo.username}`] : [command];

  bot.setMyCommands([
    { command: "/offend", description: "Пришли оскорбление" }
  ]);

  bot.on("message", async (message) => {
    const text = message.text;
    const chatId = message.chat.id;
    const { username, first_name: firstName } = message.from;
    const personName = username ? `@${username}` : firstName;
    console.log(message);

    try {
      if (getCommandNames("/start").includes(text)) {
        return bot.sendMessage(chatId, `Здарова, @${personName}, заебал!`);
      }

      if (getCommandNames("/offend").includes(text)) {
        const { data } = await axios.get(url, { params: { lang: "ru" } });
        return bot.sendMessage(chatId, data.replace(/\s\s+/g, " "));
      }

      return bot.sendPhoto(chatId, photo, {
        caption: `${personName}, ты что за хуету тут понаписал, пидор!`
      });
    } catch (error) {
      logger.info(error);
      return bot.sendMessage(chatId, "Что-то какая-то хуета произошла, пидор");
    }
  });
};

module.exports.start = start;
