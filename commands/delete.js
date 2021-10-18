const Command = require("../Structures/Command.js");
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright } = require('chalk');
const talkedRecently = new Set();

module.exports = new Command({
	name: "delete",
	description: "delete",
	aliases: ["del"],

	async run(message, args, con, serverstats, userstats, client) {
		try {

            if (talkedRecently.has(message.author.id)) return message.reply("Wait 10 seconds!");

            if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("You don't have enough permissions!")

			con.query(`SELECT * FROM rounds WHERE id = ${args[1]} AND guildid = '${message.guild.id}'`, (err, rows) => {
                if(!(rows)) return message.reply("Round not found!")

                con.query(`DELETE FROM rounds WHERE id = ${args[1]} AND guildid = '${message.guild.id}'`)
                message.reply(`Successfully delete round ${args[1]}`)
            })

            talkedRecently.add(message.author.id);
            setTimeout(() => {
              talkedRecently.delete(message.author.id);
            }, 10000);

		} catch (error) {
			console.log(red(`[ERROR] In the command ${this.name} an error has occurred -> ${error}`))
		}
	}
});
