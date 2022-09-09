const Command = require('../structures/command.js');
const Event = require('../structures/event.js');
const config = require('../data/config.json');
const Discord = require('discord.js');
const { MessageSelectMenu, MessageActionRow, MessageButton } = require('discord.js');
const { version } = require('../package.json');
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright } = require('chalk');
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
	name: "create",
	description: "create",
	aliases: [],

	async run(message, args, client) {
		try {
            let channel = message.mentions.channels.first();
            if (!channel) return message.reply("You have to mention a channel!");

            if (args[2] === undefined) return message.reply('You gave ti enter a number between 1 and 1.000.000!');
            if (isNaN(args[2])) message.reply("You have to enter a number!");
            if (args[2] < 1 && args[2] > 1000000) return message.reply('You have to enter a number between 1 and 1.000.000!');

            if (args[3] === undefined) return message.reply('You have to enter a price!');
            let price = args.slice(3).join(" ");

            dbquery(`INSERT INTO rounds (id, guildid, channelid, number, price) VALUES (NULL, '${message.guild.id}', '${channel.id}', '${getRandomInt(args[2])}', '${price}')`)

            let roundchannel = client.channels.cache.get(channel.id);
            let embed = new Discord.EmbedBuilder()
            .setTitle(`New Round`)
            .setColor(`${config.bot.embedcolor}`)
            .setDescription(`A new round has been created in this channel! \nThe Number is between **1** and **${args[2]}**!\nThe Price is **${price}**!`)
            roundchannel.send({embeds: [embed]})

            message.reply('The round has been started!')
		} catch (error) {
			console.log(error);
		}
	}
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}