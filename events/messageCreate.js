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
		
		if (message.author.bot) return;

		con.query(`SELECT * FROM serverstats WHERE guildid = ${message.guild.id}`, (err, serverstats) => {
			if(err) throw err;
		
			if(serverstats.length < 1) {
	
				sql = `INSERT INTO serverstats (id, guild, prefix) VALUES (NULL, '${message.guild.id}', '+')`
				con.query(sql, serverstats);  
			}
	
			con.query(`SELECT * FROM userstats WHERE userid = ${message.author.id}`, (err, userstats) => {
				if(err) throw err;
	
				let prefix = serverstats[0].prefix
	
				if (message.content.startsWith(prefix)) {
	
					if(userstats.length < 1) {
		
						con.query(`INSERT INTO userstats (id, userid) VALUES (NULL, '${message.author.id}')`, userstats);
			
						console.log("NEW USER "+message.author.id)
					}
	
					const args = message.content.substring(prefix.length).split(/ +/);
					const command = client.commands.find(cmd => cmd.name == args[0] || cmd.aliases.includes(args[0]));
					if (!command) return message.reply(`${args[0]} is not a valid command!`);
					command.run(message, args, con, serverstats, userstats, client)
				}
		
				if(!message.content.startsWith(prefix)) {
					//BOT - PING
					if(message.content.startsWith("<@"+client.user.id+">") || message.content.startsWith("<@!"+client.user.id+">") && !message.author.bot) {
						//BOT
						let totalSeconds = (client.uptime / 1000);
						let days = Math.floor(totalSeconds / 86400);
						totalSeconds %= 86400;
						let hours = Math.floor(totalSeconds / 3600);
						totalSeconds %= 3600;
						let minutes = Math.floor(totalSeconds / 60);
						let seconds = Math.floor(totalSeconds % 60);
						let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
						const embed = {
						"title": "**" + client.user.username + "**",
						"description": "__Developer:__ \n  [Funty#8818](https://discord.com/users/417258282479124480)\n  [Masti#5516](https://discord.com/users/765574410119282749)\n\n__Github:__ [HAZO-Development](https://github.com/HAZO-Development)\n\n__Discord:__ ["+client.guilds.cache.get('794259989366964235').name+"](https://discord.gg/EfCJbFMX) \n\n**__Informations:__**",
						"color": `${config.embedcolor}`,
						"thumbnail": {
							"url": client.user.displayAvatarURL()
						},
						"fields": [
							{
								"name": "📣 Prefix",
								"value": `\`\`\`${rows[0].prefix}\`\`\``,
								"inline": true
							},
							{
								"name": "🏓 Bot-Latency ",
								"value": `\`\`\`${Date.now() - message.createdTimestamp}ms\`\`\``,
								"inline": true
							},
							{
								"name": "🏓 API-Latency ",
								"value": `\`\`\`${Math.round(client.ws.ping)}ms\`\`\``,
								"inline": true
							},
							{
								"name": "<:red_circle:847468411859763270> Uptime ",
								"value": `\`\`\`${uptime}\`\`\``,
							}
						]
						};
						message.reply({embeds: [embed]})
					}
				}
			})
		})

	} catch (error) {
		return console.log(red(`[ERROR] In the event messageCreate an error has occurred -> ${error}`))
	}
});
