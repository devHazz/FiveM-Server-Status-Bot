const dotenv = require('dotenv');
dotenv.config();
const { Client, RichEmbed } = require("discord.js")
const client = new Client({ disableEveryone: false });
const SetPresence = require('./modules/presence')
const Gamedig = require('gamedig')
const Discord = require("discord.js");
let timeInS = 5;
var players = [];

client.on('ready', async () => {
console.log(`Logged in as: ${client.user.tag}`)

setInterval(() => {
Gamedig.query({
  type: 'fivem',
  host: process.env.HOST, // server ip 
  port: process.env.PORT // server port
}).then(state => {

  state.players.forEach(p => {
      players.push(`\`\`${p.name}\`\``)
  });
  SetPresence(client, `Over ${state.raw.players}`)

  var embed = new RichEmbed()
      .setColor("YELLOW")
      .setTitle('__**GravHub**__')
      .addField('**Server Status:**', `Online`, true)
      .addField('**Online Players:**', `**Total:** \`${state.raw.clients}\` / \`${state.raw.sv_maxclients}\``, true)
      .addField('**Current Players:**', `${players.join(',  ').toString()}`);
      //.setFooter(); you can use this to have your server name & icon. For example: .setFooter(`GravHub`, `https://gravhub.pic`)
      const maindiscord = client.guilds.find(g => g.id === process.env.MAIN_GUILD) // put your discord server's id between ''
      const statuschannel = maindiscord.channels.find(c => c.id === process.env.STATUS_CHANNEL) // put the id of the channel that you want the status message in
      statuschannel.send('Booting up..').then(e => {
        e.edit(embed)
      });
}).catch(() => {
  var embed = new Discord.RichEmbed()
      .setColor("YELLOW")
      .addField('**Server Status:**', `No Players Online!`)
      .setTitle('__**GravHub**__');
      //.setFooter(); you can use this to have your server name & icon. For example: .setFooter(`GravHub`, `https://gravhub.pic`)
      const maindiscord = client.guilds.find(g => g.id === '') // put your discord server's id between ''
      const statuschannel = maindiscord.channels.find(c => c.id === '' && c.type == "text"); // put the id of the channel that you want the status message in
      statuschannel.send('Booting up..').then(e => {
        e.edit(embed)
      });
});
}, timeInS * 1000) // the status bot will update every 5 seconds. If you want it to update every 10 seconds it would be 10000
})

client.login(process.env.TOKEN)
