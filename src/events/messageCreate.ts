import config from '../data/config.js';
import { Client, Message } from 'discord.js';
import { EmbedBuilder} from '@discordjs/builders';

interface CustomCommand {
	id: string;
	type: string;
	disabled: boolean;
	aliases: string[];
	execute(client: Client, message: Message, args: string[]): Promise<void>;
}

export default {
	event: 'messageCreate',
	async execute(client: Client, message: Message) {
		try {
			if (message.author.bot) return;

			if (!isNaN(Number(message.content))) await checkRounds(client, message.channel.id, message);

			if (message.content.startsWith(config.bot.prefix)) {
				const args = message.content.slice(config.bot.prefix.length).trim().split(/ +/);
				const command = client.interaction.get(`messageCommand-${args[0]}`) as CustomCommand;
				if (!command) return;
				try {
					await command.execute(client, message, args);
				} catch (error) {
					await message.reply('There was an error trying to execute that command!');
					console.log(error);
				}
			}

		} catch (error) {
			console.log(error);
		}
	}
};

async function checkRounds(client: Client, channelid: string, message: Message) {
	try {
		const round = client.Eround.get(channelid);
		if (!round) return;

		if (round.max < parseInt(message.content)) return message.reply(`The number is lower than **${round.max}**!`);

		if (round.number != message.content) {
			client.Eround.math(channelid, '+', 1, 'trys');
		} else {
			const embed = new EmbedBuilder()
				.setTitle(`🎉 Congratulations ${message.author.tag} 🎉`)
				.setDescription(`Congratulations you have guessed the correct number after **${round.trys}** trys`)
				.addFields(
					{name: 'Price', value: `\`\`\`${round.price}\`\`\``},
				);
			await message.reply({embeds: [embed]});
			client.Eround.delete(channelid);
		}
	} catch (error) {
		console.log(error);
	}
}