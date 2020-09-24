const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config()

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("BAN_MEMBERS")){
        let embed = new Discord.RichEmbed()
            .setColor(process.env.C_RED)
            .setTitle("Error")
            .setDescription("You don't have permission to ban people.")
            .setTimestamp()
            .setFooter(`Offender: ${message.author.tag}`)
        return message.channel.send(embed);    
    }

    let userToBan = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let banReason = args.join(" ").slice(22);
    if (!banReason) banReason = "No reason provided."

    if (!userToBan){
        let embed = new Discord.RichEmbed()
            .setColor(process.env.C_RED)
            .setTitle("Error")
            .setDescription("Invalid user.")
            .setTimestamp()
        return message.channel.send(embed);
    }

    if (userToBan == message.author.id){
        let embed = new Discord.RichEmbed()
            .setColor(errorcolor)
            .setTitle(process.env.C_RED)
            .setDescription("You can't ban yourself.")
            .setTimestamp()
            
        return message.channel.send(embed);
    }

    // If they have the staff role, no banning.
    if (userToBan.hasPermission("BAN_MEMBERS")){
        let embed = new Discord.RichEmbed()
            .setColor(process.env.C_RED)
            .setTitle("Error")
            .setDescription("You can't ban a staff member.")
            .setTimestamp()

        return message.channel.send(embed);
    }

    let dmembed = new Discord.RichEmbed()
        .addField("Banned from:", message.guild.name)
        .addField("Banned by:", `<@${message.author.id}>`)
        .addField("Reason:", banReason)
        .setTimestamp()
        .setColor(process.env.C_PINK)
    await userToBan.send(dmembed)
    message.guild.member(userToBan).ban(banReason);
    message.channel.send(`Done.`)
}

module.exports.help = {
    name: 'ban'
  };