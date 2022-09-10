const Command = require("../structures/command.js");
const Discord = require("discord.js");
const config = require("../data/config.json");
const mysql = require('mysql2');
const util = require('util');

var con = mysql.createPool({
    multipleStatements: true,
    insecureAuth: true,
    host: `${config.mysql.host}`,
    port: `${config.mysql.port}`,
    user: `${config.mysql.user}`,
    password: `${config.mysql.password}`,
    database: `${config.mysql.database}`
});

const dbquery = util.promisify(con.query).bind(con);

module.exports = new Command({
	name: "hint",
	description: "hint",
	aliases: [],

	async run(message, args, client) {
		try {
            if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("You don't have the permission to use this command!");
            let round = await dbquery(`SELECT * FROM rounds WHERE guildid = '${message.guild.id}' AND channelid = '${message.channel.id}'`);
            if (round.length === 0) return message.reply("There is no round in this channel!");

            switch (args[1]) {
                case "first":
                    let diggitfirst = round[0].number.toString().split("");
                    let hint = new Discord.EmbedBuilder()
                        .setTitle("Hint")
                        .setDescription(`The first digit is **${diggitfirst[0]}**!`)
                        .setColor(`${config.bot.embedcolor}`)
                    message.reply({ embeds: [hint] });
                    break;
                case "last":
                    let lastdiggit = round[0].number.toString().split("");
                    if (!lastdiggit[1]) {
                        let hint =  new Discord.EmbedBuilder()
                            .setTitle("Hint")
                            .setDescription(`Their is no second digit!`)
                            .setColor(`${config.bot.embedcolor}`)
                        message.reply({ embeds: [hint] });
                    } else {
                        let hint = new Discord.EmbedBuilder()
                            .setTitle("Hint")
                            .setDescription(`The last digit is **${lastdiggit[1]}**!`)
                            .setColor(`${config.bot.embedcolor}`)
                        message.reply({ embeds: [hint] });
                    }
                    break;
                default:
                    if (isNaN(args[1])) return message.reply("Please provide a valid number!");

                    if (round[0].number < parseInt(args[1])) {
                        let hint = new Discord.EmbedBuilder()
                            .setTitle("Hint")
                            .setDescription(`The number is lower than **${args[1]}**!`)
                            .setColor(`${config.bot.embedcolor}`)
                        message.reply({ embeds: [hint] });
                    } else if (round[0].number > parseInt(args[1])) {
                        let hint = new Discord.EmbedBuilder()
                            .setTitle("Hint")
                            .setDescription(`The number is higher than **${args[1]}**!`)
                            .setColor(`${config.bot.embedcolor}`)
                        message.reply({ embeds: [hint] });
                    } else {
                        let hint = new Discord.EmbedBuilder()
                            .setTitle("Hint")
                            .setDescription(`The number is **${args[1]}**.....`)
                            .setColor(`${config.bot.embedcolor}`)
                        message.reply({ embeds: [hint] });
                    }
                    break;
            }

		} catch (error) {
			console.log(error);
		}
	}
});