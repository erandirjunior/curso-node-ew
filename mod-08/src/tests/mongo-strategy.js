const assert = require('assert');
const MongoDB = require('./../db/strategy/mongo');
const Context = require('./../db/strategy/base/context-strategy');
const context = new Context(new MongoDB);
const MOCK_HERO_REGISTER = {
	name: 'Spider-Man',
	power: 'Agility'
};

describe('Mongo Strategy', function() {
	it('Check connection', async () => {
		const result = await context.isConnected();
		assert.equal(result, 'Connected');
	});

	it('Register', async () => {
		const {name, power} = await context.create(MOCK_HERO_REGISTER);

		assert.deepEqual({name, power}, MOCK_HERO_REGISTER);
	});
});