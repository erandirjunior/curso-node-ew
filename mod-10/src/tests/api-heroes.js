const assert = require('assert');
const api = require('./../api');
let app = {};
const MOCK_HERO_REGISTER = {
	name: 'Batman',
	power: 'Money'
};

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
		assert.deepEqual(statusCode, 400);
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

	it('Create /heroes', async () => {
		const name = 'Spider-Man'
		const result = await app.inject({
			method: 'POST',
			url: `/heroes`,
			payload: MOCK_HERO_REGISTER
		});


		const {message, id} = JSON.parse(result.payload);
		const statusCode = result.statusCode;

		assert.deepEqual(message, 'Hero registered with success!');
		assert.notStrictEqual(id, undefined)
		assert.ok(statusCode === 200);
	});

	it('Update /heroes', async () => {
		const name = 'Batman'
		let result = await app.inject({
			method: 'POST',
			url: `/heroes`,
			payload: MOCK_HERO_REGISTER
		});

		const {id} = JSON.parse(result.payload);

		const expected = {
			power: 'Force'
		};

		result = await app.inject({
			method: 'PATCH',
			url: `/heroes/${id}`,
			payload: expected
		});

		const statusCode = result.statusCode;
		const data = JSON.parse(result.payload);

		assert.ok(statusCode === 200);
		assert.deepEqual(data.message, 'Hero updated!');
	});

	it('Update fail /heroes', async () => {
		const expected = {
			power: 'Force'
		};

		const id = '6340aa5e8a48ab9c9ab49caa';
		result = await app.inject({
			method: 'PATCH',
			url: `/heroes/${id}`,
			payload: expected
		});

		const statusCode = result.statusCode;
		const data = JSON.parse(result.payload);

		assert.ok(statusCode === 200);
		assert.deepEqual(data.message, 'Update hero failed!');
	});
});