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

module.exports = new Event("guildCreate", async(client) => {
    try {
        await dbquery(`INSERT IGNORE INTO guilds (id, guildid) VALUES (NULL, '${message.guild.id}')`);
    } catch (error) {
        return console.log(red(`[EVENT] In the event ready an error has occurred -> ${error}`))
    }
});