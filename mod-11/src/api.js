const Hapi = require('@hapi/hapi');
const Context = require('./db/strategy/base/context-strategy');
const MongoDB = require('./db/strategy/mongodb/mongo');
const HeroSchema = require('./db/strategy/mongodb/schemas/heroes-schema');
const HeroRoutes = require('./routes/hero-routes');
const Vision = require('@hapi/vision');
const Inert = require('@hapi/inert');
const HapiSwagger = require('hapi-swagger');
const app = new Hapi.Server({
	port: 8000
});


function mapRoutes(instance, methods) {
	return methods.map(method => instance[method]());
}

async function main() {
	const connection = MongoDB.connect();
	const mongo = new MongoDB(connection, HeroSchema);
	const context = new Context(mongo);
	const heroRoutes = new HeroRoutes(context);

	const swaggerOptions = {
		info: {
			title: 'API HERO',
			version: 'v1.0',
		}
	};

	await app.register([
		Inert,
		Vision,
		{
			plugin: HapiSwagger,
			options: swaggerOptions
		}
	]);

	app.route(mapRoutes(heroRoutes, HeroRoutes.methods()));
	await app.start();
	console.log('Server running in port:', app.info.port);

	return app;
}

module.exports = main();