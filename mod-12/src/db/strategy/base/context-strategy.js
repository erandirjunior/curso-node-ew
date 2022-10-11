const ICrud = require('./../interface/icrud');

class ContextStrategy extends ICrud {
	constructor(strategy) {
		super();
		this._database = strategy;
	}

	create(item) {
		return this._database.create(item);
	}

	find(query, skip, limit) {
		return this._database.find(query, skip, limit);
	}

	update(id, item) {
		return this._database.update(id, item);
	}

	delete(id) {
		return this._database.delete(id);
	}

	isConnected() {
		return this._database.isConnected();
	}
}

module.exports = ContextStrategy;