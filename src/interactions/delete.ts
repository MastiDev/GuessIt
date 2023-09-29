import { Client, ChatInputCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

const commandID = 'delete';
export default {
	id: commandID,
	type: 'slashCommand',
	disabled: false,
	data: new SlashCommandBuilder()
		.setName(commandID)
		.addChannelOption(option => option.setName('channel').setDescription('Channel').setRequired(true))
		.setDescription('delete'),
	async execute(client: Client, interaction: ChatInputCommandInteraction) {
		try {
			const channel = interaction.options.getChannel('channel');
			if (!channel) return interaction.reply('You have to mention a channel!');

			const round = client.Eround.get(channel.id);
			if (!round) return  interaction.reply('In this Channel is no Round');

			client.Eround.delete(channel.id);

			await interaction.reply('The round has been deleted!');
		} catch (error) {
			console.log(error);
		}
	},
};