const Sequelize = require('sequelize');
const driver = new Sequelize(
	'heroes',
	'root',
	'root',
	{
		host: 'db',
		dialect: 'postgres',
		quoteIdentifiers: false,
		operatorAliases: false
	}
);

async function main() {
	const heroes = driver.define('heroes', {
		id: {
			type: Sequelize.INTEGER,
			required: true,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING,
			required: true
		},
		power: {
			type: Sequelize.STRING,
			required: true
		}
	}, {
		tableName: 'hero',
		freezeTableName: false,
		timestamps: false
	});

	await heroes.sync();

	// Insere um item no banco
	/*await heroes.create({
		name: 'Batman',
		power: 'Money'
	});*/

	// Lista todos os itens do banco em um formato legível
	let result = await heroes.findAll({ raw: true });
	console.log('result', result);

	// Lista todos os itens mas apenas determinado campo
	result = await heroes.findAll({ raw: true, attributes: ['name'] });
	console.log('result', result);
}

main();