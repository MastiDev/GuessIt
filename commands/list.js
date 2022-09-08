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
	name: "list",
	description: "list command",
	aliases: [],

	async run(message, args, client) {
		try {

            con.query(`SELECT * FROM rounds WHERE guildid = '${message.guild.id}'`, (err, result) => {
                if(!(result.length > 0)) return message.reply("No active rounds!")
                var IDlist = [];
                var CHANNELIDlist = [];
                var PRICElist = [];
                result.forEach(function(row){
                    IDlist.push("\n"+row.id)
                    CHANNELIDlist.push("\n"+`<#${row.channelid}>`)
                    PRICElist.push("\n"+row.price)
                })
                
                const embed = new Discord.MessageEmbed()
                .setColor(`${config.embedcolor}`)
                .setTitle('Active rounds!')
                .setDescription("\n")
                .addField(`ID`, IDlist.toString(), true)
                .addField(`CHANNELID`, CHANNELIDlist.toString(), true)
                .addField(`PRICE`, PRICElist.toString(), true)
                message.reply({embeds: [embed]})
                
            })

		} catch (error) {
			console.log(red(`[ERROR] In the command ${this.name} an error has occurred -> ${error}`))
		}
	}
});