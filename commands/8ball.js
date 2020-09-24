const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config()

module.exports.run = async (bot, message, args) => {

    if (!args[0]) {
        let embed = new Discord.RichEmbed()
            .setColor(process.env.C_RED)
            .setTitle("Error")
            .setDescription("Ask a longer question.")
            .setTimestamp()
        return message.channel.send(embed);
    }
    let replies = ["Yes.", "Mhm.", "Yep.", "For sure.", "Definitely.", "Maybe.", "Not sure.", "Nah.", "No chance.", "Hell no.", "Seriously?", "God no."];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(` `);

    let embed = new Discord.RichEmbed()
        .setColor(process.env.C_BLUE)
        .addField(`Question:`, question)
        .addField(`Answer:`, replies[result])
        .setTimestamp()
    message.channel.send(embed);

}

module.exports.help = {
    name: '8ball'
  };