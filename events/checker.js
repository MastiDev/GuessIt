const Command = require('../structures/command.js');
const Event = require('../structures/event.js');
const config = require('../data/config.json');
const Discord = require('discord.js');
const { MessageSelectMenu, MessageActionRow, MessageButton } = require('discord.js');
const { version } = require('../package.json');
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright } = require('chalk');
const mysql = require('mysql');
const fs = require('fs')

var con = mysql.createConnection({
    host: `${config.mysql.host}`,
    port: `${config.mysql.port}`,
    user: `${config.mysql.user}`,
    password: `${config.mysql.password}`,
    database: `${config.mysql.database}`,
    insecureAuth: true,
    multipleStatements: true
});

module.exports = new Event("messageCreate", async (client, message) => {
	try {
	
		con.query(`SELECT * FROM rounds WHERE guildid = ${message.guild.id}`, (err, rows) => {

			rows.forEach(function(row) {

				if(message.channel.id === row.channelid){

					if(message.content === row.number) {
						//con.query(`DELETE FROM rounds WHERE id = '${row.id}'`)
						
						const winembed = new Discord.MessageEmbed()
						winembed.setTitle(`🎉 Congratulations ${message.author.tag} 🎉`)
						winembed.setDescription(`Congratulations you have guessed the correct number after ${row.trys} trys`)

						winembed.addField("Price", `\`\`\`${row.price}\`\`\``)
						winembed.color(`${config.embedcolor}`)


						message.reply({embeds: [winembed]})

					}else {
						var DateandTime = new Date()
						con.query(`UPDATE rounds SET trys = '${row.trys + 1}', lasttry = '${DateandTime.toLocaleDateString() + " " + DateandTime.toLocaleTimeString()}' WHERE id = '${row.id}'`)
					}

				}

			});
		})

	} catch (error) {
		return console.log(red(`[ERROR] In the event messageCreate (checker) an error has occurred -> ${error}`))
	}
});
