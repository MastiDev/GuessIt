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
	name: "info",
	description: "info command",
	aliases: [],

	async run(message, args, client) {
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