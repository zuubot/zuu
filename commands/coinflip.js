const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config()

module.exports.run = async (bot, message, args) => {

    var coinflip = ['Heads!','Tails!'];
    let embed = new Discord.RichEmbed()
        .setColor(process.env.C_BLUE)
        .setTitle(coinflip[Math.floor(Math.random () * coinflip.length)])
        .setTimestamp()
    message.channel.send(embed);

}

module.exports.help = {
    name: 'coinflip'
  };