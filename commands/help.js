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
-gay        | Check how gay someone is.
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
-warn       | Warn a user.
-warns      | Check a users warns.
\`\`\``)
.addField("\\🔧 Utility", `\`\`\`
-avatar     | Sends your or another users avatar.
\`\`\``)
  .setFooter(`More commands coming soon. Bot made by zuoa#1111.`)
message.author.send(help);
message.react("📬")
}

module.exports.help = {
    name: 'help'
  };