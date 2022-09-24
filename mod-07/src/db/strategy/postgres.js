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

	async find(where = {}) {
		return await this._heroes.findAll({where, raw: true})
	}

	async update(id, data) {
		delete data.id;
		return await this._heroes.update(data, {where: {id}})

	}

	async delete(id) {
		const query = id ? {id} : {};
		return this._heroes.destroy({where: query});
	}
}

module.exports = Postgres;