const isRailway = require('is-railway');
let auth = require('./local').token()
const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const clientId = '903695940211318785';

const guildId = '585180490202349578'//'';843954443845238864

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(auth);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.\n' +  commands.map(c => c.name).join('\n'));
	} catch (error) {
		console.error(error);
	}
})();

// rest.get(Routes.applicationGuildCommands(clientId, guildId))
//     .then(data => {
//         const promises = [];
//         for (const command of data) {
//             const deleteUrl = `${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`;
//             promises.push(rest.delete(deleteUrl));
//         }
//         return Promise.all(promises);
//     });
// rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
//     .then(() => {
//         console.log('Successfully registered application commands.\n', commands.map(c => c.name).join('\n'));
//         return
//     })
//     .catch(console.error);
/*
rest.get(Routes.applicationCommands(clientId, guildId))
    .then(data => {
        const promises = [];
        for (const command of data) {
            const deleteUrl = `${Routes.applicationCommands}/${command.id}`;
            promises.push(rest.delete(deleteUrl));
        }
        return Promise.all(promises);
    });

rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log('Successfully globally registered application commands.'))
    .catch(console.error)

*/
