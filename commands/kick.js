const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config()

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("KICK_MEMBERS")){
        let embed = new Discord.RichEmbed()
            .setColor(process.env.C_RED)
            .setTitle("Error")
            .setDescription("You don't have permission to kick people.")
            .setTimestamp()
            .setFooter(`Offender: ${message.author.tag}`)
        return message.channel.send(embed);    
    }
    let kuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!kuser){
        let embed = new Discord.RichEmbed()
            .setColor(process.env.C_RED)
            .setTitle("Error")
            .setDescription("Invalid user.")
            .setTimestamp()
        return message.channel.send(embed);
    }

    if (kuser == message.author.id){
        let embed = new Discord.RichEmbed()
            .setColor(process.env.C_RED)
            .setTitle("Error")
            .setDescription("You can't kick yourself.")
            .setTimestamp()
        return message.channel.send(embed);
    }

    if (kuser.hasPermission("KICK_MEMBERS")){
        let embed = new Discord.RichEmbed()
            .setColor(process.env.C_RED)
            .setTitle("Error")
            .setDescription("You can't kick a staff member.")
            .setTimestamp()
        return message.channel.send(embed);
    }

    let kreason = args.join(" ").slice(22);
    if (!kreason) kreason = "No reason provided."

    let dmembed = new Discord.RichEmbed()
        .addField("Kicked from:", message.guild.name)
        .addField("Kicked by:", `<@${message.author.id}>`)
        .addField("Reason:", kreason)
        .setTimestamp()
        .setColor(process.env.C_PINK)

    await kuser.send(dmembed)
    message.guild.member(kuser).kick(kreason);
    message.channel.send(`Done.`)
}

module.exports.help = {
    name: 'kick'
  };