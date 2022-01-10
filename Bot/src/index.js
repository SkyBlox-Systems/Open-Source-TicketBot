const { registerCommands, registerEvents } = require('./utils/registry');
const Config = require('../../index');
const { MessageEmbed } = require('discord.js');
const DatabaseMongo = require('./mongo');
const MainDatabase = require('./schemas/TicketData')
const getprefix = require('../src/utils/getprefix')

const Discord = require("discord.js");

const client = new Discord.Client();

if (Config.config.bot.token === '') {
 return console.log('[SkyBlox Systems] - No Bot token is provided. mainmodule.config.bot.token === "tokenhere"')
}

if (Config.config.bot.prefix === '') {
  return console.log('[SkyBlox Systems] - No prefix is provided.  mainmodule.config.bot.prefix === "tokenhere"')
}

(async () => {
  client.commands = new Map();
  client.events = new Map();
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  client.prefix = Config.config.bot.prefix
  await client.login(Config.config.bot.token);
  require('./dashboard/server')
  
  DatabaseMongo.init()
})();


client.on("ready",  guild => {
})






//client.on('guildDelete', async (guild) => {
// prefixSchema.findOne({ Guild: guild.id }, async (err, data) => {
// if (err) throw err;
// if (data) {
//  prefixSchema.findOneAndDelete({ Guild: guild.id }).then(console.log('deleted data.'))
// }
// })
// })


client.on('guildCreate', guild => {
  let defaultChannel = "";
  guild.channels.cache.forEach((channel) => {
    if (channel.type == "text" && defaultChannel == "") {
      if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channel;

      }
    }

  })


  const welcome = new MessageEmbed()
    .setTitle('Setup')
    .setDescription('Thank you for adding Ticket bot to your server. To setup the ticket system, please run `!setup` in any of your channels. The bot is on shard #0. Any issues with setting up the bot, please head to our support page: https://ticketbots.tk/discord or https://docs.ticketbots.tk')
    .setImage('https://cdn.discordapp.com/attachments/787688783743025152/799263407190310932/Untitled.jpg')
    .setColor('#f6f7f8')


  defaultChannel.send(welcome)
})

client.on('guildDelete', guild => {
  MainDatabase.findOneAndDelete({ ServerID: guild.id }, async (err01, data01) => {
    if (err01) throw err01;
    if (data01) {
      data01.save()
      console.log(`Removed ${guild.id} from the database.`)
    }
  })
})


