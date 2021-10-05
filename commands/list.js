const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const Event = require("../Structures/Event.js");
const { version } = require('../package.json');
const config = require("../Data/config.json");
const { MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright } = require('chalk');

module.exports = new Command({
	name: "!explain",
	description: "Hello world.",
	aliases: [],

	async run(message, args, con, serverstats, userstats, client) {
		try {

            con.query(`SELECT * FROM todo WHERE user = '${message.author.id}'`, (err, result) => {
                var IDlist = [];
                var CONTENTlist = [];
                var DONElist = [];
                result.forEach(function(row){
                    IDlist.push("\n"+row.id)
                    CONTENTlist.push("\n"+core.stringTruncate(row.content, 50))
                    DONElist.push("\n"+row.done.replace("false", "❌").replace("true", "✅"))
                })
                
                const embed = new Discord.MessageEmbed()
                .setColor('FFF013')
                .setTitle('To-Do list')
                .setDescription("\n")
                .addField(`ID`, IDlist.toString(), true)
                .addField(`TODO`, CONTENTlist.toString(), true)
                .addField(`CHECKED`, DONElist.toString(), true)
                message.reply({embeds: [embed]})
                
            })

		} catch (error) {
			console.log(red(`[ERROR] In the command ${this.name} an error has occurred -> ${error}`))
		}
	}
});