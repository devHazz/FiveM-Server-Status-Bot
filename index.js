const dotenv = require('dotenv');
dotenv.config();
const { Client, RichEmbed } = require("discord.js")
const client = new Client({ disableEveryone: false });
const SetPresence = require('./modules/presence')
const checkIfExists = require('./modules/checkIfExists')
const Gamedig = require('gamedig')
const Discord = require("discord.js");
let timeInS = 5;
var players = [];

client.on('ready', async () => {
  const maindiscord = client.guilds.find(g => g.id === process.env.MAIN_GUILD);
  const statuschannel = maindiscord.channels.find(c => c.id === process.env.STATUS_CHANNEL);
  statuschannel.send('> Booting up..')
  console.log(`Logged in as: ${client.user.tag}`)

  if(await checkIfExists(process.env.HOST, process.env.PORT))
  {
    setInterval(() => {
      Gamedig.query({
        type: 'fivem',
        host: process.env.HOST,
        port: process.env.PORT 
      }).then(state => {
        state.players.forEach(p => {
            players.push(p.name);
        });
        SetPresence(client, `Over ${state.raw.players}`)
      
        let embed = new RichEmbed()
            .setTitle('__**GravHub**__')
            .addField('**Server Status:**', `Online`, true)
            .addField('**Online Players:**', `**Total:** \`${state.raw.clients}\` / \`${state.raw.sv_maxclients}\``, true)
            .addField('**Current Players:**', `\`\`${players.join(',  ').toString()}\`\``);
      
      
          statuschannel.messages.last().edit(embed);
      
      }).catch(() => {
        let embed = new Discord.RichEmbed()
            .addField('**Server Status:**', `No Players Online!`)
            .setTitle('__**GravHub**__');
      
      
            statuschannel.messages.last().edit(embed);
      
      });
      }, timeInS * 1000);
  }
  else
  {
    console.log("boo");
  }

})

client.login(process.env.TOKEN)
