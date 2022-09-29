const assert = require('assert');
const MongoDB = require('./../db/strategy/mongo');
const Context = require('./../db/strategy/base/context-strategy');
const context = new Context(new MongoDB);
const MOCK_HERO_REGISTER = {
	name: 'Spider-Man',
	power: 'Agility'
};
const MOCK_HERO_UPDATER = {
	name: 'HULK',
	power: 'Force'
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

	it('Find', async () => {
		const [{name, power}] = await context.find({name: MOCK_HERO_REGISTER.name});
		assert.deepEqual({name, power}, MOCK_HERO_REGISTER);
	});

	it('Update', async () => {
		const [hero] = await context.find({name: MOCK_HERO_REGISTER.name}, 0, 1);
		const result = await context.update(hero._id, MOCK_HERO_UPDATER);
		assert.deepEqual(result.modifiedCount, 1);
	});
});