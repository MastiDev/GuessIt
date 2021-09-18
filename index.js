const Discord = require('discord.js');
const client = new Discord.Client({intents: [Discord.Intents.FLAGS.DIRECT_MESSAGES,Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,Discord.Intents.FLAGS.GUILDS,Discord.Intents.FLAGS.GUILD_BANS,Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,Discord.Intents.FLAGS.GUILD_INTEGRATIONS,Discord.Intents.FLAGS.GUILD_INVITES,Discord.Intents.FLAGS.GUILD_MEMBERS,Discord.Intents.FLAGS.GUILD_MESSAGES,Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,Discord.Intents.FLAGS.GUILD_PRESENCES,Discord.Intents.FLAGS.GUILD_VOICE_STATES,Discord.Intents.FLAGS.GUILD_WEBHOOKS]})
const fs = require('fs');
const fetch = require('node-fetch');
const mysql = require("mysql");
const fastcsv = require("fast-csv");
const core = require('@hazo-development/hazo-core');

var embedcolor = new String("D6FF00")
var version = new String("1.0.0")
var prefix = new String("!")

var con = mysql.createConnection({multipleStatements: true,
    host: "194.34.246.208",
    user: "admin",
    password: "QHyjEuHRgk763MUmXxSUFZMaYDjdamSV",
    database: "GuessIt"
});

con.connect(err => {
    if(err) throw err;
    console.log('Connected to database!');
})

//Activity 
client.on('ready', () => {
    const activities_list = [ 
        "Guess It!",
       "Version: " + version,
       "Server: " + client.guilds.cache.size,
       "User: " + client.users.cache.size
       ]; 

   setInterval(() => {
       const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
       client.user.setActivity(activities_list[index]);
   }, 5000); // Runs this every 5 seconds.
});

//CREATE SERVERDATA
client.on('guildCreate', guild => {
    con.query(`SELECT * FROM serverstats WHERE guildid = ${guild.id}`, (err, rows) => {
        if(err) throw err;
    
        if(rows.length < 1) {
          sql = `INSERT INTO serverstats (id, guildid, prefix) VALUES (NULL, '${guild.id}', '$')`
          con.query(sql, rows);
        }else return
    })
});

//UPDATE SERVERDATA
client.on('guildDelete', guild => {
    con.query(`SELECT * FROM serverstats WHERE guildid = ${guild.id}`, (err, rows) => {
        try {
            sql = `UPDATE serverstats SET prefix = "$" WHERE guildid = "${guild.id}"`
            con.query(sql, rows);
        } catch (error) {
            return
        }
    })
});

client.on("messageCreate", async message => {

    //BOT
    if(message.content == prefix+"bot"){
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
            "description": "__Developer:__ \n  [Masti#5516](https://discord.com/users/765574410119282749)\n\n__Github:__ [HAZO-Development](https://github.com/HAZO-Development)\n\n__Discord:__ [HAZO-Development](https://discord.gg/EfCJbFMX) \n\n**__Informations:__**",
            "color": "#00FFE3",
            "thumbnail": {
            "url": client.user.displayAvatarURL()
            },
            "fields": [
                {
                  "name": "🏓 Bot-Latency ",
                  "value": `${Date.now() - message.createdTimestamp}ms`,
                  "inline": true
                },
                {
                  "name": "🏓 API-Latency ",
                  "value": `${Math.round(client.ws.ping)}ms`,
                  "inline": true
                },
                {
                  "name": "<:red_circle:847468411859763270> Uptime ",
                  "value": uptime,
                }
            ]
        };
        message.reply({embeds: [embed]})
    }

    //BOT - PING
    if(message.mentions.users.has(client.user.id) && !message.author.bot) {
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
            "description": "__Developer:__ \n  [Masti#5516](https://discord.com/users/765574410119282749)\n \n__Github:__ [HAZO-Development](https://github.com/HAZO-Development)\n\n__Discord:__ [HAZO-Development](https://discord.gg/EfCJbFMX) \n\n**__Informations:__**",
            "color": "#00FFE3",
            "thumbnail": {
                "url": client.user.displayAvatarURL()
        },
        "fields": [
            {
              "name": "🏓 Bot-Latency ",
              "value": `${Date.now() - message.createdTimestamp}ms`,
              "inline": true
            },
            {
              "name": "🏓 API-Latency ",
              "value": `${Math.round(client.ws.ping)}ms`,
              "inline": true
            },
            {
              "name": "<:red_circle:847468411859763270> Uptime ",
              "value": uptime,
            }
        ]
    };
    message.reply({embeds: [embed]})
    }

})


//TOKEN
client.login('ODg4NjY5NTg4MzQxMDI2ODI2.YUWEDA.H8kdhhvXnI7aiKfgf-ZABPp7yX8')

//Login
client.on("ready", () => {
    console.log(`Angemeldet als '${client.user.tag}'! Version -> ` + version)

    const startup = new Discord.MessageEmbed()
    startup.setTitle(`${client.user.username} | Log`)
    startup.setThumbnail(client.user.displayAvatarURL())
    startup.setColor(`${embedcolor}`)
    startup.setDescription(Date())
    startup.setFooter(client.user.username, client.user.displayAvatarURL())
    startup.setTimestamp()
    //client.channels.cache.get(`888670575646625823`).send({embeds: [startup]});
});