const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config()

module.exports.run = async (bot, message, args) => {

    const embed = new Discord.RichEmbed()
        .addField(`To invite Zuu:`, "[Click here.](https://discord.com/oauth2/authorize?client_id=758728628170129438&permissions=8&scope=bot 'Why are you hovering over a link? Just click it for Christ's sake.')")
        .addField(`To join the support server:`, `[Click here.](https://discord.gg/4uavY9A 'Why are you hovering over a link? Just click it for Christ's sake.')`)
        .setFooter(`zuubot.github.io`)
        .setColor(process.env.C_PINK)
        message.channel.send({embed})
        
}

module.exports.help = {
    name: "invite"
}