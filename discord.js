const { GatewayIntentBits, ActivityType, PermissionFlagsBits, ButtonStyle } = require('discord.js');
const Discord = require('discord.js');
const { logInfo } = require('./utils/logging');
const bot = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [
    'CHANNEL',
  ],
  restRequestTimeout: 30_000,
});

const THEME = '#6200EE';
const LIGHT_BLUE = '#0099ff';
const RED = '#e33232';
const GREEN = '#32e34f';
const LOGO_URL = 'https://i.imgur.com/RwluSq8.png';
const WEBSITE = 'https://algodemon.com/';
const FOOTER = 'algodemon.com';
const PREFIX = '.';

const recentlyBanned = [];
const joinLeaveMessages = process.env.NODE_ENV !== 'DEVELOPMENT';


bot.on('ready', () => {
  bot.user.setPresence({
    activities: [{
      name: FOOTER,
      type: ActivityType.Watching,
    }],
  });

  logInfo('Discord bot ready');
});

bot.on('messageCreate', (message) => {
  if (message.channel.type == 'dm') return;
  if (message.author.bot || !message.member) return;

  if (message.content === `${PREFIX}help`) {
    const embed = new Discord.EmbedBuilder()
      .setColor(THEME)
      .setAuthor({ name: 'algodemon.com', iconURL: LOGO_URL, url: WEBSITE })
      .setDescription('Please see our getting-started channels for more information.')
      .addFields(
        { name: 'Links', value:
        `[Website](${WEBSITE})
        [TikTok](https://tiktok.com/@algodemon)
        [TradingView](https://www.tradingview.com/)
        [Webull](https://a.webull.com/FvO2iUzayC2YqMScQh)

        **Discord:** https://discord.gg/J4ENkbshTE` }
      )
      .setTimestamp()
      .setFooter({ text: FOOTER, iconURL: LOGO_URL });

    return message.channel.send({ embeds: [embed] });
  }

  // anti advertising
  if (message.member.permissions.has(PermissionFlagsBits.ManageMessages)) return;
  if ((message.content.includes('I\'ll help the first') || message.content.includes('been lurking around this server for a while')) && message.content.includes('discord.gg/')) {
    message.member.ban({ reason: 'Advertising' });

    const embed = new Discord.EmbedBuilder()
      .setColor(RED)
      .setDescription(`${message.author} (${message.author.tag}) was banned for detected advertising.`)
      .addFields({ name: 'Message', value: message.content })
      .setTimestamp()
      .setFooter({ text: FOOTER, iconURL: LOGO_URL });
    
    return message.guild.channels.cache.find(c => c.name === 'logs').send({ content: '@everyone', embeds: [embed] });
  } else if (message.content.includes('discord.gg/') || message.content.includes('bit.ly/')) {
    message.delete();
    const embed = new Discord.EmbedBuilder()
      .setColor(RED)
      .setDescription(`Message sent by ${message.author} (${message.author.tag}) deleted for detected advertising.`)
      .addFields({ name:'Message', value: message.content })
      .setTimestamp()
      .setFooter({ text: FOOTER, iconURL: LOGO_URL });

    const row = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('ban:' + message.author.id)
          .setLabel('Ban User')
          .setStyle(ButtonStyle.Danger)
      );

    return message.guild.channels.cache.find(c => c.name === 'logs').send({ content: '@everyone', embeds: [embed], components: [row] });
  }
});

bot.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
  if (!interaction.customId.startsWith('ban:')) return;

  const userId = interaction.customId.split(':')[1];
  const member = interaction.guild.members.cache.get(userId);
  if (!member) return;

  member.ban({ reason: 'Advertising' });

  const embed = new Discord.EmbedBuilder()
    .setColor(GREEN)
    .setDescription(`${member} (${member.user.tag}) was banned for advertising by ${interaction.user}.`)
    .setTimestamp()
    .setFooter({ text: FOOTER, iconURL: LOGO_URL });

  interaction.update({ content: ':white_check_mark: User Banned', embeds: [embed], components: [] });
});

bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(c => c.name === 'welcome');
  if (!channel || !joinLeaveMessages) return;

  const rules = member.guild.channels.cache.find(ch => ch.name === 'rules');
  const embed = new Discord.EmbedBuilder()
    .setTitle('Welcome')
    .setColor(THEME)
    .setThumbnail(member.user.avatarURL())
    .setDescription(`Welcome to **AlgoDemon**, **${member.user.tag}**!\nTo get started, please read and accept the rules in ${rules ? rules : '#rules'}. From there you will be guided on how to get started on your trading journey.\n**${WEBSITE}**`)
    .setFooter({ text: `${FOOTER} | Member #${member.guild.memberCount}` })
    .setTimestamp();

  channel.send({ content: `${member}`, embeds: [embed] });
});

bot.on('guildMemberRemove', member => {
  const channel = member.guild.channels.cache.find(c => c.name === 'welcome');
  if (!channel || !joinLeaveMessages || recentlyBanned.includes(member.id)) return;

  const embed = new Discord.EmbedBuilder()
    .setTitle('Goodbye')
    .setColor(RED)
    .setThumbnail(member.user.avatarURL())
    .setDescription(`**${member.user.tag}** has left the server.`)
    .setFooter({ text: FOOTER })
    .setTimestamp();

  channel.send({ content: `${member}`, embeds: [embed] });
});

bot.on('guildBanAdd', (ban) => {
  recentlyBanned.push(ban.user.id);
});

bot.on('raw', async (event) => {
  if (event.t !== 'MESSAGE_REACTION_ADD') return;
  const channel = bot.channels.cache.get(event.d.channel_id);
  if (!channel || channel.type === 'dm') return;

  const message = await channel.messages.fetch(event.d.message_id);
  if (!message) return;

  const user = bot.users.cache.get(event.d.user_id);
  if (!user) return;

  const emoji = event.d.emoji.id ? `${event.d.emoji.name}:${event.d.emoji.id}` : event.d.emoji.name;
  const reaction = message.reactions.cache.get(emoji);
  if (!reaction) return;

  const member = message.guild.members.cache.get(user.id);
  if (!member || member.user.bot) return;

  if (channel.name === 'rules') {
    member.roles.add(member.guild.roles.cache.find(role => role.name === 'Member').id);

    // DM User
    const gettingStarted = member.guild.channels.cache.find(ch => ch.name.includes('getting-started'));
    const embed = new Discord.EmbedBuilder()
      .setTitle('Welcome')
      .setColor(THEME)
      .setThumbnail(LOGO_URL)
      .setDescription(`Welcome to **AlgoDemon**, ${member}!\nThank you for accepting our terms and conditions. To get started on your trading journey, please see the ${gettingStarted ? gettingStarted : '#getting-started'} channel. All of the information you need to start trading from 0 knowledge is there.\n\n**${WEBSITE}**`)
      .setFooter({ text: FOOTER })
      .setTimestamp();

      try {
        member.user.send({ embeds: [embed] });
      } catch (ignored) {}
  }
});

// process.on('unhandledRejection', (result, error) => {
// 	console.error(error);
// });


bot.login(process.env.TOKEN);

module.exports = {
  bot,
  getChannel: () => bot.channels.cache.get('1043021188219281538'),
};
