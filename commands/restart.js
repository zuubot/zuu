const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config()

module.exports.run = async (bot, message, args) => {

    if (!message.author.id === `752939108577312770`){
        let embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setColor(process.env.C_RED)
        .setDescription(`You don't have permission to restart the bot.`)
        .setTimestamp()
        return message.channel.send(embed)
    }

    let rembed = new Discord.RichEmbed()
        .setTitle("Restarting...")
        .setColor(process.env.C_PINK)
        .setFooter(`Requested by: ${message.author.tag}`)
        .setTimestamp()
    message.channel.send(rembed)

        .then(bot.destroy())
        await bot.login(process.env.DISCORD_BOT_TOKEN)
        await bot.user.setActivity(`with ${bot.users.size} people. | z.help`, { type: 'PLAYING' })
        let rsembed = new Discord.RichEmbed()
        .setTitle("Successfully restarted.")
        .setColor(process.env.C_BLUE)
        .setFooter(`Requested by: ${message.author.tag}`)
        .setTimestamp()
    message.channel.send(rsembed)

}

module.exports.help = {
    name: "restart"
}