const Discord = require("discord.js");
const dotenv = require("dotenv")
dotenv.config()

module.exports.run =async (bot, message, args) => {

    const embed = new Discord.RichEmbed()
    .setThumbnail(message.guild.iconURL)
    .setTitle(message.guild.name)
    .setColor(process.env.C_BLUE)
    .addField(`Owner:`, `${message.guild.owner.user.tag}\n`)
    .addField('Member Count:', `${message.guild.memberCount - message.guild.members.filter(m=>m.user.bot).size} User(s), ${message.guild.members.filter(m=>m.user.bot).size} Bot(s)\n`)
    .addField('Location:', message.guild.region + "\n")
    .addField('Created at:', message.guild.createdAt.toLocaleString() + "\n")
    .addField(`Boosters:`, message.guild.premiumSubscriptionCount >= 1 ? `${message.guild.premiumSubscriptionCount}` : `N/A`)
    .setTimestamp()
    .setFooter("Requested by: " + message.author.tag + ` (ID: ${message.guild.owner.id})`);
    message.channel.send({embed});

}

    module.exports.help = {
        name: "serverinfo"
    }