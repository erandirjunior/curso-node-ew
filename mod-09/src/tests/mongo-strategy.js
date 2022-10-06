const assert = require('assert');
const MongoDB = require('./../db/strategy/mongodb/mongo');
const Context = require('./../db/strategy/base/context-strategy');
const HeroSchema = require('./../db/strategy/mongodb/schemas/heroes-schema');
let context = {};

const MOCK_HERO_REGISTER = {
	name: 'Spider-Man',
	power: 'Agility'
};
const MOCK_HERO_UPDATER = {
	name: 'HULK',
	power: 'Force'
};

describe('Mongo Strategy', function() {
	this.beforeAll(async () => {
		const connection = MongoDB.connect();
		context = new Context(new MongoDB(connection, HeroSchema));
		await context.delete();
	});

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

	it('Delete', async () => {
		const [hero] = await context.find({name: MOCK_HERO_UPDATER.name}, 0, 1);
		const result = await context.delete(hero._id);
		assert.deepEqual(result.deletedCount, 1);
	});
});