const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config()

module.exports.run = async (bot, message, args) => {

    if (!message.guild.member(bot.user).hasPermission('MANAGE_ROLES')){
        let embed = new Discord.RichEmbed()
        .setTitle(`Error`)
        .setColor(process.env.C_RED)
        .setDescription(`I don't have permission to manage roles.`)
        .setTimestamp()
        return message.channel.send(embed);
      } 
    if (message.member.hasPermission("MANAGE_ROLES")) {
    if (message.mentions.users.size < 1){
        let embed = new Discord.RichEmbed()
        .setColor(process.env.C_BLUE)
        .setDescription(`**Usage:**\n\`z.addrole @zuoa#1111 Owners\``)
        .setTimestamp()
        message.channel.send(embed)
  }

  let user = message.guild.member(message.mentions.users.first());
  if (user.highestRole.position >= message.member.highestRole.position){
    let embed = new Discord.RichEmbed()
    .setTitle(`Error`)
    .setColor(process.env.C_RED)
    .setDescription(`Cannot add role due to role hierarchy.`)
    .setTimestamp()
    return message.channel.send(embed);
  } 
  let roleName = args.slice(1).join(' ')
  let test123 = message.guild.roles.find(r => r.name == roleName)
  if (!test123){
    let embed = new Discord.RichEmbed()
    .setTitle(`Error`)
    .setColor(process.env.C_RED)
    .setDescription(`Invalid role.`)
    .setTimestamp()
    return message.channel.send(embed);
  } 
  if (test123.position >= message.guild.member(bot.user).highestRole.position){
    let embed = new Discord.RichEmbed()
    .setTitle(`Error`)
    .setColor(process.env.C_RED)
    .setDescription(`Cannot add role due to role hierarchy.`)
    .setTimestamp()
    return message.channel.send(embed);
  } 

  if (roleName.length < 1){
    let embed = new Discord.RichEmbed()
    .setTitle(`Error`)
    .setColor(process.env.C_RED)
    .setDescription(`Invalid role.`)
    .setTimestamp()
    return message.channel.send(embed);
  } 
  message.guild.member(user.user.id).addRole(test123);
  let embed = new Discord.RichEmbed()
  .setDescription(`<@${user.id}> was given <@&${test123.id}>.`)
  .setFooter(`Role ID: ` + test123.id)
  .setColor(process.env.C_BLUE)
  .setTimestamp()
  message.channel.send(embed)
    }
}

module.exports.help = {
    name: 'addrole'
  }