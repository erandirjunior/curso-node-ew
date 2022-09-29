const Mongoose = require('mongoose');

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
const model = Mongoose.model('heroes', heroesSchema);

async function main() {
	const resultRegister = await model.create({
		name: 'Batman',
		power: 'Money'
	});
	console.log('Result register', resultRegister);

	const items = await model.find();
	console.log('items', items)
}

main();