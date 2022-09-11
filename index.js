console.clear();

const Client = require("./structures/client.js");
const client = new Client();
const config = require("./data/config.json");
const { yellow } = require('chalk');

const mysql = require('mysql2');
const util = require('util');

var con = mysql.createPool({
    host: `${config.mysql.host}`,
    port: `${config.mysql.port}`,
    user: `${config.mysql.user}`,
    password: `${config.mysql.password}`,
    database: `${config.mysql.database}`
});

const dbquery = util.promisify(con.query).bind(con);

dbquery(`CREATE TABLE IF NOT EXISTS users (
    id INT(10) NOT NULL AUTO_INCREMENT,
    userid VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
    PRIMARY KEY (id) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=2
;`)

dbquery(`CREATE TABLE IF NOT EXISTS rounds (
    id INT(10) NOT NULL AUTO_INCREMENT,
    guildid VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
    channelid VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
    number VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
    maxnumber VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
    price VARCHAR(50) NOT NULL DEFAULT 'none' COLLATE 'utf8mb4_general_ci',
    trys INT(10) NOT NULL DEFAULT '0',
    PRIMARY KEY (id) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;`)

dbquery(`CREATE TABLE IF NOT EXISTS guilds (
    id INT(10) NOT NULL AUTO_INCREMENT,
    guildid VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
    prefix VARCHAR(50) NOT NULL DEFAULT '$' COLLATE 'utf8mb4_general_ci',
    rounds INT(10) NOT NULL DEFAULT '0',
    PRIMARY KEY (id) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;`
)

process.on('uncaughtException', function (err) {
  console.error(err);
});

client.start(config.bot.token);