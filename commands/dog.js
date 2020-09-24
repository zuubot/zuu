const Discord = require("discord.js");
const dotenv = require('dotenv');
dotenv.config()

module.exports.run = async (client, message, args) => {
    
    const superagent = require("superagent");
    const { body } = await superagent
    .get('https://random.dog/woof.json');

    const embed  = new Discord.RichEmbed()
    .setFooter(`API provided by random.dog.`)
    .setTimestamp()
    .setTitle(`Woof.`)
    .setColor(process.env.C_BLUE)
    .setImage(body.url)
    if (body.url.includes(".mp4")) return message.channel.send(`Error. Try again.`);
    message.channel.send({embed})

  }
  
  module.exports.help = {
    name: ('dog')
  };