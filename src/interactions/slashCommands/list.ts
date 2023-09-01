import { Client, ChatInputCommandInteraction } from 'discord.js';
import { SlashCommandBuilder, EmbedBuilder } from '@discordjs/builders';

const commandID = 'list';
export default {
	id: commandID,
	type: 'slashCommand',
	disabled: false,
	data: new SlashCommandBuilder()
		.setName(commandID)
		.setDescription('list'),
	async execute(client: Client, interaction: ChatInputCommandInteraction) {
		try {
			const roundList: string[] = [];

			client.Eround.forEach((value, key) => {
				console.log(value, key);
				roundList.push(`\n<#${value.channelId}> 1-${value.max} | Price: ${value.price}`);
			});

			const embed = new EmbedBuilder()
				.setTitle('Round List')
				.setDescription(roundList.join('\n'));
			await interaction.reply({embeds: [embed]});
		} catch (error) {
			console.log(error);
		}
	}
};