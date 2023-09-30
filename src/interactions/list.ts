import { Client, ChatInputCommandInteraction } from 'discord.js';
import { SlashCommandBuilder, EmbedBuilder } from '@discordjs/builders';

const commandID = 'list';
export default {
	id: commandID,
	type: 'slashCommand',
	disabled: false,
	data: new SlashCommandBuilder()
		.setName(commandID)
		.setDescription('Displays all ongoing rounds'),
	async execute(client: Client, interaction: ChatInputCommandInteraction) {
		try {
			const roundList: string[] = [];

			client.Eround.forEach((value) => {
				roundList.push(`\n<#${value.channelId}> 1-${value.max} | Price: ${value.price}`);
			});
			if (roundList.length === 0) roundList.push('NADA');

			const embed = new EmbedBuilder()
				.setColor(0x068ADD)
				.setTitle('Round List')
				.setDescription(roundList.join('\n'));
			await interaction.reply({embeds: [embed]});
		} catch (error) {
			console.log(error);
		}
	}
};