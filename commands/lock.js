
const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config()

module.exports.run = async (bot, message, args) => {

const erole = message.guild.roles.find("name", "@everyone");
    
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        let embed = new Discord.RichEmbed()
        .setTitle(`Error`)
        .setColor(process.env.C_RED)
        .setDescription("You don't have permission to lock channels.")
        return message.channel.send(embed)
    }

    if (!message.guild.me.hasPermission("MANAGE_CHANNELS", "MANAGE_GUILD", "MANAGE_ROLES")) {
        let embed = new Discord.RichEmbed()
        .setColor(process.env.C_RED)
        .setTitle('Error')
        .setDescription(`I don't have permissions to lock channels.`)
        .setTimestamp()
        message.channel.send(embed)
      }

    if (!args[0]) {
        let embed = new Discord.RichEmbed()
        .setColor(process.env.C_RED)
        .setTitle('Error')
        .setDescription(`Please provide a valid parameter.\n\`Example: -lock on/off Gay porn raid.\``)
        .setTimestamp()
        message.channel.send(embed)
    }   

    let locker = message.author;

    let LockReason = args.join(" ").slice(3);
    if (!LockReason) {
        LockReason = "No reason specified."
    }
        
    if (args[0] === 'on') {
        await message.channel.overwritePermissions(erole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
        }).then(() => {
                let embed = new Discord.RichEmbed()
                .setTitle(`🔒 Locked.`)
                .addField(`Reason:`, LockReason)
                .addField(`Locked by:`, "<@" + locker.id + ">")
                .setColor(process.env.C_PINK)
                .setTimestamp()

                return message.channel.send(embed)
            })
        } else if (args[0] === 'off') {
            await message.channel.overwritePermissions(erole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            }).then(() => {
                    let embed = new Discord.RichEmbed()
                    .setTitle(`🔓 Unlocked.`)
                    .addField(`Reason:`, LockReason)
                    .addField(`Unlocked by:`, "<@" + locker.id + ">")
                    .setColor(process.env.C_BLUE)
                    .setTimestamp()
                    return message.channel.send(embed)
                }
            )
        }
    }

module.exports.help = {
    name: "lock"
}