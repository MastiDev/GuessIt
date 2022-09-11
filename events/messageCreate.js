const Event = require("../structures/event.js");
const config = require("../data/config.json");
const Discord = require('discord.js');
const mysql = require('mysql2');
const util = require('util');

var con = mysql.createPool({
    host: `${config.mysql.host}`,
    port: `${config.mysql.port}`,
    user: `${config.mysql.user}`,
    password: `${config.mysql.password}`,
    database: `${config.mysql.database}`,
    multipleStatements: true
});

const dbquery = util.promisify(con.query).bind(con);

module.exports = new Event("messageCreate", async(client, message) => {
    try {
        if (message.author.bot) return;

        let prefix = await getprefix(message.guild.id);

        if (message.content.startsWith(prefix)) {
            const args = message.content.substring(prefix.length).split(/ +/);
            const command = client.commands.find(cmd => cmd.name == args[0] || cmd.aliases.includes(args[0]));
            if (!command) return //message.reply(`${args[0]} is not a valid command!`); //uncomment if you want that the bot replies when the command is not a valid command!
            command.run(message, args, client)
        } else {
            if (!isNaN(message.content)) await checkRounds(message.guild.id, message.channel.id, message);
            // Here you can add commands that are not have a prefix.
            // like when somebody pings the bot.
        }

    } catch (error) {
        console.log(error);
    }
});

async function getprefix(guildid) {
    let rows = await dbquery(`SELECT prefix FROM guilds WHERE guildid = ${guildid}`);
    if (rows.length < 1) {
        await dbquery(`INSERT IGNORE INTO guilds (id, guildid) VALUES (NULL, '${guildid}')`);
        return "!";
    }
    if (rows[0].prefix == null) {
        await dbquery(`UPDATE guilds SET prefix = '!' WHERE guildid = ${guildid}`);
        return "!";
    }
    return rows[0].prefix;
}

async function checkRounds(guildid, channelid, message) {
    let DateandTime = new Date()
    let round = await dbquery(`SELECT * FROM rounds WHERE guildid = '${guildid}' AND channelid = '${channelid}'`)

    if (round.length === 0) return; //message.reply("There is no round in this channel!");

    if (round[0].number < parseInt(message.content)) return message.reply(`The number is lower than **${round[0].maxnumber}**!`);

    if ((round[0].number != message.content)) {
        let sql1 = `UPDATE rounds SET trys = '${round[0].trys + 1}' WHERE id = ${round[0].id}`;
        await dbquery(sql1);
    } else {
        const embed = new Discord.EmbedBuilder()
        .setTitle(`🎉 Congratulations ${message.author.tag} 🎉`)
        .setColor(`${config.bot.embedcolor}`)
        .setDescription(`Congratulations you have guessed the correct number after ${round[0].trys} trys`)
        .addFields(
            {name: "Price", value: `\`\`\`${round[0].price}\`\`\``},
        )
        message.reply({embeds: [embed]});
        await dbquery(`DELETE FROM rounds WHERE guildid = '${guildid}' AND channelid = '${channelid}'`);
    };
};