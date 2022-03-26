const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const Config = require('../../../../index')

module.exports = class RestartCommand extends BaseCommand {
  constructor() {
    super('restart', 'Owner', []);
  }

  async run(client, message, args) {
    if (message.author.id !== Config.config.bot.ownerid) {
      const NotOwner = new MessageEmbed()
        .setColor('RANDOM')
        .setTimestamp()
        .setTitle('Help')
        .setDescription('You cannot use the following the command: `!restart`. The command is only available for the owner.')
      return message.channel.send({ embeds: [NotOwner]})
    }
    const send = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Restart')
      .setDescription('We are restarting the bot. Please wait while we get everything working.')
      .setTimestamp()
    await message.channel.send({ embeds: [send]})
    process.exit();
  }
}