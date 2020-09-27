import Discord from 'discord.js';
import axios from 'axios';
import db from '../db';
import {
  fetchTotalScrobbles,
  fetchRecentTrack,
  fetchUserInfo
} from '../api/lastfm';
import dotenv from 'dotenv'
dotenv.config()

module.exports.run = async (bot, message, args) => {
  let [fmUser] = args;
  if (!fmUser) {
    const dbUser = db
      .get('users')
      .find({ userID: message.author.id })
      .value();
    if (!dbUser) {
      return message.channel.send(
        `Username not found. Please use z.lf set to set your last.fm username.`
      );
    }
    fmUser = dbUser.lastFM;
  }

  axios
    .all([
      fetchTotalScrobbles(fmUser),
      fetchRecentTrack(fmUser, message),
      fetchUserInfo(fmUser)
    ])
    .then(
      axios.spread(async(totalScrobbles, trackInfo, userInfo) => {
        if (trackInfo.error) return message.channel.send(trackInfo.error);
        const {
          track,
          artist,
          album,
          albumCover,
          songURL,
          artistURL,
          userplaycount
        } = trackInfo;

        const { image } = userInfo;
        const lastFMAvatar = image[2]['#text'];

        const embed = new Discord.RichEmbed()
          .setThumbnail(albumCover)
          .setAuthor(message.author.tag , message.author.avatarURL)
          .addField(
            'Track:',
             track
          )
          .addField('Album:', album)
          .addField('Artist:', artist)
          .setFooter(
            `Playcount: ${userplaycount.toLocaleString()} | Total Scrobbles: ${totalScrobbles.toLocaleString() ||
              
              0}`
          )
          .setColor(process.env.C_BLUE);
         const sentMessage = await message.channel.send(embed);                 
          sentMessage.react(`758731907977576499`)
          sentMessage.react(`758731908053598268`)  
      })
    )
    .catch(err => console.log(err));
};

module.exports.help = {
  name: ('fm')
};