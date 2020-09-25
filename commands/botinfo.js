const Discord = require("discord.js");
const dotenv = require("dotenv")
dotenv.config()

module.exports.run = async (bot, message, args) => {

    let totalSeconds = (bot.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    let embed = new Discord.RichEmbed()
    .setColor(process.env.C_BLUE)
    .setThumbnail(bot.user.avatarURL)
    .addField("Bot Owner:", "zuoa#0333")
    .addField("Total Servers:", bot.guilds.size)
    .addField("Total Channels:", bot.channels.size)
    .addField("Total Users:", bot.users.size)
    .addField("Uptime:", `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`)
    .setTimestamp()
    .setFooter(`zuubot.github.io`)
    
    message.channel.send(embed);

}

module.exports.help = {
  name:"botinfo"
}