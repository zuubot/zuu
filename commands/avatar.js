const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config()

module.exports.run = async (bot, message, args) => {

    let user = message.mentions.users.first() || message.author
    const embed = new Discord.RichEmbed()
          .setAuthor(user.username + "'s Avatar")
          .setImage(user.displayAvatarURL)
          .setColor(process.env.C_BLUE)
  message.channel.send({embed})
}

module.exports.help = {
    name: "avatar"
}