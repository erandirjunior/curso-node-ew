const Hapi = require('@hapi/hapi');
const Context = require('./db/strategy/base/context-strategy');
const MongoDB = require('./db/strategy/mongodb/mongo');
const HeroSchema = require('./db/strategy/mongodb/schemas/heroes-schema');

const app = new Hapi.Server({
	port: 8000
});

async function main() {
	const connection = MongoDB.connect();
	const mongo = new MongoDB(connection, HeroSchema);
	const context = new Context(mongo);

	app.route([
		{
			path: '/heroes',
			method: 'GET',
			handler: (request, head) => {
				return context.find();
			}
		}
	]);
	await app.start();
	console.log('Server running in port:', app.info.port);
}

main();