const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config()

module.exports.run = async (bot, message, args) => {
  const help = new Discord.RichEmbed()
  .setColor(process.env.C_BLUE)
  .setTimestamp()
  .addField("\\🦩 Fun", `\`\`\`
-8ball      | Answers yes/no questions.
-say        | Repeats after you.
-coinflip   | Flips a coin for you.
-dog        | Fetches you a picture of a dog.
-cat        | Fetches you a picture of a cat.
\`\`\``)
  .addField("\\📻 last.fm", `\`\`\`
-lf help    | Gives you more information on the last.fm.
-lf set     | Stores your last.fm username.
-lf delete  | Removes your last.fm username.
-lf info    | Shows last.fm account information.
-lf recent  | Shows the last 10 tracks.
-lf tracks  | Shows most played tracks.
-lf artists | Shows most played artists.
-fm         | Shows the current track or latest scrobble.
\`\`\`
`)    
  .addField("\\🔨 Moderation", `\`\`\`
-ban        | Bans a mentioned user.
-kick       | Kicks a mentioned user.
-purge      | Mass-deletes messages.
-mute       | Mute a user for a certain amount of time.
-unmute     | Unmutes a user.
-jail       | Jail's a user.
-unjail     | Un-jails a user.
-warn       | Warn a user.
-warns      | Check a users warns.
-lock       | Locks a channel.
-unlock     | Unlocks a channel.
\`\`\``)
.addField("\\🔧 Utility", `\`\`\`
-avatar     | Sends your or another users avatar.
-botinfo    | Fetches info on the bot.
-userinfo   | Fetches info on a user.
-serverinfo | Fetches info on a server.
\`\`\``)
  .setFooter(`Need more help? Go to zuubot.github.io and join our Discord.`)
message.author.send(help);
message.react("📬")
}

module.exports.help = {
    name: 'help'
  };