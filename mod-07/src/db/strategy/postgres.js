const ICrud = require('./interface/icrud');

class Postgres extends ICrud {
	constructor() {
		super();
	}

	create(item) {
		console.log('Item created in postgres')
	}

	isConnected() {
	}
}

module.exports = Postgres;