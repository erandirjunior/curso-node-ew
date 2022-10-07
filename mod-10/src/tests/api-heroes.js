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
});