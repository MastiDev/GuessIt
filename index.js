console.clear();

const Client = require("./structures/client.js");
const client = new Client();
const config = require("./data/config.json");
const { yellow } = require('chalk');

const mysql = require('mysql2');
const util = require('util');

process.on('uncaughtException', function (err) {
  console.error(err);
});

client.start(config.bot.token);