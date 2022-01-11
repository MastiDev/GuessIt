const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright } = require('chalk');

const Discord = require("discord.js");
const Command = require("./command.js");
const Event = require("./event.js");

const config = require("../data/config.json");
const intents = new Discord.Intents(32767);
const fs = require("fs");

class Client extends Discord.Client {
	constructor() {
		super({ intents });

		/**
		 * @type {Discord.Collection<string, Command>}
		 */
		this.commands = new Discord.Collection();

		this.aliases = new Discord.Collection()

		this.prefix = config.prefix;
	}

	start(token) {
		fs.readdirSync("./commands")
			.filter(file => file.endsWith(".js"))
			.forEach(file => {
				/**
				 * @type {Command}
				 */
				const command = require(`../commands/${file}`);
				console.log(greenBright(`[COMMAND] Loaded ${(yellow(file))} with command ${(yellow(command.name))} ${(yellow(`[${command.aliases}]`))}`));
				this.commands.set(command.name, command);
				
				if (command.aliases) {
					command.aliases.forEach(alias => {
						this.aliases.set(command.alias, command);
					});
				};
			});

		fs.readdirSync("./events")
			.filter(file => file.endsWith(".js"))
			.forEach(file => {
				/**
				 * @type {Event}
				 */
				const event = require(`../events/${file}`);
				console.log(greenBright(`[EVENT] Loaded ${(yellow(file))} with event ${(yellow(event.event))}`));
				this.on(event.event, event.run.bind(null, this));
			});

		this.login(token);
	}
}

module.exports = Client;
