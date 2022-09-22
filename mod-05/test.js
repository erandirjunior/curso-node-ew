const {
	deepEqual,
	ok
} = require('assert');
const database = require('./database');
const DEFAULT_ITEM_REGISTER = {name: 'Flash', power: 'Speed', id: 1};

describe('Handler heroes', () => {
	before(async () => {
		await database.create(DEFAULT_ITEM_REGISTER);
	});

	it('Must search hero', async () => {
		const expected = DEFAULT_ITEM_REGISTER;
		const [result] = await database.find(expected.id);
		deepEqual(result, expected);
	});

	it('Must register a hero', async () => {
		const expected = {
			...DEFAULT_ITEM_REGISTER,
			id: 2
		};
		const result = await database.create(expected);
		const [actual] = await database.find(expected.id);
		deepEqual(actual, expected);
	});
});