import Discord from 'discord.js';
import {
  fetchUserInfo,
  fetch10RecentTracks,
  fetchUsersTopTracks,
  fetchUsersTopArtists,
  fetchUsersTopAlbums,
  fetchTotalScrobbles,
  fetchRecentTrack,
} from '../api/lastfm';
import db from '../db';
import dotenv from 'dotenv';
import axios from 'axios';

module.exports.run = async (bot, message, args) => {
  let fmUser = args[1];
  let period = args[2];
  const dbUser = db
    .get('users')
    .find({ userID: message.author.id })
    .value();
  if (dbUser && args[0] !== 'set') {
    fmUser = dbUser.lastFM;
    period = args[1];
  }
  if (dbUser && args[0] !== 'chart') {
    fmUser = dbUser.lastFM;
  }
  if (args.length === 3) {
    fmUser = args[1];
    period = args[2];
  }

  switch (args[0]) {
    
    case 'help': {
      message.react(`📬`)
      return message.author.send(
        new Discord.RichEmbed()
        .setTitle(`last.fm Commands`)
          .setDescription(`\`\`\`
${process.env.PREFIX}lf set     | Sets your last.fm username.
Usage: ${process.env.PREFIX}lf set zuoa

${process.env.PREFIX}lf delete  | Removes your last.fm username.
Usage: ${process.env.PREFIX}lf delete

${process.env.PREFIX}lf info    | Shows Last.FM account information
Usage: ${process.env.PREFIX}lf info

${process.env.PREFIX}fm         | Shows currently playing song or latest scrobble.
Usage: ${process.env.PREFIX}fm

${process.env.PREFIX}lf recent  | Shows 10 most recent tracks played.
Usage: ${process.env.PREFIX}lf recent

${process.env.PREFIX}lf tracks  | Shows most played tracks.
Usage: ${process.env.PREFIX}lf tracks zuoa month

${process.env.PREFIX}lf artists | Shows most listened artists
Usage: ${process.env.PREFIX}lf artists zuoa week

${process.env.PREFIX}lf albums  | Shows most played albums
Usage: ${process.env.PREFIX}lf albums zuoa 90

${process.env.PREFIX}lf chart  | Shows most played albums
Usage: ${process.env.PREFIX}lf chart week 3x3
\`\`\``)
          .addField(
            'Command Paramaters',
            '`week`, `month`, `90`, `180`, `year`, `all` (Default: all')
          )
          .setColor(process.env.C_BLUE)
    }

    case 'set': {
      if(!args.join(" ").slice(3)){
        let embed = new Discord.RichEmbed()
        .setColor(process.env.C_RED)
        .setTitle("Error")
        .setDescription("Please provide a last.fm username.")
        .setTimestamp()
        return message.channel.send(embed);
      }
      const existingUser = db
        .get('users')
        .find({ userID: message.author.id })
        .value();

      if (existingUser) {
        if (existingUser.lastFM === fmUser) {
          return message.channel.send(
            `Your last.fm profile is already set to \`${fmUser}\`.`
          );
        }
        existingUser.lastFM = fmUser;
        db.get('users')
          .find({ userID: message.author.id })
          .assign({ lastFM: fmUser })
          .write();
        return message.channel.send(
          `last.fm username updated to \`${fmUser}\`.`
        );
      }
      db.get('users')
        .push({ userID: message.author.id, lastFM: fmUser })
        .write();
      return message.channel.send(`last.fm username set to \`${fmUser}\`.`);
    }

    case 'info': {
      const existingUser = db
        .get('users')
        .find({ userID: message.author.id })
        .value();

      if (!existingUser) {
        let embed = new Discord.RichEmbed()
        .setTitle(`Error`)
        .setColor(process.env.C_RED)
        .setDescription(`Username not found. Please use \`z.lf set\` to set your last.fm username.`)
        .setTimestamp()
        return message.channel.send(embed)
      }
      const {
        totalScrobbles,
        name,
        profileURL,
        country,
        image,
        unixRegistration
      } = await fetchUserInfo(fmUser);
      const lastFMAvatar = image[2]['#text'];

      return message.channel.send(
        new Discord.RichEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setThumbnail(lastFMAvatar)
          .addField(`Account name:`, name)
          .addField('Total Scrobbles:', totalScrobbles.toLocaleString())
          .addField('Country:', country)
          .addField(
            'Registration Date:',
            new Date(unixRegistration * 1000).toLocaleString()
          )
          .setColor(process.env.C_BLUE)
      );
    }

    case 'delete':
    case 'reset': {
      const existingUser = db
        .get('users')
        .find({ userID: message.author.id })
        .value();

      if (existingUser) {
        db.get('users')
          .remove({ userID: message.author.id })
          .write();
        return message.channel.send(
          `\`${existingUser.lastFM}\` was deleted from the database.`
        );
      }
      return message.channel.send(
        `Username not found.`
      );
    }

    case 'recent': {
      const recentTracks = await fetch10RecentTracks(fmUser, message, args);
      return message.channel.send(
        new Discord.RichEmbed()
          .setAuthor(message.author.tag, recentTracks.iconURL)
          .setTitle(`Recent Scrobbles`)
          .setDescription(recentTracks.description)
          .setColor(process.env.C_BLUE)
          .setFooter(`last.fm username: ${recentTracks.author}`)
          .setTimestamp()
      );
    }
    case 'ttr':
    case 'tracks': {
      const topTracks = await fetchUsersTopTracks(
        fmUser,
        period,
        message,
        args
      );
      if (topTracks.description.length === 0) {
        return message.channel.send(
          `${message.author.tag} hasn't listened to anything lately.`
        );
      }
      return message.channel.send(
        new Discord.RichEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setDescription(topTracks.description)
          .setColor(process.env.C_BLUE)
          .setFooter(`last.fm username: ` + topTracks.author)
          .setTimestamp()
      );
    }
    case "tar":
    case 'artists': {
      const topArtists = await fetchUsersTopArtists(
        fmUser,
        period,
        message,
        args
      );
      if (topArtists.description.length === 0) {
        return message.channel.send(
          `${message.author.tag} hasn't listened to anything lately.`
        );
      }
      return message.channel.send(
        new Discord.RichEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setTitle(`Top Artists`)
          .setDescription(topArtists.description)
          .setColor(process.env.C_BLUE)
          .setFooter(`last.fm username: ${topArtists.author}`)
          .setTimestamp()
      )
    } 


    case "tal":
    case 'albums': {
      const topAlbums = await fetchUsersTopAlbums(
        fmUser,
        period,
        message,
        args
      );
      if (topAlbums.description.length === 0) {
        return message.channel.send(
          `${message.author.tag} hasn't listened to anything lately.`
        );
      }
      return message.channel.send(
        new Discord.RichEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setTitle(`Top Albums`)
          .setDescription(topAlbums.description)
          .setColor(process.env.C_BLUE)
          .setFooter(`last.fm username: ${topAlbums.author}`)
          .setTimestamp()
      );
    }
    
    case 'chart': {
      let dbUser = db
      .get('users')
      .find({ userID: message.author.id })
      .value();
    if (!dbUser) {
      let embed = new Discord.RichEmbed()
      .setTitle(`Error`)
      .setColor(process.env.C_RED)
      .setDescription(`Username not found. Please use \`z.lf set\` to set your last.fm username.`)
      .setTimestamp()
      return message.channel.send(embed)
    }
      let fmUser = dbUser.lastFM;
      let size = args[2]
      let time = args[1]
      let link = `https://www.tapmusic.net/collage.php?user=${fmUser}&type=${time}&size=${size}&caption=true`

    if (time == 'week') {
      time = "7day"
    }
    else if(time == 'month') {
      time = "month"
    }
    else if(time == '90') {
      time = "3months"
    }
    else if(time == '180') {
      time = "6months"
    }
    else if(time == 'year') {
      time = "12months"
    }
    else if(time == 'all') {
      time = "overall"
    } else {
    let embed = new Discord.RichEmbed()
    .setTitle("Error")
    .setDescription(`Invalid time.\nExample: \`z.lf chart week/month/3months/6months/12months/all 2x2\``)
    .setColor(process.env.C_RED)
    .setTimestamp()
    return message.channel.send(embed)
    }

      if(size == '3x3') {
        size = "3x3"
    }
      else if(size == '4x4') {
        size = "4x4"
    }
      else if(size == '5x5') {
        size = "5x5"
    } else {
      let embed = new Discord.RichEmbed()
      .setTitle("Error")
      .setDescription(`Invalid size.\nExample: \`z.lf chart week 3x3/4x4/5x5\``)
      .setColor(process.env.C_RED)
      .setTimestamp()
      return message.channel.send(embed)
    }

        let embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle(`Chart`)
        .setImage(link)
        .setTimestamp()
        .setColor(process.env.C_BLUE)
        .setFooter(`last.fm User: ` + fmUser)
        return message.channel.send(embed)
      } 
        

    default: {
      return message.channel.send(
        `Invalid command. Use \`${process.env.PREFIX}lf help\` to see all commands.`
      );
    }
  }
};

module.exports.help = {
  name: ('lf')
};
