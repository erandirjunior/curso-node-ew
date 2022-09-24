const assert = require('assert');
const Postgres = require('./../db/strategy/postgres');
const Context = require('./../db/strategy/base/context-strategy');
const context = new Context(new Postgres());
const MOCK_HERO_REGISTER = {
	name: 'Spider-Man',
	power: 'Agility'
};
const MOCK_HERO_UPDATER = {
	name: 'HULK',
	power: 'Force'
};

describe('Postgres Strategy', function() {
	this.timeout(Infinity);

	this.beforeAll(async () => {
		await context.delete();
	});

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

	it('Update', async () => {
		const [result] = await context.find({ name: MOCK_HERO_REGISTER.name });
		const heroUpdate = {
			...result,
			...MOCK_HERO_UPDATER
		};
		
		const [response] = await context.update(result.id, heroUpdate);
		const [hero] = await context.find({id: result.id});
		delete hero.id;
		
		assert.deepEqual(response, 1);
		assert.deepEqual(hero, MOCK_HERO_UPDATER)
	});

	it('Delete', async () => {
		const [item] = await context.find({ name: MOCK_HERO_UPDATER.name });
		const result = await context.delete(item.id);
		assert.deepEqual(result, 1);
	});
});