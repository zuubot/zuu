const fs = require("fs");
const Discord = require(`discord.js`)
let warns = JSON.parse(fs.readFileSync("./commands/warndb.json", "utf8"));
const dotenv = require('dotenv');
dotenv.config()

module.exports.run = async (bot, message, args) => {

    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if (!wUser){
        let embed = new Discord.RichEmbed()
            .setColor(process.env.C_RED)
            .setTitle("Error")
            .setDescription("Invalid user.")
            .setTimestamp()
        return message.channel.send(embed);
    } 
    
    if (!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };

    let wembed = new Discord.RichEmbed()
        .setColor(process.env.C_BLUE)
        .addField(wUser.user.tag, `**Warns:** ` + warns[wUser.id].warns)
        .setTimestamp()
        .setFooter(`ID: ` + wUser.user.id)
    message.channel.send(wembed)
}

module.exports.help = {
    name: 'warns'
  }