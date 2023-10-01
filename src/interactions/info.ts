import { Client, ChatInputCommandInteraction } from 'discord.js';
import { SlashCommandBuilder, EmbedBuilder } from '@discordjs/builders';

const commandID = 'info';
export default {
	id: commandID,
	type: 'slashCommand',
	disabled: false,
	data: new SlashCommandBuilder()
		.setName(commandID)
		.setDescription('Displays information about the ongoing round'),
	async execute(client: Client, interaction: ChatInputCommandInteraction) {
		try {
			const channel = interaction.channel?.id;
			if (!channel) return interaction.reply('You have to mention a channel!');

			const round = client.Eround.get(channel);
			if (!round) return  interaction.reply('In this Channel is no Round');

			const embed = new EmbedBuilder()
				.setColor(0xF1FF00)
				.setTitle('Round Info')
				.setDescription(round.hints)
				.addFields(
					{ name: 'Price', value: `**${round.price}**`, inline: true },
					{ name: 'Range', value: `**1-${round.max}**`, inline: true },
				);
			await interaction.reply({embeds: [embed]});
		} catch (error) {
			console.log(error);
		}
	}
};