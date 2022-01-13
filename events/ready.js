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

module.exports = new Event("ready", client => {

    try {
        
        console.log(yellow(`[LOGIN] logged in as ${client.user.tag} -> Version ${version}`))

        const startup = new Discord.MessageEmbed()
        startup.setTitle(`${client.user.username} | Log`)
        startup.setDescription(Date())
        startup.setColor(`${config.embedcolor}`)
        startup.addField(`Version`, `${version}`)
        startup.setThumbnail(client.user.avatarURL())
        startup.setTimestamp()
        startup.setFooter(`${client.user.username}`, client.user.avatarURL());
        client.channels.cache.get("894565469372170301").send({embeds: [startup]});
    
        //ACTIVITY
        let status_state = 0;
        client.user.setActivity('you', { type: 'WATCHING' });
        setInterval(() => {
            let status_presences = [
                { type: 'PLAYING',  message: 'Version: '+version},
                { type: 'WATCHING', message: `${client.guilds.cache.size} server.`},
                { type: 'WATCHING', message: `${client.users.cache.size} user.`},
                { type: 'WATCHING', message: `${client.commands.size} commands.`}
            ];
            status_state = (status_state + 1) % status_presences.length;
            status_presence = status_presences[status_state];
            client.user.setActivity(status_presence.message, { type: status_presence.type });
        }, 5000);

    } catch (error) {
        return console.log(red(`[ERROR] In the event messageCreate an error has occurred -> ${error}`))
    }
});
