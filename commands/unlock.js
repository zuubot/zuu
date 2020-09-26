const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config()

module.exports.run = async (bot, message, args) => {
    const erole = message.guild.roles.find("name", "@everyone");
    let LockReason = args.join(" ").slice(1);
    if (!LockReason) LockReason = "No reason specified."
    let locker = message.author;

    if (message.channel.permissionsFor(erole).has("SEND_MESSAGES")) {
        let embed = new Discord.RichEmbed()
        .setTitle(`Error`)
        .setDescription(`Channel already unlocked.`)
        .setTimestamp()
        .setColor(process.env.C_RED)
        return message.channel.send(embed)
    }
    await message.channel.overwritePermissions(erole, {
        SEND_MESSAGES: true,
        ADD_REACTIONS: true
    }).then(() => {
            let embed = new Discord.RichEmbed()
            .setTitle(`Unlocked.`)
            .addField(`Reason:`, LockReason)
            .addField(`Unlocked by:`, "<@" + locker.id + ">")
            .setColor(process.env.C_BLUE)
            .setTimestamp()
            return message.channel.send(embed)
        })
    }

module.exports.help = {
    name: "unlock"
}