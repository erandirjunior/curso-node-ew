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
			process.env.POSTGRES_DB,
			process.env.POSTGRES_USER,
			process.env.POSTGRES_PASSWORD,
			{
				host: process.env.POSTGRES_HOST,
				dialect: 'postgres',
				quoteIdentifiers: false,
				operatorAliases: false,
				logging: false,
				ssl: Boolean(process.env.SSL_DB),
				dialectOptions: {
					ssl: Boolean(process.env.SSL_DB)
				}
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

	async update(id, data, upsert = false) {
		const fn = upsert ? 'upsert' : 'update';
		delete data.id;
		return await this._schema[fn](data, {where: {id}})

	}

	async delete(id) {
		const query = id ? {id} : {};
		return this._schema.destroy({where: query});
	}
}

module.exports = Postgres;