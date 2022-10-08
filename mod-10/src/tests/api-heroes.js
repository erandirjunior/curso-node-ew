const assert = require('assert');
const api = require('./../api');
let app = {};

describe.only('Api Routes', function() {
	this.beforeAll(async () => {
		app = await api;
	});

	it('List /heroes', async () => {
		const result = await app.inject({
			method: 'GET',
			url: '/heroes'
		});

		// O retorno vem como string
		// Foi necessário converter para json
		const data = JSON.parse(result.payload);
		
		const statusCode = result.statusCode;
		
		assert.deepEqual(statusCode, 200);
		assert.ok(Array.isArray(data));
	});

	it('List /heroes -> must return 3 registers', async () => {
		const limit = 3;
		const result = await app.inject({
			method: 'GET',
			url: `/heroes?skip=0&limit=${limit}`
		});

		// O retorno vem como string
		// Foi necessário converter para json
		const data = JSON.parse(result.payload);

		const statusCode = result.statusCode;
		
		assert.deepEqual(statusCode, 200);
		assert.ok(data.length === limit);
	});

	it('List /heroes -> must return error', async () => {
		const limit = 3
		const result = await app.inject({
			method: 'GET',
			url: `/heroes?skip=0a&limit=${limit}`
		});
		const statusCode = result.statusCode;
		assert.deepEqual(statusCode, 500);
	});

	it('List /heroes -> must return only data with specific name', async () => {
		const name = 'Spider-Man'
		const result = await app.inject({
			method: 'GET',
			url: `/heroes?name=${name}`
		});


		const data = JSON.parse(result.payload);
		const statusCode = result.statusCode;

		assert.deepEqual(statusCode, 200);

		assert.ok(data.length === 2);
	});
});