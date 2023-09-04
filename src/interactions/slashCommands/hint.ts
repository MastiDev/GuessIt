import { Client, ChatInputCommandInteraction, PermissionFlagsBits } from 'discord.js';
import { SlashCommandBuilder, EmbedBuilder } from '@discordjs/builders';

const commandID = 'hint';
export default {
	id: commandID,
	type: 'slashCommand',
	disabled: false,
	data: new SlashCommandBuilder()
		.setName(commandID)
		.setDescription('hint')
		.setDefaultMemberPermissions(PermissionFlagsBits['Administrator'])
		.addSubcommand(subcommand =>
			subcommand
				.setName('first')
				.setDescription('First')
				.addChannelOption(option => option.setName('channel').setDescription('Channel').setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('last')
				.setDescription('Last')
				.addChannelOption(option => option.setName('channel').setDescription('Channel').setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('number')
				.setDescription('Number')
				.addChannelOption(option => option.setName('channel').setDescription('Channel').setRequired(true))
				.addStringOption( number =>
					number
						.setName('number')
						.setDescription('Number')
						.setRequired(true)
				)),
	async execute(client: Client, interaction: ChatInputCommandInteraction) {
		try {
			const hintCategory = interaction.options.getSubcommand();
			if (!hintCategory) return interaction.reply('You need to enter a Hint Category');

			const commandNumber = interaction.options.getString('number');
			if (!commandNumber) return interaction.reply('You need to enter a Number');

			const channel = interaction.options.getChannel('channel');
			if (!channel) return interaction.reply('Please mention a channel!');

			const round = client.Eround.get(channel.id);
			if (!round) return  interaction.reply('In this Channel is no Round');

			if(hintCategory === 'first') {

				const firstNumber = round.number.toString().split('');
				const firstNumberEmbed = new EmbedBuilder()
					.setTitle('Hint')
					.setDescription(`The first digit is **${firstNumber[0]}**!`);
				await interaction.reply({embeds: [firstNumberEmbed]});

			} else if (hintCategory === 'last') {

				const lastNumber = round.number.toString();
				const lastNumberEmbed = new EmbedBuilder()
					.setTitle('Hint')
					.setDescription(`The last digit is **${lastNumber.charAt(lastNumber.length - 1)}**!`);
				await interaction.reply({ embeds: [lastNumberEmbed] });

			} else {

				if (isNaN(Number(commandNumber))) return interaction.reply('Please provide a valid number!');

				if (round.number < parseInt(commandNumber)) {
					const hint = new EmbedBuilder()
						.setTitle('Hint')
						.setDescription(`The number is lower than **${commandNumber}**!`);
					await interaction.reply({embeds: [hint]});
				} else if (round.number > parseInt(commandNumber)) {
					const hint = new EmbedBuilder()
						.setTitle('Hint')
						.setDescription(`The number is higher than **${commandNumber}**!`);
					await interaction.reply({embeds: [hint]});
				} else {
					const hint = new EmbedBuilder()
						.setTitle('Hint')
						.setDescription(`The number is **${commandNumber}**.....`);
					await interaction.reply({embeds: [hint]});
				}

			}

		} catch (error) {
			console.log(error);
		}
	}
};