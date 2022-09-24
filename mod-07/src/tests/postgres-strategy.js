const assert = require('assert');
const Postgres = require('./../db/strategy/postgres');
const Context = require('./../db/strategy/base/context-strategy');
const context = new Context(new Postgres());
const MOCK_HERO_REGISTER = {
	name: 'Spider-Man',
	power: 'Agility'
};

describe('Postgres Strategy', function() {
	this.timeout(Infinity);

	it('Check connection', async () => {
		const result = await context.isConnected();
		assert.equal(result, true);
	});

	it('Create', async () => {
		const result = await context.create(MOCK_HERO_REGISTER);
		delete result.id;
		assert.deepEqual(result, MOCK_HERO_REGISTER);
	});

	it('Find', async () => {
		const [result] = await context.find({ name: MOCK_HERO_REGISTER.name });
		delete result.id;
		assert.deepEqual(result, MOCK_HERO_REGISTER);
	});
});