const Command = require('../structures/command.js');
const config = require('../data/config.json');
const Discord = require('discord.js');
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
	name: "list",
	description: "list command",
	aliases: [],

	async run(message, args, client) {
		try {
            let rounds = await dbquery(`SELECT * FROM rounds WHERE guildid = '${message.guild.id}'`)
            if (rounds.length === 0) return message.reply("There are no rounds in this server!")

            var roundlist = [];
            for (let i = 0; i < rounds.length; i++) {
                roundlist.push(`\n<#${rounds[i].channelid}> | Price: ${rounds[i].price} | Trys: ${rounds[i].trys} | Last Try: ${rounds[i].lasttry}`)
            }

            const embed = new Discord.EmbedBuilder()
            .setTitle(`Round List`)
            .setColor(`${config.bot.embedcolor}`)
            .setDescription(`${roundlist}`)
            message.reply({embeds: [embed]})
		} catch (error) {
			console.log(error);
		}
	}
});