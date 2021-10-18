const Command = require('../Structures/Command.js');
const Event = require('../Structures/Event.js');
const Discord = require('discord.js');
const { MessageSelectMenu, MessageActionRow, MessageButton } = require('discord.js');
const { version } = require('../package.json');
const config = require('../Data/config.json');
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright } = require('chalk');
const mysql = require('mysql');
const fs = require('fs')

module.exports = new Command({
	name: "!explain",
	description: "Hello world.",
	aliases: [],

	async run(message, args, con, serverstats, userstats, client) {
		try {
			message.reply("Hello world!");
		} catch (error) {
			console.log(red(`[ERROR] In the command ${this.name} an error has occurred -> ${error}`))
		}
	}
});
