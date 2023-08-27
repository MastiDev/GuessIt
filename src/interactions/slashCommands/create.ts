import { Client, ChatInputCommandInteraction, TextBasedChannel, Message } from 'discord.js';
import { SlashCommandBuilder, EmbedBuilder } from '@discordjs/builders';

const commandID = 'create';
export default {
	id: commandID,
	type: 'slashCommand',
	disabled: false,
	data: new SlashCommandBuilder()
		.setName(commandID)
		.setDescription('create'),
	async execute(client: Client, interaction: ChatInputCommandInteraction) {
		try {
			if (!interaction.channel) return;

			const createEmbed = new EmbedBuilder({
				title: 'GuessIt',
				description: 'Please mention the channel where the game will be started',
				fields: [
					{
						name: 'Channel',
						value: 'Pending',
						inline: true
					},
					{
						name: 'Range',
						value: 'Pending',
						inline: true
					},
					{
						name: 'Price',
						value: 'Pending',
						inline: true
					}
				]
			});

			const filter = (m: Message) => m.author.id === interaction.user.id;
			await interaction.reply({embeds: [createEmbed]});


			const channel = await collectMessage(interaction.channel, filter, 60000);
			if (!channel) return interaction.channel.send('test');

			const channelid = channel.mentions.channels.first()?.id;
			if (!channelid) return interaction.channel.send('VALIDE');

			const dcChannel = await client.channels.fetch(channelid);
			if (!dcChannel) return  interaction.channel.send('VALIDE2');

			await channel.delete();
			await editEmbed(createEmbed, channel.content, 'Pending', 'Pending', 'Please provide the range within which the game will be played. The range can be between 1 and 1,000,000');
			await interaction.editReply({embeds: [createEmbed]});


			const number = await collectMessage(interaction.channel, filter, 60000);
			if (!number) return interaction.channel.send('test2');

			const numberCheck = isValidNumber(number.content);
			if (!numberCheck) return interaction.channel.send('VALIDEEE2');

			await number.delete();
			await editEmbed(createEmbed, channel.content, number.content, 'Pending', 'Please indicate the price for the game');
			await interaction.editReply({embeds: [createEmbed]});


			const price = await collectMessage(interaction.channel, filter, 60000);
			if (!price) return interaction.channel.send('test3');
			await price.delete();
			await editEmbed(createEmbed, channel.content, number.content, price.content, 'Thx');
			await interaction.editReply({embeds: [createEmbed]});

			interaction.channel.send(`${channel} ${number} ${price}`);

		} catch (error) {
			console.log(error);
		}
	},
};

async function collectMessage(channel: TextBasedChannel, filter: (m: Message) => boolean, time: number) {
	return new Promise<Message | null>((resolve) => {
		const collector = channel.createMessageCollector({ filter, max: 1, time });

		collector.on('collect', (m) => {
			collector.stop();
			resolve(m);
		});

		collector.on('end', (_, reason) => {
			if (reason === 'time') resolve(null);
		});
	});
}

async function editEmbed(embed: EmbedBuilder, v1:string, v2:string, v3:string, description: string) {
	embed.setFields([
		{
			name: 'Channel',
			value: v1,
			inline: true
		},
		{
			name: 'Range',
			value: v2,
			inline: true
		},
		{
			name: 'Price',
			value: v3,
			inline: true
		}
	]);
	embed.setDescription(description);
}

function isValidNumber(input: string) {
	const number = parseInt(input, 10);

	if (isNaN(number)) return false;

	if (number < 1 || number > 1000000) return false;

	if (number.toString() !== input) return false;

	return true;
}