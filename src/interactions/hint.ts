import {Client, ChatInputCommandInteraction, PermissionFlagsBits} from 'discord.js';
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
				.setName('compare')
				.setDescription('This hint reveals whether the number being sought is greater or smaller than a reference number')
				.addStringOption( number =>
					number
						.setName('number')
						.setDescription('Number')
						.setRequired(true)
				))
		.addSubcommand(subcommand =>
			subcommand
				.setName('parity')
				.setDescription('This hint informs whether the number being sought is even or not'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('digitsum')
				.setDescription('With this command, players can find the digit sum of the sought number'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('prime')
				.setDescription('This command tells players whether the sought number is a prime number or not'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('digitsinnumber')
				.setDescription('This command indicates whether specific digits are present in the number')
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

			if (!interaction.channel?.id) return interaction.reply('In this Channel is no Round');

			const round = client.Eround.get(interaction.channel?.id);
			if (!round) return interaction.reply('In this Channel is no Round');

			if (hintCategory === 'compare') {

				const commandNumber = interaction.options.getString('number');
				if (!commandNumber) return interaction.reply('You need to enter a Number');

				if (isNaN(Number(commandNumber))) return interaction.reply('Please provide a valid number');

				if (round.number < parseInt(commandNumber)) {
					const hint = new EmbedBuilder()
						.setColor(0xF1FF00)
						.setTitle('Hint')
						.setDescription(`The number is lower than **${commandNumber}**`);
					await interaction.reply({embeds: [hint]});
				} else if (round.number > parseInt(commandNumber)) {
					const hint = new EmbedBuilder()
						.setColor(0xF1FF00)
						.setTitle('Hint')
						.setDescription(`The number is higher than **${commandNumber}**`);
					await interaction.reply({embeds: [hint]});
				} else {
					await interaction.reply({ephemeral: true, content: 'This is the number :)'});
				}

			} else if (hintCategory === 'parity') {

				const hint = new EmbedBuilder()
					.setColor(0xF1FF00)
					.setTitle('Hint');

				if (isEven(round.number)) {
					hint.setDescription('The number is **Even**');
				} else hint.setDescription('The number is **Odd**');

				await interaction.reply({embeds: [hint]});

			} else if (hintCategory === 'digitsum') {

				const number = round.number.toString().split('');
				let digitsum = 0;
				for (let i = 0; i < number.length; i++) {
					digitsum = digitsum + parseInt(number[i]);
				}
				const hint = new EmbedBuilder()
					.setColor(0xF1FF00)
					.setTitle('Hint')
					.setDescription(`The digitsum is **${digitsum}**`);
				await interaction.reply({embeds: [hint]});

			} else if (hintCategory === 'prime') {

				const hint = new EmbedBuilder()
					.setColor(0xF1FF00)
					.setTitle('Hint');
				if (isPrime(round.number)) {
					hint.setDescription('The number is a **prime** number');
				} else hint.setDescription('The number is **not** a prime number');

				await interaction.reply({embeds: [hint]});

			} else if (hintCategory === 'digitsinnumber') {

				const commandNumber = interaction.options.getString('number');
				if (!commandNumber) return interaction.reply('You need to enter a Number');

				const number = parseInt(commandNumber);

				if (number < 0 || number > 9) return console.log('Please provide a number between 0-9');

				const roundNumberArray = round.number.toString();

				if (roundNumberArray.includes('.')) return console.log('Please provide a number between 0-9');
				if (roundNumberArray.includes(number.toString())) {
					const hint = new EmbedBuilder()
						.setColor(0xF1FF00)
						.setTitle('Hint')
						.setDescription(`The number contain the digit ${number}`);
					await interaction.reply({embeds: [hint]});
				} else {
					console.log(`The number does not contain the digit ${number}`);
					return false;
				}
			}

		} catch (error) {
			console.log(error);
		}
	}
};

function isEven(n:number) {
	return n % 2 === 0;
}

function isPrime (n:number) {
	if (n <= 1) {
		return false;
	}
	for (let i = 2; i <= Math.sqrt(n); i++) {
		if (n % i === 0) {
			return false;
		}
	}
	return true;
}