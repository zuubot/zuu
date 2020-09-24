const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config()

module.exports.run = async (bot, message, args) => {

    try {
        let num
        if (!message.member.hasPermission("MANAGE_MESSAGES")){
            let embed = new Discord.RichEmbed()
            .setColor(process.env.C_RED)
            .setTitle("Error")
            .setDescription("You don't have permission to purge messages.")
            .setTimestamp()
            .setFooter(`Offender: ${message.author.tag}`)
            return message.channel.send(embed);    
        }

        if (!isNaN(args[0])) {
            num = parseInt(args[0])

            if (num <= 100 && num > 1) {
                await message.delete()
                await message.channel.bulkDelete(num)
                let embed = new Discord.RichEmbed()
                .setColor(process.env.C_BLUE)
                .setTitle("Channel purged.")
                .setDescription(`**Messages Deleted:** ${num}\n**Purged by:** <@${message.author.id}>`)
                .setTimestamp()
                await message.channel.send(embed)
            } else {
                let embed = new Discord.RichEmbed()
                .setColor(process.env.C_RED)
                .setTitle("Error")
                .setDescription("Please enter a number above 1 and below 100.")
                .setTimestamp()
                return message.channel.send(embed);
            }

        } else {
            let embed = new Discord.RichEmbed()
            .setColor(process.env.C_RED)
            .setTitle("Error")
            .setDescription("Please enter a number below 100.")
            .setTimestamp()
            return message.channel.send(embed);
            
        }
    } catch (err) {
    }
}

module.exports.help = {
    name: ('purge')
  }