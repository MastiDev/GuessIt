import { Client, GatewayIntentBits, Collection } from 'discord.js';
import Enmap from 'enmap';
import config from './data/config.js';

import loadEvents from './handlers/events.js';
import loadInteractions from './handlers/handler.js';
import registerApplicationCommands from './handlers/application.js';
import { loadCronJobs } from './handlers/cronjobs.js';

declare module 'discord.js' {
	interface Client {
		interaction: Collection<string, object>;
		Eguilds: Enmap;
		Eround: Enmap;
	}
}

const client = new Client({
	intents: [
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.DirectMessages,
	],
	allowedMentions: {
		repliedUser: false // This will allow the bot to ping the user who used the command
	}
});

await client.login(config.bot.token);

client.interaction = new Collection();
client.Eguilds = new Enmap({name: 'guilds', dataDir: './dist/data'});
client.Eround = new Enmap({name: 'rounds', dataDir: './dist/data'});

await loadEvents(client);
await loadInteractions('./dist/interactions', client);
await registerApplicationCommands(client);
await loadCronJobs('./dist/cron', client);

process.on('uncaughtException', function (err) {
	console.error(err);
});

// TODO: Update all Embed texts