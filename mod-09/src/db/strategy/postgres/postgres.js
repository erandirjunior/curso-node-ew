const ICrud = require('./../interface/icrud');
const Sequelize = require('sequelize');

class Postgres extends ICrud {
	constructor(connection, schema) {
		super();
		this._connection = connection;
		this._schema = schema;
	}

	static connect() {
		return new Sequelize(
			'heroes',
			'root',
			'root',
			{
				host: 'db',
				dialect: 'postgres',
				quoteIdentifiers: false,
				operatorAliases: false,
				logging: false
			}
		);
	}

	static async defineModel(connection, schema) {
		const model = connection.define(schema.name, schema.schema, schema.options);
		await model.sync();
		return model;
	}

	async isConnected() {
		try {
			await this._connection.authenticate();
			return true;
		} catch (e) {
			console.error('Fatal Error: ', e);
			return false;
		}
	}

	async create(item) {
		const { dataValues } = await this._schema.create(item);
		return dataValues;
	}

	async find(where = {}) {
		return await this._schema.findAll({where, raw: true})
	}

	async update(id, data) {
		delete data.id;
		return await this._schema.update(data, {where: {id}})

	}

	async delete(id) {
		const query = id ? {id} : {};
		return this._schema.destroy({where: query});
	}
}

module.exports = Postgres;