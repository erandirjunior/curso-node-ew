const ICrud = require('./../interface/icrud');
const Mongoose = require('mongoose');
const STATUS = {
	0: 'Disconnected',
	1: 'Connected',
	2: 'Connecting',
	3: 'Disconnecting',
	4: 'Invalid Credentials'
}

class Mongo extends ICrud {
	constructor(connection, schema) {
		super();
		this._connection = connection;
		this._schema = schema;
	}

	static connect() {
		// O endereço de connexão com o banco, foi conseguido por meio do docker inspec no container do mongo
		// e usar o endereço gateway
		// outra possibilidade é rodar o docker inspect no container do projeto
		Mongoose.connect('mongodb://erandirjunior:erandirjunior@172.22.0.1:27017/heroes',
			{ useNewUrlParser: true },
			function (error) {
				if (error) {
					console.error('Connection failed:', error);
				}
			}
		);

		const connection = Mongoose.connection;
		connection.once('open', () => console.log('Database running'));
		return connection;
	}

	async isConnected() {
		const state = STATUS[this._connection.readyState];
		
		if (state === STATUS[1]) {
			return state;
		}

		if (state !== STATUS[2]) {
			return state;
		}

		await new Promise(resolve => {
				setTimeout(resolve, 1000)
			});

		return STATUS[this._connection.readyState];
	}

	create(item) {
		return this._schema.create(item);
	}

	find(query, skip = 0, limit = 10) {
		return this._schema.find(query).skip(skip).limit(limit);
	}

	update(id, item) {
		return this._schema.updateOne({_id: id}, {$set: item});
	}

	delete(id) {
		const query = id ? {_id: id} : {}
		return this._schema.deleteMany(query);
	}
}

module.exports = Mongo;