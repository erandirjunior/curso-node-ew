const {
	deepEqual,
	ok
} = require('assert');
const database = require('./database');
const DEFAULT_ITEM_REGISTER = {name: 'Flash', power: 'Speed', id: 1};

describe('Handler heroes', () => {
	it('Must search hero', async () => {
		const expected = DEFAULT_ITEM_REGISTER;
		const [result] = await database.find(expected.id);
		deepEqual(result, expected);
	});

	/*it('Must register a hero', async () => {
		const expected = DEFAULT_ITEM_REGISTER;

		ok(null, expected);
	});*/
});