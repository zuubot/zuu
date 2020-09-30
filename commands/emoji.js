const Discord = require("discord.js")
const dotenv = require("dotenv")
dotenv.config()

module.exports.run = async (bot, message, args) => {
    const emoji = args[0]
    if(!emoji) {
        return message.channel.send(
            new Discord.RichEmbed()
            .setTitle('Error')
            .setDescription('Invalid emoji.')
            .setColor(process.env.C_RED)
            .setTimestamp()
        )
    }
    if(!emoji.startsWith('<')) {
        return message.channel.send(
            new Discord.RichEmbed()
            .setTitle('Error')
            .setDescription('Invalid emoji.')
            .setColor(process.env.C_RED)
            .setTimestamp()
        )
    }
    let beginning = 2
    let type = ".png"
    if(emoji.startsWith('<a:')) {
        beginning = 3
        type = ".gif"
    }
    const emojilenthold = emoji.length
    const emojilength = emojilenthold-22
    console.log(emojilength)
    const emojiname = emoji.slice(beginning, 2+emojilength)
    console.log(emojiname)
    const emojj = 3+emojilength
    const newmoji = emoji.slice(emojj, emojj+18)
    console.log(newmoji)
    const link = `https://cdn.discordapp.com/emojis/${newmoji}${type}?size=1024`
    console.log(link)
    try{
    if(type == ".png") {
        return message.channel.send(
            new Discord.RichEmbed()
            .setTitle(emojiname)
            .setURL(link)
            .setImage(link)
            .setFooter("Requested by: " + message.author.tag)
            .setColor(process.env.C_BLUE)
        )
    }
     
    else if(type == ".gif") {
        return message.channel.send(
            new Discord.RichEmbed()
            .setTitle(emojiname)
            .setURL(link)
            .setImage(link)
            .setTimestamp()
            .setColor(process.env.C_BLUE)
            .setFooter("Requested by: " + message.author.tag)
        )
    }
    } catch(error) {
        return message.channel.send(
            new RichEmbed()
            .setTitle('Error')
            .setDescription('Invalid emoji.')
            .setColor(process.env.C_RED)
            .setTimestamp()
        )
    }
    }
    module.exports.help = {
        name: 'emoji'
      };