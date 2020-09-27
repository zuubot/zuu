const Discord = require("discord.js");
const ms = require("ms");
import dotenv from 'dotenv';
dotenv.config()

module.exports.run = async (bot, message, args) => {
var jailrole = message.guild.roles.find(r => r.name === "Jailed");
  if(!jailrole){
    try{
        jailrole = await message.guild.createRole({
        name: "Jailed",
        color: "#000001",
        permissions:[]
      })

      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(jailrole, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
        });
      });
      
      let embed = new Discord.RichEmbed()
      .setColor(process.env.C_YELLOW)
      .setTitle(`Error`)
      .setDescription(`Jailed role and channel were not found, so they were made.\nPlease set up permissions and a channel named jail then try again.`)
      .setTimestamp()
      return message.channel.send(embed)
    }catch(e){
      console.log(e.stack);
    }
  }

  let tojail = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tojail) {
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
    .setDescription("You don't have permission to jail people.")
    .setFooter(`Offender: ${message.author.tag}`)
    .setTimestamp()
    return message.channel.send(embed);
  } 
  if(tojail.hasPermission("MANAGE_MESSAGES")){
    let embed = new Discord.RichEmbed()
    .setTitle(`Error`)
    .setColor(process.env.C_RED)
    .setDescription("You can't jail staff members.")
    .setTimestamp()
    return message.channel.send(embed);
  } 
  if (tojail.id === message.author.id){
    let embed = new Discord.RichEmbed()
    .setTitle(`Error`)
    .setColor(process.env.C_RED)
    .setDescription("You can't jail yourself.")
    .setTimestamp()
    return message.channel.send(embed);
  } 

  if(tojail.roles.has(jailrole.id)) {
    let embed = new Discord.RichEmbed()
    .setTitle("Error")
    .setTimestamp()
    .setColor(process.env.C_RED)
    .setDescription(`User already jailed.`)
    return message.channel.send(embed);
}

  let jailtime = args[1];
  if(!jailtime){
    await tojail.addRole(jailrole.id);
    let embed = new Discord.RichEmbed()
    .setTitle(tojail.user.tag + " was jailed.")
    .setTimestamp()
    .setColor(process.env.C_BLUE)
    message.channel.send(embed);
    var jail = message.guild.channels.find(c => c.name === "jail");
    let gp = await jail.send(`<@` + tojail.id + `>`)
    gp.delete()
    let jembed = new Discord.RichEmbed()
    .setColor(process.env.C_RED)
    .addField(`Inmate:`, "<@" + tojail.id + ">")
    .addField(`Sentenced to:`, "Life")
    jail.send(jembed)
}
  
  await(tojail.addRole(jailrole.id));
  let embed = new Discord.RichEmbed()
  .setTitle(tojail.user.tag + " was jailed for " + ms(ms(jailtime)) +".")
  .setTimestamp()
  .setColor(process.env.C_BLUE)
  message.channel.send(embed);
  var jail = message.guild.channels.find(c => c.name === "jail");
  let gp = await jail.send(`<@` + tojail.id + `>`)
  gp.delete()
  let jembed = new Discord.RichEmbed()
  .setColor(process.env.C_RED)
  .addField(`Inmate:`, "<@" + tojail.id + ">")
  .addField(`Sentenced to:`, ms(ms(jailtime)))
  jail.send(jembed)

  
  setTimeout(function(){
    if(!tojail.roles.has(jailrole.id)) return
    tojail.removeRole(jailrole.id);
    let embed = new Discord.RichEmbed()
    .setTitle(tojail.user.tag + " is now unjailed.")
    .setTimestamp()
    .setColor(process.env.C_PINK)
    message.channel.send(embed);
  }, ms(jailtime));

}

module.exports.help = {
  name: "jail"
}