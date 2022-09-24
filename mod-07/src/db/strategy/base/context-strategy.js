const ICrud = require('./../interface/icrud');

class ContextStrategy extends ICrud {
	constructor(strategy) {
		super();
		this._database = strategy;
	}

	create(item) {
		this._database.create(item);
	}

	find(query) {
		this._database.find(query);
	}

	update(id, item) {
		this._database.update(id, item);
	}

	delete(id) {
		this._database.delete(id);
	}

	isConnected() {
		return this._database.isConnected();
	}
}

module.exports = ContextStrategy;