const BaseCommand = require('../../utils/structures/BaseCommand');
const {MessageEmbed} = require('discord.js');
const Config = require('../../../../index')

module.exports = class ServersCommand extends BaseCommand {
  constructor() {
    super('servers', 'Owner', []);
  }

 async run(client, message, args) {
  if (message.author.id !== Config.config.bot.botClientId) {
    const NotOwner = new MessageEmbed()
      .setColor('RANDOM')
      .setTimestamp()
      .setTitle('Help')
      .setDescription('You cannot use the following the command: `!servers`. The command is only available for the owner.')
    return message.channel.send(NotOwner)
  }
  client.guilds.cache.forEach(guild => {

    message.channel.send(`${guild.name} | ${guild.id}`)
  })
  }
}