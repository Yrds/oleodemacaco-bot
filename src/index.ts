import dotenv from 'dotenv';
dotenv.config();
import { Telegraf, Telegram } from 'telegraf';
import database from './database';
import ChatUserModel from './Models/ChatUser';
import cron from 'node-cron';

database.authenticate().then(async () => {
  await database.sync({ alter: true});
}).catch((err: any) => console.error(err.message));

const bot = new Telegraf(process.env.BOT_HTTP_TOKEN as string);

bot.start(async (ctx) => {
  ctx.reply('Te avisarei todos os dias para você não perder uma hora do óleo de macaco.')
  if(ctx){
    await ChatUserModel.create({chatId: ctx?.chat?.id })
  }
});

bot.help((ctx) => ctx.reply('Não precisa fazer nada, eu te avisarei quando for a hora do óleo de macaco.'));

bot.launch()
const PORT = process.env.PORT as string;
bot.startWebhook('/webhook', null, Number(PORT));

cron.schedule("0 0 * * *", async () => {
  const telegram = new Telegram(process.env.BOT_HTTP_TOKEN as string);
  const allChatUsers = ChatUserModel.findAll().
    then((chatUsers: any) =>  {
      chatUsers.forEach((chatUser: any) => telegram.sendMessage(chatUser.chatId, 'Meia noite, horário oficial do óleo de macaco'))
    });
})


export {};
