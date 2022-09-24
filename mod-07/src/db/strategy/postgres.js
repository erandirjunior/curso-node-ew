const ICrud = require('./interface/icrud');
const Sequelize = require('sequelize');

class Postgres extends ICrud {
	constructor() {
		super();
		this._driver = null;
		this._heroes = null;
		this._connect();
		this._defineModel();
	}

	_connect() {
		this._driver = new Sequelize(
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
	}

	async _defineModel() {
		this._heroes = this._driver.define('heroes', {
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

		await this._heroes.sync();
	}

	async isConnected() {
		try {
			await this._driver.authenticate();
			return true;
		} catch (e) {
			console.error('Fatal Error: ', e);
			return false;
		}
	}

	async create(item) {
		const { dataValues } = await this._heroes.create(item);
		return dataValues;
	}
}

module.exports = Postgres;