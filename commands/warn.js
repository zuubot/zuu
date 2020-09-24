const Discord = require('discord.js');
const errorcolor = "#C11010"
const fs = require("fs")
const warns = JSON.parse(fs.readFileSync("./commands/warndb.json", "utf8"));
const dotenv = require('dotenv');
dotenv.config()

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")){

        let embed = new Discord.RichEmbed()
            .setColor(process.env.C_RED)
            .setTitle("Error")
            .setDescription("You don't have permission to warn members.")
            .setTimestamp()
            .setFooter(`Offender: ${message.author.tag}`)

        return message.channel.send(embed);
    } 

    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if (!wUser){

        let embed = new Discord.RichEmbed()
            .setColor(process.env.C_RED)
            .setTitle("Error")
            .setDescription("Invalid user.")
            .setTimestamp()

        return message.channel.send(embed);
    } 
    
    if (wUser.hasPermission("MANAGE_MESSAGES")){
        let embed = new Discord.RichEmbed()
            .setColor(process.env.C_RED)
            .setTitle("Error")
            .setDescription("You can't warn staff members.")
            .setTimestamp()
        return message.channel.send(embed);
    }



    if (!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };
    warns[wUser.id].warns++;
    fs.writeFile("./commands/warndb.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err)
    });
    
    let reason = args.join(" ").slice(22);
    if(!reason) reason = "No reason provided."

    let dmembed = new Discord.RichEmbed()
        .setColor(process.env.C_PINK)
        .addField(`Warned in:`, message.guild.name)
        .addField("Warned by:", `<@${message.author.id}>`)
        .addField("Warn Count:", warns[wUser.id].warns)
        .addField("Reason:", reason)
        .setTimestamp()

    wUser.send(dmembed)
    message.channel.send(`Done.`)
}

module.exports.help = {
    name: 'warn'
  }