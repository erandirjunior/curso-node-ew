const {
	deepEqual,
	ok
} = require('assert');
const database = require('./database');
const DEFAULT_ITEM_REGISTER = {name: 'Flash', power: 'Speed', id: 1};
const DEFAULT_ITEM_UPDATER = {name: 'Batman', power: 'Money', id: 2};

describe('Handler heroes', () => {
	before(async () => {
		await database.delete();
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

	it('Must delete a hero by id', async () => {
		const expected = true;
		const result = await database.delete(DEFAULT_ITEM_REGISTER.id);
		deepEqual(result, expected);
	});

	it('Must update hero by id', async () => {
		const expected = DEFAULT_ITEM_UPDATER;
		await database.update(expected.id, expected);
		const [result] = await database.find(expected.id); 
		deepEqual(result, expected);
	});
});