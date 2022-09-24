class NotImplementedException extends Error {
	constructor() {
		super('Not implemented exception!');
	}
}

class ICrud {
	create(item) {
		throw new NotImplementedException();
	}

	find(query) {
		throw new NotImplementedException();
	}

	update(id, item) {
		throw new NotImplementedException();
	}

	delete(id) {
		throw new NotImplementedException();
	}
}

class MongoDb extends ICrud {
	constructor() {
		super();
	}

	create(item) {
		console.log('Item created in mongodb')
	}
}

class Postgres extends ICrud {
	constructor() {
		super();
	}

	create(item) {
		console.log('Item created in postgres')
	}
}

class Context {
	constructor(strategy) {
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
}

const contextMongoDB = new Context(new MongoDb());
contextMongoDB.create();

const contextPostgres = new Context(new Postgres());
contextPostgres.create();

// Throw exception
//contextMongoDB.find();