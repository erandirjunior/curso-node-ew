const ICrud = require('./interface/icrud');

class Mongo extends ICrud {
	constructor() {
		super();
	}

	create(item) {
		console.log('Item created in mongodb')
	}
}

module.exports = Mongo;