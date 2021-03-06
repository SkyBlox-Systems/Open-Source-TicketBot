
const { Client, Intents, Interaction } = require('discord.js');
const { registerCommands, registerEvents, registerSlashCommands } = require('./utils/registry');
const config = require('../slappey.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING, Intents.FLAGS.GUILD_SCHEDULED_EVENTS], partials: ['CHANNEL'] });
const DataBaseMongo = require('./mongo');
require('./slash-register')();
let commands = require('./slash-register').commands;
console.log(commands);
const { MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
const { MessageCollector, Collector } = require('discord.js');
const Config = require('../../index')


const db = require('./schemas/commands')
const MainDatabase = require('./schemas/TicketData')
const blacklist = require('./schemas/Blacklist-schema');
const TicketClaimss = require('./schemas/ticketclaim');






(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = Config.config.bot.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(Config.config.bot.token);
  DataBaseMongo.init();
  require('./dashboard/server')
})();



client.on('ready', () => {
  let commands = client.application.commands;
})




client.on('guildCreate', guild => {
  const defaultChannel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has(Permissions.FLAGS.SEND_MESSAGES))


  const welcome = new MessageEmbed()
    .setTitle('Setup')
    .setDescription('Thank you for adding Ticket bot to your server. To setup the ticket system, please run `!setup` in any of your channels. The bot is on shard #0. Any issues with setting up the bot, please head to our support page: https://ticketbots.tk/discord or https://docs.ticketbots.tk')
    .setImage('https://cdn.discordapp.com/attachments/787688783743025152/799263407190310932/Untitled.jpg')
    .setColor('#f6f7f8')


  defaultChannel.send({ embeds: [welcome] })

})



client.on('guildDelete', guild => {
  MainDatabase.findOneAndDelete({ ServerID: guild.id }, async (err01, data01) => {
    if (err01) throw err01;
    if (data01) {
      console.log(`Removed ${guild.id} from the database.`)
    }
  })
})

client.on('interactionCreate', interaction => {
  if (!interaction.isCommand) return;
  let name = interaction.commandName;
  let options = interaction.options;

  let commandMethod = commands.get(name);
  if (commandMethod) {

    blacklist.findOne({ UserID: interaction.user.id }, async (err, data) => {
      const check = await db.findOne({ Guild: interaction.guildId })
      const versionCheck = await MainDatabase.findOne({ ServerID: interaction.guildId })
      if (err) throw err;
      if (!data) {
        if (name === 'setup') {
          commandMethod(client, interaction)
        } else {
          if (name === 'upgrade') {
            commandMethod(client, interaction)
          } else {
            if (versionCheck === null) {
              const notdata = new MessageEmbed()
              .setTitle('No data')
              .setDescription('It seems like there is no server settings stored within the database. Please run `/setup`.')

              interaction.reply({ embeds: [notdata]})

            } else {
              if (versionCheck.BotVersion !== config.BotVersions) {
                const UpdateBot = new MessageEmbed()
                  .setTitle('Update bot')
                  .setDescription(`You are currently running v${versionCheck.BotVersion} of the bot. Please update it to v${config.BotVersions}. Run the command /upgrade to update the bot.`)
                await interaction.reply({ embeds: [UpdateBot] })
              } else {
                if (check) {
                  const DisabledCommand = new MessageEmbed()
                    .setTitle('Disabled')
                    .setDescription(`The following command **/${interaction.commandName}** has been disabled in the server by an administrator`)
                    .setColor('#f6f7f8')
                  if (check.Cmds.includes(interaction.commandName)) return interaction.reply({ embeds: [DisabledCommand] })
                  commandMethod(client, interaction)
                } else {
                  commandMethod(client, interaction)
                }
              }

            }
          }
        }
      } else {
        const BlacklistedFromBot = new MessageEmbed()
          .setTitle('Blacklisted!')
          .setDescription('You have been blacklisted from using Ticket Bot!')
          .addField('Reason', `${data.Reason}`)
          .addField('Time', `${data.Time} UTC`)
          .addField('Admin', `${data.Admin}`)
        interaction.reply({ embeds: [BlacklistedFromBot] })
      }
    })
  }

  if (!commandMethod) return;
})

client.on("messageCreate", msg => {
  if (msg.partial) {
    // Never triggers
    console.log(`Received partial message- ${msg.id}`);
    return;
  }

  // console.log(msg.content);
  // console.log(msg.author.id);

  TicketClaimss.findOne({ TicketIDs: msg.content }, async (err, data) => {
    if (err) throw err;
    if (data) {
      if (data.id === msg.author.id) {
        if (data.Locked === 'Yes') {
          msg.reply('Your ticket is locked at the moment.')
        } else {
          if (data.Locked === 'No') {
            if (data.ClaimUserID === '') {
              msg.reply('Your ticket has not been claimed by anyone.')
            } else {
              msg.reply('Please type out on what you want to send')

              const Filter40 = (m31) => m31.author.id == msg.author.id
              const Collector40 = new MessageCollector(msg.channel, { filter: Filter40, max: 1 });

              Collector40.on('collect', m32 => {
                msg.channel.send('Message sent!')
              })

              Collector40.on('end', m33 => {
                const senddmmessage = new MessageEmbed()
                  .setTitle(`New reply from ${msg.author.tag}`)
                  .setDescription('Please use the command `/ticketreply` to reply to this message.')
                  .addField('Ticket reply:', `${m33.first().content}`, true)
                  .setTimestamp()
                  .setFooter({ text: `user id: ${msg.author.id}`});

                client.channels.cache.get(data.ChannelID).send({ embeds: [senddmmessage] })
              })

            }

          }
        }

      } else {
        if (data.AddedUser === msg.author.id) {
          //   msg.reply('Please type out on what you want to send')

          // const Filter40 = (m31) => m31.author.id == msg.author.id
          // const Collector40 = new MessageCollector(msg.channel, { filter: Filter40, max: 1 });

          // Collector40.on('collect', m32 => {
          //   msg.channel.send('Message sent!')
          // })

          // Collector40.on('end', m33 => {
          //   const senddmmessage = new MessageEmbed()
          //   .setTitle(`New reply from ${msg.author.id}`)
          //   .addField('Ticket reply:', `${m33.first().content}`, true)

          //   client.channels.cache.get(data.ChannelID).send({ embeds: [senddmmessage]})
          // })
        } else {
          msg.reply('You are not added to this ticket or not the owner of this ticket.')
        }
      }
    }
  })

});