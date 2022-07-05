const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const { config } = require('../../../index')

module.exports.data = new SlashCommandBuilder()
    .setName('servers')
    .setDescription('servers Command')


module.exports.run = (client, interaction) => {

    if (interaction.user.id !== config.bot.ownerid) {
        const NotOwner = new MessageEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle('Help')
            .setDescription('You cannot use the following the command: `!servers`. The command is only available for the owner.')
        return interaction.reply(NotOwner)
    }
    client.guilds.cache.forEach(guild => {
        
        interaction.reply('Server')
        interaction.channel.send(`${guild.name} | ${guild.id}`)
    })

}