console.clear();

const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright } = require('chalk');
const Discord = require("discord.js");
const Client = require("./structures/client.js");
const client = new Client();
const mysql = require('mysql');

const config = require("./data/config.json");

var con = mysql.createConnection({
    host: `${config.mysql.host}`,
    port: `${config.mysql.port}`,
    user: `${config.mysql.user}`,
    password: `${config.mysql.password}`,
    database: `${config.mysql.database}`,
    insecureAuth: true,
    multipleStatements: true
});
  
con.connect(err => {

    if(err) {
        console.log(red(`[ERROR] Can't connect to database!`));
        process.exit()
    }else {
        console.log(greenBright('[DB] Successful connected to database!'))
    }
})

client.start(config.token);