import { Client, ChatInputCommandInteraction } from 'discord.js';
import { SlashCommandBuilder, EmbedBuilder } from '@discordjs/builders';

const commandID = 'info';
export default {
	id: commandID,
	type: 'slashCommand',
	disabled: false,
	data: new SlashCommandBuilder()
		.setName(commandID)
		.setDescription('info')
		.addChannelOption(option => option.setName('channel').setDescription('Channel').setRequired(true)),
	async execute(client: Client, interaction: ChatInputCommandInteraction) {
		try {
			const channel = interaction.options.getChannel('channel');
			if (!channel) return interaction.reply('You have to mention a channel!');

			const round = client.Eround.get(channel.id);
			if (!round) return  interaction.reply('In this Channel is no Round');

			const embed = new EmbedBuilder()
				.setTitle('Round Info')
				.addFields(
					{ name: 'Channel', value: `[**Click here**](https://discord.com/channels/${interaction.guildId}/${round.channelId})`, inline: true },
					{ name: 'Price', value: `**${round.price}**`, inline: true },
					{ name: 'Range', value: `**1-${round.max}**`, inline: true },
				);
			await interaction.reply({embeds: [embed]});
		} catch (error) {
			console.log(error);
		}
	}
};