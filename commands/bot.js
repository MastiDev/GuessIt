const Command = require('../structures/command.js');
const Event = require('../structures/event.js');
const config = require('../data/config.json');
const Discord = require('discord.js');
const { MessageSelectMenu, MessageActionRow, MessageButton } = require('discord.js');
const { version } = require('../package.json');
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright } = require('chalk');
const mysql = require('mysql');
const fs = require('fs')

module.exports = new Command({
	name: "bot",
	description: "Shows information about the bot!",
	aliases: [],
	async run(message, args, client) {

		try {
			let totalSeconds = (client.uptime / 1000);
			let days = Math.floor(totalSeconds / 86400);
			totalSeconds %= 86400;
			let hours = Math.floor(totalSeconds / 3600);
			totalSeconds %= 3600;
			let minutes = Math.floor(totalSeconds / 60);
			let seconds = Math.floor(totalSeconds % 60);
			let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
			const embed = {
			"title": "**" + client.user.username + "**",
			"description": "Developer: [Masti#5516](https://discord.com/users/765574410119282749)\n\nGithub: [HAZO-Development](https://github.com/HAZO-Development)\n\nDiscord: [HAZO-Development](https://discord.gg/EfCJbFMX) \n\n**__Informations:__**",
			"color": `${config.embedcolor}`,
			"thumbnail": {
				"url": client.user.displayAvatarURL()
			},
			"fields": [
				{
					"name": "📣 Prefix",
					"value": `\`\`\`${serverstats[0].prefix}\`\`\``,
					"inline": true
				},
				{
					"name": "🏓 Bot-Latency ",
					"value": `\`\`\`${Date.now() - message.createdTimestamp}ms\`\`\``,
					"inline": true
				},
				{
					"name": "🏓 API-Latency ",
					"value": `\`\`\`${Math.round(client.ws.ping)}ms\`\`\``,
					"inline": true
				},
				{
					"name": "<:red_circle:847468411859763270> Uptime ",
					"value": `\`\`\`${uptime}\`\`\``,
				}
			]
			};
			message.reply({embeds: [embed]})
		} catch (error) {
			console.log(red(`[ERROR] In the command ${this.name} an error has occurred -> ${error}`))
		}
	}
});
