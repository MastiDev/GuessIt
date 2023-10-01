import {Client, ChatInputCommandInteraction, TextChannel} from 'discord.js';
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
			const channelid = interaction.channel?.id;
			if (!channelid) return interaction.reply('You have to mention a channel!');

			const round = client.Eround.get(channelid);
			if (!round) return  interaction.reply('In this Channel is no Round');

			client.Eround.delete(channelid);

			const embed = new EmbedBuilder()
				.setColor(0xFF0000)
				.setTitle('Round Deleted');
			await interaction.reply({embeds: [embed]});

			const channel = await client.channels.fetch(channelid) as TextChannel;
			if (!channel) return;

			const topic = 'The **Guess it** round has ended.';
			await channel.edit({topic: topic});

		} catch (error) {
			console.log(error);
		}
	},
};