const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const config = require("../Data/config.json");
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright } = require('chalk');
const mysql = require("mysql");

module.exports = new Command({
	name: "info",
	description: "info command",
	aliases: [],

	async run(message, args, con, serverstats, userstats, client) {
		try {

            if (args[1] === undefined) return message.reply("You have to enter a Round-ID!")
            con.query(`SELECT * FROM rounds WHERE id = '${args[1]}'`, (err, rows) => {
                if(!(rows.length > 0)) return message.reply("You have to enter a valid Round-ID!")
                if(!(rows[0].guildid === `${message.guild.id}`)) return message.reply("You have to enter a valid Round-ID!")

                const embed = new Discord.MessageEmbed()
                .setColor(`${config.embedcolor}`)
                .setTitle('Round Info!')
                .addField(`ID`, `**${rows[0].id}**`, true)
                .addField(`Channel`, `[**Click here**](http://https://discord.com/channels/${message.guild.id}/${rows[0].channelid})`, true)
                .addField(`Price`, `**${rows[0].price}**`, true)
                .addField(`Trys`, `**${rows[0].trys}**`, true)
                .addField(`Last Try`, `**${rows[0].lasttry}**`, true)
                message.reply({embeds: [embed]})
                
            })

		} catch (error) {
			console.log(red(`[ERROR] In the command ${this.name} an error has occurred -> ${error}`))
		}
	}
});