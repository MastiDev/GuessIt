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

module.exports = new Event("interactionCreate", (client, interaction) => {
  try {
    
    

  } catch (error) {
    return console.log(red(`[ERROR] In the event interactionCreate an error has occurred -> ${error}`))
  }
});
