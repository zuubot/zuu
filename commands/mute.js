const Discord = require("discord.js");
const ms = require("ms");
import dotenv from 'dotenv';
dotenv.config()

module.exports.run = async (bot, message, args) => {
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) {
    let embed = new Discord.RichEmbed()
    .setTitle(`Error`)
    .setColor(process.env.C_RED)
    .setDescription("Invalid user.")
    .setTimestamp()
    return message.channel.send(embed);
  } 
  if(!message.member.hasPermission("MANAGE_MESSAGES")){
    let embed = new Discord.RichEmbed()
    .setTitle(`Error`)
    .setColor(process.env.C_RED)
    .setDescription("You don't have permission to mute people.")
    .setFooter(`Offender: ${message.author.tag}`)
    .setTimestamp()
    return message.channel.send(embed);
  } 
  if(tomute.hasPermission("MANAGE_MESSAGES")){
    let embed = new Discord.RichEmbed()
    .setTitle(`Error`)
    .setColor(process.env.C_RED)
    .setDescription("You can't mute staff members.")
    .setTimestamp()
    return message.channel.send(embed);
  } 
  if (tomute.id === message.author.id){
    let embed = new Discord.RichEmbed()
    .setTitle(`Error`)
    .setColor(process.env.C_RED)
    .setDescription("You can't mute yourself.")
    .setTimestamp()
    return message.channel.send(embed);
  } 
  const muterole = message.guild.roles.find(r => r.name === "Muted");
  if(tomute.roles.has(muterole.id)){
    let embed = new Discord.RichEmbed()
    .setTitle("Error")
    .setTimestamp()
    .setColor(process.env.C_RED)
    .setDescription(`User already muted.`)
    return message.channel.send(embed);
}

  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#000001",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }

  let mutetime = args[1];
  if(!mutetime){
    await tomute.addRole(muterole.id);
    let embed = new Discord.RichEmbed()
    .setTitle(tomute.user.tag + " was muted.")
    .setTimestamp()
    .setColor(process.env.C_BLUE)
    return message.channel.send(embed);
}
  
  await(tomute.addRole(muterole.id));
  let embed = new Discord.RichEmbed()
  .setTitle(tomute.user.tag + " was muted for " + ms(ms(mutetime)) +".")
  .setTimestamp()
  .setColor(process.env.C_BLUE)
  message.channel.send(embed);
  
  setTimeout(function(){
    if(!tomute.roles.has(muterole.id)) return
    tomute.removeRole(muterole.id);
    let embed = new Discord.RichEmbed()
    .setTitle(tomute.user.tag + " is now unmuted.")
    .setTimestamp()
    .setColor(process.env.C_PINK)
    message.channel.send(embed);
  }, ms(mutetime));

  message.delete();

}

module.exports.help = {
  name: "mute"
}