const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch')
const dotenv = require('dotenv');
dotenv.config()

module.exports.run = async (client, message, args) => {
try {
        const superagent = require("superagent");
        const { body } = await superagent
            .get('https://aws.random.cat/meow').then(res => {
                const embed = new Discord.RichEmbed()
                .setColor(process.env.C_BLUE)
                .setImage(res.body.file)
                .setFooter(`API provided by random.cat.`)
                .setTitle(`Meow.`)
                return message.channel.send({embed});
            })
            
		} catch (err) {
			return message.reply(`Error. \`${err.message}\`.`);
		}
}

module.exports.help = {
    name: 'cat'
  };