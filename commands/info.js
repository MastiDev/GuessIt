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
	name: "info",
	description: "info command",
	aliases: [],

	async run(message, args, client) {
		try {

            let channel = message.mentions.channels.first();
            if (!channel) return message.reply("You have to mention a channel!");

            let round = await dbquery(`SELECT * FROM rounds WHERE channelid = '${channel.id}' AND guildid = '${message.guild.id}'`)
            if (round.length === 0) return message.reply("There is no round in this channel!")

            const embed = new Discord.EmbedBuilder()
            .setTitle(`Round Info`)
            .setColor(`${config.bot.embedcolor}`)
            .addFields(
                { name: 'ID', value: `${round[0].id}`, inline: true },
                { name: 'Channel', value: `[**Click here**](https://discord.com/channels/${message.guild.id}/${round[0].channelid})`, inline: true },
                { name: 'Price', value: `**${round[0].price}**`, inline: true },
                { name: 'Trys', value: `**${round[0].trys}**`, inline: true },
                { name: 'Last Try', value: `**${round[0].lasttry}**`, inline: true },
            )
            message.reply({embeds: [embed]})
		} catch (error) {
			console.log(error);
		}
	}
});