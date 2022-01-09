const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js')
const ClaimTicket = require('../../schemas/ticketclaim')
const MainDatabase = require('../../schemas/TicketData')
const discord = require('discord.js'); //Define the discord.js module
const client = new discord.Client(); //Creating discord.js client (constructor)





module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'testing', []);
  }

  async run(client, message, args) {
    message.channel.send('bot own by richard1234YT https://github.com/orgs/SkyBlox-Systems/people/richard1234YT https://github.com/SkyBlox-Systems')
  }
}
