const Event = require("../structures/event.js");
const config = require("../data/config.json");
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

module.exports = new Event("guildCreate", async(client, guild) => {
    try {
        await dbquery(`INSERT IGNORE INTO guilds (guildid) VALUES ('${guild.id}')`);
    } catch (error) {
        console.log(error);
    }
});