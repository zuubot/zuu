import Discord from 'discord.js';
import fs from 'fs';
import chalk from 'chalk';
import dotenv from 'dotenv';
import { CronJob } from 'cron';
import './db';
import weeklyStatCron from './utils/weeklyStatCron';
require('newrelic');

dotenv.config();

const log = console.log;
const express = require('express')
const app = express()

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('Avoiding error. Listening on port ', app.get('port') + ".");
});

const bot = new Discord.Client({ disableEveryone: true });
bot.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
  if (err) log(err);

  const jsfiles = files.filter(f => f.split('.').pop() === 'js');
  if (jsfiles.length <= 0) {
    chalk.red("[COMMANDS] Could not find commmands.");
    return;
  }

  jsfiles.forEach(f => {
    const props = require(`./commands/${f}`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on('ready', async () => {  
  log(chalk.magenta(
    '[' +
    chalk.white.bold('READY') +
    '] ' +
    chalk.white(`Connected to Discord. Currently in: ${bot.guilds.size} server(s) with ${bot.users.size} people.`)
  ));
  bot.user.setActivity(`with ${bot.users.size} people. | -help`, { type: 'PLAYING' });
});

bot.on('guildCreate', newGuild => {
  bot.user.setActivity(`with ${bot.users.size} people. | -help`, { type: 'PLAYING' });
})  

bot.on("guildDelete", guild => {
  bot.user.setActivity(`with ${bot.users.size} people. | -help`, { type: 'PLAYING' });
})
bot.on('message', async message => {
  if (!message.content.startsWith(process.env.PREFIX)) return
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;

  const messageArray = message.content.split(' ');
  const cmd = messageArray[0];
  const args = messageArray.slice(1);

  const commandFile = bot.commands.get(cmd.slice(process.env.PREFIX.length));
  if (commandFile) commandFile.run(bot, message, args);
});

new CronJob(
  '0 12 * * 0',
  () => {
    weeklyStatCron(bot);
  },
  null,
  true,
  'America/Chicago'
);

bot.on('error', console.error);

bot.login(process.env.DISCORD_BOT_TOKEN);
