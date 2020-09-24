const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config()

module.exports.run = async (bot, message, args) => {

    min = Math.ceil(100);
    max = Math.floor(1);
    let percent = Math.floor(Math.random() * (max - min) + min);
    let gayuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if(!gayuser){
        if(message.author.id === "752939108577312770") {
            let embed = new Discord.RichEmbed()
            .setColor(process.env.C_RED)
            .setTitle(`Gay-O-Meter`)
            .setDescription(`<@${message.author.id}>` + ` is -` + percent + `% gay.`)
            .setFooter(`${message.author.username} is a 0 on the Kinsey Scale, meaning they are straight.`)
            .setThumbnail(`https://media.wired.com/photos/5926eaa2cfe0d93c47431c8f/master/w_2400,c_limit/rainbow-flag-lgbtq-pride-531794786-s.jpg`)
            return message.channel.send(embed)
        }
        if (14 > percent){
            let embed = new Discord.RichEmbed()
            .setColor(process.env.C_RED)
            .setTitle(`Gay-O-Meter`)
            .setDescription(`<@` + message.author.id + `>` + ` is ` + percent + `% gay.`)
            .setFooter(`${message.author.username} is a 0 on the Kinsey Scale, meaning they are straight.`)
            .setThumbnail(`https://media.wired.com/photos/5926eaa2cfe0d93c47431c8f/master/w_2400,c_limit/rainbow-flag-lgbtq-pride-531794786-s.jpg`)
            return message.channel.send(embed)
        }
        if (28 > percent) {
            let embed = new Discord.RichEmbed()
            .setColor("FFA200")
            .setTitle(`Gay-O-Meter`)
            .setDescription(`<@` + message.author.id + `>` + ` is **` + percent + `%** gay.`)
            .setFooter(`${message.author.username} is a 1 on the Kinsey Scale, meaning they are mostly straight.`)
            .setThumbnail(`https://media.wired.com/photos/5926eaa2cfe0d93c47431c8f/master/w_2400,c_limit/rainbow-flag-lgbtq-pride-531794786-s.jpg`)
            return message.channel.send(embed)
        }
        if (42 > percent){
            let embed = new Discord.RichEmbed()
            .setColor("FFFF00")
            .setTitle(`Gay-O-Meter`)
            .setDescription(`<@` + message.author.id + `>` + ` is **` + percent + `%** gay.`)
            .setFooter(`${message.author.username} is a 2 on the Kinsey Scale, meaning they are straight, but somewhat gay.`)
            .setThumbnail(`https://media.wired.com/photos/5926eaa2cfe0d93c47431c8f/master/w_2400,c_limit/rainbow-flag-lgbtq-pride-531794786-s.jpg`)
            return message.channel.send(embed)
        } 
        if (56 > percent){
            let embed = new Discord.RichEmbed()
            .setColor("3AFF00")
            .setTitle(`Gay-O-Meter`)
            .setDescription(`<@` + message.author.id + `>` + ` is **` + percent + `%** gay.`)
            .setFooter(`${message.author.username} is a 3 on the Kinsey Scale, meaning they are bisexual.`)
            .setThumbnail(`https://media.wired.com/photos/5926eaa2cfe0d93c47431c8f/master/w_2400,c_limit/rainbow-flag-lgbtq-pride-531794786-s.jpg`)
            return message.channel.send(embed)
        }
        if (70 > percent) {
            let embed = new Discord.RichEmbed()
            .setColor("0097FF")
            .setTitle(`Gay-O-Meter`)
            .setDescription(`<@` + message.author.id + `>` + ` is **` + percent + `%** gay.`)
            .setFooter(`${message.author.username} is a 4 on the Kinsey Scale, meaning they are mostly gay, but somewhat straight.`)
            .setThumbnail(`https://media.wired.com/photos/5926eaa2cfe0d93c47431c8f/master/w_2400,c_limit/rainbow-flag-lgbtq-pride-531794786-s.jpg`)
            return message.channel.send(embed)
        }
        if (84 > percent){
            let embed = new Discord.RichEmbed()
            .setColor("0027FF")
            .setTitle(`Gay-O-Meter`)
            .setDescription(`<@` + message.author.id + `>` + ` is **` + percent + `%** gay.`)
            .setFooter(`${message.author.username} is a 5 on the Kinsey Scale, meaning they are mostly gay.`)
            .setThumbnail(`https://media.wired.com/photos/5926eaa2cfe0d93c47431c8f/master/w_2400,c_limit/rainbow-flag-lgbtq-pride-531794786-s.jpg`)
            return message.channel.send(embed)
        }
        if (98 > percent){
            let embed = new Discord.RichEmbed()
            .setColor("0D800FF")
            .setTitle(`Gay-O-Meter`)
            .setDescription(`<@` + message.author.id + `>` + ` is **` + percent + `%** gay.`)
            .setFooter(`${message.author.username} is a 6 on the Kinsey Scale, meaning they are fully gay.`)
            .setThumbnail(`https://media.wired.com/photos/5926eaa2cfe0d93c47431c8f/master/w_2400,c_limit/rainbow-flag-lgbtq-pride-531794786-s.jpg`)
            return message.channel.send(embed)
        }
    }

        if(gayuser.user.id === "752939108577312770") {
        let embed = new Discord.RichEmbed()
        .setColor(process.env.C_RED)
        .setTitle(`Gay-O-Meter`)
        .setDescription(`<@533102888537423892>` + ` is -` + percent + `% gay.`)
        .setFooter(`${gayuser.username} is a 0 on the Kinsey Scale, meaning they are straight.`)
        .setThumbnail(`https://media.wired.com/photos/5926eaa2cfe0d93c47431c8f/master/w_2400,c_limit/rainbow-flag-lgbtq-pride-531794786-s.jpg`)
        return message.channel.send(embed)
    }
    
        if (14 > percent){
            let embed = new Discord.RichEmbed()
            .setColor(process.env.C_RED)
            .setTitle(`Gay-O-Meter`)
            .setDescription(`<@` + gayuser.id + `>` + ` is ` + percent + `% gay.`)
            .setFooter(`${gayuser.user.username} is a 0 on the Kinsey Scale, meaning they are straight.`)
            .setThumbnail(`https://media.wired.com/photos/5926eaa2cfe0d93c47431c8f/master/w_2400,c_limit/rainbow-flag-lgbtq-pride-531794786-s.jpg`)
            return message.channel.send(embed)
        }
        if (28 > percent) {
            let embed = new Discord.RichEmbed()
            .setColor("FFA200")
            .setTitle(`Gay-O-Meter`)
            .setDescription(`<@` + gayuser.id + `>` + ` is **` + percent + `%** gay.`)
            .setFooter(`${gayuser.user.username} is a 1 on the Kinsey Scale, meaning they are mostly straight.`)
            .setThumbnail(`https://media.wired.com/photos/5926eaa2cfe0d93c47431c8f/master/w_2400,c_limit/rainbow-flag-lgbtq-pride-531794786-s.jpg`)
            return message.channel.send(embed)
        }
        if (42 > percent){
            let embed = new Discord.RichEmbed()
            .setColor("FFFF00")
            .setTitle(`Gay-O-Meter`)
            .setDescription(`<@` + gayuser.id + `>` + ` is **` + percent + `%** gay.`)
            .setFooter(`${gayuser.user.username} is a 2 on the Kinsey Scale, meaning they are straight, but somewhat gay.`)
            .setThumbnail(`https://media.wired.com/photos/5926eaa2cfe0d93c47431c8f/master/w_2400,c_limit/rainbow-flag-lgbtq-pride-531794786-s.jpg`)
            return message.channel.send(embed)
        } 
        if (56 > percent){
            let embed = new Discord.RichEmbed()
            .setColor("3AFF00")
            .setTitle(`Gay-O-Meter`)
            .setDescription(`<@` + gayuser.id + `>` + ` is **` + percent + `%** gay.`)
            .setFooter(`${gayuser.user.username} is a 3 on the Kinsey Scale, meaning they are bisexual.`)
            .setThumbnail(`https://media.wired.com/photos/5926eaa2cfe0d93c47431c8f/master/w_2400,c_limit/rainbow-flag-lgbtq-pride-531794786-s.jpg`)
            return message.channel.send(embed)
        }
        if (70 > percent) {
            let embed = new Discord.RichEmbed()
            .setColor("0097FF")
            .setTitle(`Gay-O-Meter`)
            .setDescription(`<@` + gayuser.id + `>` + ` is **` + percent + `%** gay.`)
            .setFooter(`${gayuser.user.username} is a 4 on the Kinsey Scale, meaning they are mostly gay, but somewhat straight.`)
            .setThumbnail(`https://media.wired.com/photos/5926eaa2cfe0d93c47431c8f/master/w_2400,c_limit/rainbow-flag-lgbtq-pride-531794786-s.jpg`)
            return message.channel.send(embed)
        }
        if (84 > percent){
            let embed = new Discord.RichEmbed()
            .setColor("0027FF")
            .setTitle(`Gay-O-Meter`)
            .setDescription(`<@` + gayuser.id + `>` + ` is **` + percent + `%** gay.`)
            .setFooter(`${gayuser.user.username} is a 5 on the Kinsey Scale, meaning they are mostly gay.`)
            .setThumbnail(`https://media.wired.com/photos/5926eaa2cfe0d93c47431c8f/master/w_2400,c_limit/rainbow-flag-lgbtq-pride-531794786-s.jpg`)
            return message.channel.send(embed)
        }
        if (98 > percent){
            let embed = new Discord.RichEmbed()
            .setColor("0D800FF")
            .setTitle(`Gay-O-Meter`)
            .setDescription(`<@` + gayuser.id + `>` + ` is **` + percent + `%** gay.`)
            .setFooter(`${gayuser.user.username} is a 6 on the Kinsey Scale, meaning they are fully gay.`)
            .setThumbnail(`https://media.wired.com/photos/5926eaa2cfe0d93c47431c8f/master/w_2400,c_limit/rainbow-flag-lgbtq-pride-531794786-s.jpg`)
            return message.channel.send(embed)
        }

}

module.exports.help = {
    name: ('gay')
  };