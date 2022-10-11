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
const AuthRoutes = require('./routes/auth-routes');
const JWT_SECRET = 'My@Secre##t';
const HapiJWT = require('hapi-auth-jwt2');

function mapRoutes(instance, methods) {
	return methods.map(method => instance[method]());
}

async function main() {
	const connection = MongoDB.connect();
	const mongo = new MongoDB(connection, HeroSchema);
	const context = new Context(mongo);
	const heroRoutes = new HeroRoutes(context);
	const authRoutes = new AuthRoutes(JWT_SECRET);

	const swaggerOptions = {
		info: {
			title: 'API HERO',
			version: 'v1.0',
		}
	};

	await app.register([
		Inert,
		Vision,
		HapiJWT,
		{
			plugin: HapiSwagger,
			options: swaggerOptions
		}
	]);

	app.auth.strategy('jwt', 'jwt', {
		key: JWT_SECRET,
		// options: {
		// 	expireIn: 20
		// }
		validate: (data, req) => {
			return {
				isValid: true
			}
		}
	});

	app.auth.default('jwt');

	app.route([
		...mapRoutes(heroRoutes, HeroRoutes.methods()),
		...mapRoutes(authRoutes, AuthRoutes.methods())
	]);
	await app.start();
	console.log('Server running in port:', app.info.port);

	return app;
}

module.exports = main();