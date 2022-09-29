const assert = require('assert');
const MongoDB = require('./../db/strategy/mongo');
const Context = require('./../db/strategy/base/context-strategy');
const context = new Context(new MongoDB);

describe('Mongo Strategy', function() {
	it('Check connection', async () => {
		const result = await context.isConnected();
		assert.equal(result, 'Connected');
	});
});