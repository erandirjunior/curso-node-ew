const ICrud = require('./interface/icrud');
const Mongoose = require('mongoose');
const STATUS = {
	0: 'Disconnected',
	1: 'Connected',
	2: 'Connecting',
	3: 'Disconnecting',
	4: 'Invalid Credentials'
}

class Mongo extends ICrud {
	constructor() {
		super();
		this._connection = null;
		this._heroes = null;
		this._connect();
		this._defineModel();
	}

	_connect() {
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

		this._connection = Mongoose.connection;
		this._connection.once('open', () => console.log('Database running'));
		
		// Exibe o status de conexao
		/*const connectionState = {
		  0: 'Disconnected',
		  1: 'Connected',
		  2: 'Connecting',
		  3: 'Disconnecting',
		  4: 'Invalid Credentials'
		}

		setTimeout(() => {
			const state = connection.readyState;
			console.log('state', state)
		}, 1000);*/
	}

	_defineModel() {
		const heroesSchema = new Mongoose.Schema({
			name: {
				type: String,
				required: true
			},
			power: {
				type: String,
				required: true
			},
			insertedAt: {
				type: Date,
				default: new Date()
			}
		});
		this._heroes = Mongoose.model('heroes', heroesSchema);
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
		return this._heroes.create(item);
	}

	find(query, skip = 0, limit = 10) {
		return this._heroes.find(query).skip(skip).limit(limit);
	}

	update(id, item) {
		return this._heroes.updateOne({_id: id}, {$set: item});
	}

	delete(id) {
		const query = id ? {_id: id} : {}
		return this._heroes.deleteMany(query);
	}
}

module.exports = Mongo;