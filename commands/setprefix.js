const Command = require("../Structures/Command.js");
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright } = require('chalk');

module.exports = new Command({
	name: "setprefix",
	description: "set a custom prefix",
	aliases: [],
	
	async run(message, args, con, serverstats, userstats, client) {
		try {
		if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("You don't have enough permissions!");
		if(!(args.length > 1)) return message.reply("not enough arguments!")
			con.query(`UPDATE serverstats SET prefix = '${args[1]}' WHERE serverid = '${message.guild.id}'`)
			message.channel.send("The Prefix is now " + newprefix)
		} catch (error) {
			console.log(red(`[ERROR] In the command ${this.name} an error has occurred -> ${error}`))
		}
	}
});
