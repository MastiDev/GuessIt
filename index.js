console.clear();

const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright } = require('chalk');
const Discord = require("discord.js");
const Client = require("./Structures/Client.js");
const client = new Client();
const mysql = require('mysql');

const config = require("./Data/config.json");

var con = mysql.createConnection({multipleStatements: true,
    host: `${config.conhost}`,
    user: `${config.conuser}`,
    password: `${config.conpassword}`,
    database: `${config.condatabase}`
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