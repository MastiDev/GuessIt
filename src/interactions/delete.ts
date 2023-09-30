import { Client, ChatInputCommandInteraction } from 'discord.js';
import {EmbedBuilder, SlashCommandBuilder} from '@discordjs/builders';

const commandID = 'delete';
export default {
	id: commandID,
	type: 'slashCommand',
	disabled: false,
	data: new SlashCommandBuilder()
		.setName(commandID)
		.setDescription('Deletes the current round in the channel where it is executed'),
	async execute(client: Client, interaction: ChatInputCommandInteraction) {
		try {
			const channel = interaction.channel?.id;
			if (!channel) return interaction.reply('You have to mention a channel!');

			const round = client.Eround.get(channel);
			if (!round) return  interaction.reply('In this Channel is no Round');

			client.Eround.delete(channel);

			const embed = new EmbedBuilder()
				.setColor(0xFF0000)
				.setTitle('Round Deleted');

			await interaction.reply({embeds: [embed]});
		} catch (error) {
			console.log(error);
		}
	},
};