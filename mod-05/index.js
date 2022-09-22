const Commander = require('commander');
const database = require('./database');
const Hero = require('./hero');

async function main() {
	try {

		Commander
			.version('v1')
			.option('-n, --name [value]', "Hero's name")
			.option('-p, --power [value]', "Hero's power")
			.option('--id [id]', 'Hero Id')
			.option('-c, --create', 'Create a hero')
			.option('-f, --find', 'Find heroes')
			.option('-d, --delete', 'Delete a hero by id')
			.option('-u, --update', 'Update a hero by id')
			.parse(process.argv);

		const options = Commander.opts();
		const hero = new Hero(options);

		if (options.create) {
			const result = await database.create(hero);
			if (!result) {
				console.error('Hero not save!');
				return;
			}
			console.log('Hero created!');
		}

		if (options.find) {
			const result = await database.find(hero.id);
			console.log(result);
		}

		if (options.delete) {
			const result = await database.delete(hero.id);
			if (!result) {
				console.error('Hero not deleted!');
				return;
			}
			console.log('Hero deleted!');
		}

		if (options.update) {
			const result = await database.update(hero.id, hero)
			if (!result) {
				console.erro('Hero not updated!');
				return;
			}

			console.log('Hero updated');

		}
	} catch (e) {
		console.error(e);
	}
}

main();