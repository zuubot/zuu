const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        let embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setTimestamp()
        .setColor(process.env.C_RED)
        .setDescription(`You don't have permission to unmute people.`)
        return message.channel.send(embed);
    }

        let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!toMute){
            let embed = new Discord.RichEmbed()
            .setTitle("Error")
            .setTimestamp()
            .setColor(process.env.C_RED)
            .setDescription(`Invalid user.`)
            return message.channel.send(embed);
        }

        let role = message.guild.roles.find(r => r.name === "Muted")
        
        if(!role || !toMute.roles.has(role.id)){
            let embed = new Discord.RichEmbed()
            .setTitle("Error")
            .setTimestamp()
            .setColor(process.env.C_RED)
            .setDescription(`User not muted.`)
            return message.channel.send(embed);
        }

        await toMute.removeRole(role);
        let embed = new Discord.RichEmbed()
        .setTitle(toMute.user.tag + " is now unmuted.")
        .setTimestamp()
        .setColor(process.env.C_PINK)
        message.channel.send(embed);

        message.delete();

     }
    
        module.exports.help = {
            name: "unmute"
        }