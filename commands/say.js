const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config()

module.exports.run = async (bot, message, args) => {

    if (!args[0]) {
        let embed = new Discord.RichEmbed()
            .setColor(process.env.C_RED)
            .setTitle("Error")
            .setDescription("Provide something to say.")
            .setTimestamp()
        return message.channel.send(embed);
    }
    let saying = args.slice(0).join(` `);
    if (saying === "nigger") return message.channel.send(`<@${message.author.id}> ???`)
    if (saying === "Nigger") return message.channel.send(`<@${message.author.id}> ???`)
    if (saying === "faggot") return message.channel.send(`<@${message.author.id}> ???`)
    if (saying === "Faggot") return message.channel.send(`<@${message.author.id}> ???`)
    let embed = new Discord.RichEmbed()
        .setColor(process.env.C_BLUE)
        .setDescription(saying)
        .setFooter(`Requested by: ${message.author.tag}`)
        .setTimestamp()
    message.channel.send(embed);

}

module.exports.help = {
    name: 'say'
  };