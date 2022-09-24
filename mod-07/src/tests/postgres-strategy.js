const assert = require('assert');
const Postgres = require('./../db/strategy/postgres');
const Context = require('./../db/strategy/base/context-strategy');
const context = new Context(new Postgres());

describe('Postgres Strategy', function() {
	this.timeout(Infinity);

	it('Check connection', async () => {
		const result = await context.isConnected();
		assert.equal(result, true);
	});
});