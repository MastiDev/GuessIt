const Command = require('../structures/command.js');
const config = require('../data/config.json');
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
	name: "delete",
	description: "delete",
	aliases: ["del"],

	async run(message, args, client) {
		try {
      if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("You don't have enough permissions!")

      let channel = message.mentions.channels.first();
      if (!channel) return message.reply("You have to mention a channel!");
      
      let round = await dbquery(`SELECT * FROM rounds WHERE channelid = '${channel.id}' AND guildid = '${message.guild.id}'`)
      if (round.length === 0) return message.reply("There is no round in this channel!")
      
      await dbquery(`DELETE FROM rounds WHERE channelid = '${channel.id}' AND guildid = '${message.guild.id}'`)
      message.reply("The round has been deleted!")
    } catch (error) {
      console.log(error);
    }
	}
});
