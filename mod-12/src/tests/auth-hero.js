const assert = require('assert');
const api = require('./../api');
let app = {};

describe.only('Auth test', function() {
	this.beforeAll(async () => {
		app = await api;
	});

	it('Must get Token', async () => {
		const result = await app.inject({
			method: 'POST',
			url: '/login',
			payload: {
				username: 'erandirjunior',
				password: '123456'
			}
		});

		const statusCode = result.statusCode;
		const data = JSON.parse(result.payload);

		assert.deepEqual(statusCode, 200);
		assert.ok(data.token.length > 10);
	});
});