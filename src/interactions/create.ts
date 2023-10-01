import { Client, ChatInputCommandInteraction, TextBasedChannel, TextChannel, Message, PermissionFlagsBits } from 'discord.js';
import { SlashCommandBuilder, EmbedBuilder } from '@discordjs/builders';

const commandID = 'create';
export default {
	id: commandID,
	type: 'slashCommand',
	disabled: false,
	data: new SlashCommandBuilder()
		.setName(commandID)
		.setDescription('Initiates the setup process for creating a new round')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(client: Client, interaction: ChatInputCommandInteraction) {
		try {
			if (!interaction.channel || !interaction.guildId) return;

			const createEmbed = new EmbedBuilder({
				color: 0xF1FF00,
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
			if (!channel) return interaction.channel.send('You need to mention a Valid Channel!');

			const channelid = channel.mentions.channels.first()?.id;
			if (!channelid) return interaction.channel.send('You need to mention a Valid Channel!');

			const channelType = await client.channels.fetch(channelid) as TextChannel;
			if (channelType.type !== 0) return interaction.channel.send('You need to mention a Text Channel!');

			const dcChannel = await client.channels.fetch(channelid);
			if (!dcChannel) return  interaction.channel.send('You need to mention a Valid Channel!');

			const round = client.Eround.get(channelid);
			if (round) return interaction.channel.send('A game is already in progress on this channel.');

			await channel.delete();
			await editEmbed(createEmbed, channel.content, 'Pending', 'Pending', 'Please provide the range within which the game will be played.');
			await interaction.editReply({embeds: [createEmbed]});


			const number = await collectMessage(interaction.channel, filter, 60000);
			if (!number) return interaction.channel.send('Please provide a valid number.');

			const numberCheck = isValidNumber(number.content);
			if (!numberCheck) return interaction.channel.send('Please provide a valid number.');

			await number.delete();
			await editEmbed(createEmbed, channel.content, number.content, 'Pending', 'Please indicate the price for the game');
			await interaction.editReply({embeds: [createEmbed]});


			const price = await collectMessage(interaction.channel, filter, 60000);
			if (!price) return interaction.channel.send('test3');
			await price.delete();
			await editEmbed(createEmbed, channel.content, number.content, price.content, 'All values are valid, and the game has now started.');
			await interaction.editReply({embeds: [createEmbed]});


			const guessNumber = generateRandomNumber(parseInt(number.content));

			client.Eround.set(channelid, {
				guildId: interaction.guildId,
				channelId: channelid,
				max: number.content,
				number: guessNumber,
				price: price.content,
				trys: 0,
				hints: '\n'
			});

			const checkIfEmpty = client.Eguilds.get(interaction.guildId);
			if (!checkIfEmpty) client.Eguilds.set(interaction.guildId, []);

			client.Eguilds.push(interaction.guildId, channelid);

			const gameEmbed = new EmbedBuilder({
				color: 0x2EFF00,
				title: 'Game started',
				description: `The game has begun! The prize for this game is **${price.content}**, and the range is between 1 and **${number.content}**.`,
			});

			const gameChannel = <TextChannel>client.channels.cache.get(channelid);
			await gameChannel?.send({embeds: [gameEmbed]});
			const topic = `In this channel is currently hosting a game of **Guess it.** The range is **1-${number.content}**, and the prize for guessing correctly is: **${price.content}**\n\n**Hints:**`;
			await gameChannel?.edit({topic: topic});
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
	if (number < 1 || number > 1000000000000000) return false;
	return number.toString() === input;
}

function generateRandomNumber(max:number) {
	return Math.floor(Math.random() * max) + 1;
}