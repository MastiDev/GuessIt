const Event = require("../Structures/Event.js");
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright } = require('chalk');

module.exports = new Event("interactionCreate", (client, interaction) => {
  try {
    
    

  } catch (error) {
    return console.log(red(`[ERROR] In the event interactionCreate an error has occurred -> ${error}`))
  }
});
