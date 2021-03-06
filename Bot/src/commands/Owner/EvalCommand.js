const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js')
const Config = require('../../../../index')


module.exports = class EvalCommand extends BaseCommand {
  constructor() {
    super('eval', 'Owner', []);
  }

  async run(client, message, args) {
    if (message.author.id !== Config.config.bot.botClientId) return message.channel.send('ABUSERS NO!');
    const embed = new MessageEmbed()
        .setTitle('Evaluating...')
    const msg = await message.channel.send({ embeds: [embed]});
    try {
        const data = eval(args.join(' ').replace(/```/g, ''));
        const embed = new MessageEmbed()
            .setTitle('Output: ')
            .setDescription(await data)
        await msg.edit({ embeds: [embed]})
        await msg.react('✅')
        await msg.react('❌')
        const filters = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '✅') && (user.id === message.author.id);
        msg.awaitReactions({ filter: filters,  max: 1 })
            .then((collected) => {
                collected.map((emoji) => {
                    switch (emoji._emoji.name) {
                        case '✅':
                            msg.reactions.removeAll();
                            break;
                        case '❌':
                            msg.delete()
                            break;
                    }
                })
            })
    } catch (e) {
        const embed = new MessageEmbed()
            .setTitle('An Error has occured')
        	.setDescription(e.toString());
        console.error(e)
        return await msg.edit({ embeds: [embed]});

    }
  }
}