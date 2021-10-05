const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const Event = require("../Structures/Event.js");
const mysql = require('mysql');
const { version } = require('../package.json');
const config = require("../Data/config.json");
const { MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright } = require('chalk');

var con = mysql.createConnection({multipleStatements: true,
    host: "194.34.246.208",
    user: "admin",
    password: "QHyjEuHRgk763MUmXxSUFZMaYDjdamSV",
    database: "GuessIt",
	insecureAuth: true
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
