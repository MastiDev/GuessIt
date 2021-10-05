const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const Event = require("../Structures/Event.js");
const { version } = require('../package.json');
const config = require("../Data/config.json");
const { MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright } = require('chalk');
const talkedRecently = new Set();

module.exports = new Command({
	name: "create",
	description: "create",
	aliases: [],

	async run(message, args, con, serverstats, userstats, client) {
		try {

            if (talkedRecently.has(message.author.id)) return message.reply("Wait 10 seconds!");

            let channel = message.mentions.channels.first();
            if(!channel) return message.reply("You have to mention a channel!")
            int = id = channel.id

            if(args[2] === undefined) return message.reply("MAX NUMMER")
            if(isNaN(args[2])) message.reply("You have to enter a number!")    
            if(args[2] < 1) return message.reply("You really have no decency!")
            if(args[2] > 1000000) return message.reply("You really have no decency!")

            if(args[3] === undefined) console.log("test")
            if(args[3] === undefined) return message.reply("PREIS")

            con.query(`INSERT INTO rounds (id, guildid, channelid, number, price) VALUES (NULL, '${message.guild.id}', '${id}', '${getRandomInt(args[2])}', '${args.splice(3).join(" ")+" "}')`)

            message.reply(`Successfully added to the todo list!`)

            talkedRecently.add(message.author.id);
            setTimeout(() => {
              talkedRecently.delete(message.author.id);
            }, 10000);




            /*  
            switch(args[1]){
                case "list":
                    try {
                        con.query(`SELECT * FROM todo WHERE user = '${message.author.id}'`, (err, result) => {
                            var IDlist = [];
                            var CONTENTlist = [];
                            var DONElist = [];
                            result.forEach(function(row){
                                IDlist.push("\n"+row.id)
                                CONTENTlist.push("\n"+core.stringTruncate(row.content, 50))
                                DONElist.push("\n"+row.done.replace("false", "❌").replace("true", "✅"))
                            })
                            
                            const embed = new Discord.MessageEmbed()
                            .setColor('FFF013')
                            .setTitle('To-Do list')
                            .setDescription("\n")
                            .addField(`ID`, IDlist.toString(), true)
                            .addField(`TODO`, CONTENTlist.toString(), true)
                            .addField(`CHECKED`, DONElist.toString(), true)
                            message.reply({embeds: [embed]})
                            
                            })
                    } catch (error) {
                        core.sendERRLog(error,message,"883778273916633179")
                        if(error) throw error;
                    }
                    break;
                case "info":
                    try {
                        if(args[2] === undefined) return message.reply("Not enough arguments!")
                        con.query(`SELECT * FROM todo WHERE id = '${args[2]}'`, (err, result) => {
                            if(!result[0]) return message.reply("Could not find task!")
                            if(result[0].user != message.author.id) return message.reply("This is not your task!")
                            var uncheck = false;
                            switch (result[0].done.toString()) {
                                case "true":
                                    var uncheck = false;
                                    break;
                                case "false":
                                    var uncheck = true;
                                    break;
                            }
                            const row = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                .setStyle("SUCCESS")
                                .setLabel("Check")
                                .setCustomId("TDICheck"+result[0].id)
                                .setDisabled(result[0].done)
                                .setEmoji("✅"),
                                new MessageButton()
                                .setStyle("DANGER")
                                .setLabel("Uncheck")
                                .setCustomId("TDIUnCheck"+result[0].id)
                                .setDisabled(uncheck)
                                .setEmoji("✖"),
                                new MessageButton()
                                .setStyle("DANGER")
                                .setLabel("Remove")
                                .setCustomId("TDIRemove"+result[0].id)
                                .setEmoji("🚮")
                            )
                            const embed = new Discord.MessageEmbed()
                            .setColor('FFF013')
                            .setTitle('To-Do Info')
                            .setDescription("**TASK**\n"+result[0].content.toString())
                            .addField(`ID`, result[0].id.toString(), true)
                            .addField(`ADDED AT`, result[0].addedat.toString(), true)
                            .addField(`CHECKED`, result[0].done.toString().replace("false", "❌").replace("true", "✅"), true)
                            message.reply({embeds: [embed], /*components: [row]'*'/ })
                            
                            })
                    } catch (error) {
                        core.sendERRLog(error,message,"883778273916633179")
                        if(error) throw error;
                    }
                    break;
            }
        */


		} catch (error) {
			console.log(red(`[ERROR] In the command ${this.name} an error has occurred -> ${error}`))
		}
	}
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomArbitrary(max) {
    return Math.random() * (max - 1) + 1;
  }