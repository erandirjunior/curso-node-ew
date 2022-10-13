const assert = require('assert');
const api = require('./../api');
const Context = require('./../db/strategy/base/context-strategy');
const Postgres = require('./../db/strategy/postgres/postgres');
const Schema = require('./../db/strategy/postgres/schemas/user');
let app = {};
let context = {};
const USER = {
	username: 'erandirjunior',
	password: 'erandirjunior12'
};

const USER_DB = {
	...USER,
	password: '$2b$04$v0MI/VdiL.lYIDu9zT98Xumhbb/qw/cXuLwYbOPZeA2qgqT8LZ9SG'
};

describe.only('Auth test', function() {
	this.beforeAll(async () => {
		app = await api;
		const connection = Postgres.connect();
		const schema = await Postgres.defineModel(connection, Schema);
		context = new Context(new Postgres(connection, schema));
		await context.update(null, USER_DB, true);
	});

	it('Must get Token', async () => {
		const result = await app.inject({
			method: 'POST',
			url: '/login',
			payload: USER
		});

		const statusCode = result.statusCode;
		const data = JSON.parse(result.payload);

		assert.deepEqual(statusCode, 200);
		assert.ok(data.token.length > 10);
	});

	it('Unauthorized', async () => {
		const result = await app.inject({
			method: 'POST',
			url: '/login',
			payload: {
				...USER,
				password: '123'
			}
		});

		const statusCode = result.statusCode;
		const data = JSON.parse(result.payload);

		assert.deepEqual(statusCode, 401);
	});
});