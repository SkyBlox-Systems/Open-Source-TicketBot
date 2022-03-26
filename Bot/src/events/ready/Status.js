const { Shard } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');
const { BotVersions } = require('../../../slappey.json')
const config = require('../../../../index')


module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    const activities = [
		`Version ${BotVersions}`,
		`Bot is owned by SkyBlox Systems`
		];

		let i = 0;
		setInterval(() => client.user.setActivity(`${config.config.bot.prefix}setup | ${activities[i++ % activities.length]}`, { type: 'WATCHING' }), 15000);
	}
}