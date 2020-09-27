const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config()

module.exports.run = async (bot, message, args) => {
  const help = new Discord.RichEmbed()
  .setColor(process.env.C_BLUE)
  .setTimestamp()
  .addField("\\🦩 Fun", `\`\`\`
z.8ball      | Answers yes/no questions.
z.say        | Repeats after you.
z.coinflip   | Flips a coin for you.
z.dog        | Fetches you a picture of a dog.
z.cat        | Fetches you a picture of a cat.
\`\`\``)
  .addField("\\📻 last.fm", `\`\`\`
z.lf help    | Gives you more information on the last.fm.
z.lf set     | Stores your last.fm username.
z.lf delete  | Removes your last.fm username.
z.lf info    | Shows last.fm account information.
z.lf recent  | Shows the last 10 tracks.
z.lf tracks  | Shows most played tracks.
z.lf artists | Shows most played artists.
z.fm         | Shows the current track or latest scrobble.
\`\`\`
`)    
  .addField("\\🔨 Moderation", `\`\`\`
z.ban        | Bans a mentioned user.
z.kick       | Kicks a mentioned user.
z.purge      | Mass-deletes messages.
z.mute       | Mute a user for a certain amount of time.
z.unmute     | Unmutes a user.
z.jail       | Jail's a user.
z.unjail     | Un-jails a user.
z.warn       | Warn a user.
z.warns      | Check a users warns.
z.lock       | Locks a channel.
z.unlock     | Unlocks a channel.
\`\`\``)
.addField("\\🔧 Utility", `\`\`\`
z.avatar     | Sends your or another users avatar.
z.botinfo    | Fetches info on the bot.
z.userinfo   | Fetches info on a user.
z.serverinfo | Fetches info on a server.
\`\`\``)
  .setFooter(`Need more help? Go to zuubot.github.io and join our Discord.`)
message.author.send(help);
message.react("📬")
}

module.exports.help = {
    name: 'help'
  };