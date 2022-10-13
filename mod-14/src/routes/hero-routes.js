const BaseRoute = require('./base/base-route');
const Joi = require('joi');
const Boom = require('@hapi/boom');
const failAction = (request, h, err) => {
    request.log('error', err);
    throw err;
};

const headers = Joi.object({
	authorization: Joi.string().required()
}).unknown();

module.exports = class HeroRoutes extends BaseRoute {
	constructor(context) {
		super();
		this.context = context;
	}

	find() {
		return {
			path: '/heroes',
			method: 'GET',
			options: {
				tags: ['api'],
				description: 'Must heroes list',
        		notes: 'Can paginate results and filter by name',
				validate: {
					// payload -> body
					// header -> header
					// params -> :id
					// query -> ?limit=10
					query: Joi.object({
						skip: Joi.number().integer().default(0),
						limit: Joi.number().integer().default(10),
						name: Joi.string().min(3).max(100)
					}),
					headers,
					failAction
				}
			},
			handler: (request, headers) => {
				try {
					const {skip, limit, name} = request.query;
					const query = name ? {
						name: {$regex: `.*${name}*.`}
					} : {};

					/*if (skip && !/^\d+$/.test(skip)) {
						throw Error('Skip type is not accepted');
					}

					if (limit && !/^\d+$/.test(limit)) {
						throw Error('Limit type is not accepted');
					}*/

					return this.context.find(query, skip, limit);
				} catch (e) {
					console.log(e);
					return Boom.internal();
				}
			}
		}
	}

	create() {
		return {
			path: '/heroes',
			method: 'POST',
			options: {
				tags: ['api'],
				description: 'Must register a new hero',
        		notes: 'Can register a new hero by name and power',
				validate: {
					payload: Joi.object({
						name: Joi.string().min(3).max(100).required(),
						power: Joi.string().min(3).max(100).required()
					}),
					headers,
					failAction
				}
			},
			handler: async (request, headers) => {
				try {
					const {name, power} = request.payload;
					const result = await this.context.create({name, power});
					return {
						message: 'Hero registered with success!',
						id: result._id
					};
				} catch (e) {
					console.log(e);
					return Boom.internal();
				}
			}
		}
	}

	update() {
		return {
			path: '/heroes/{id}',
			method: 'PATCH',
			options: {
				tags: ['api'],
				description: 'Must update a hero by id',
        		notes: 'Can update name and power of the hero by id',
				validate: {
					params: Joi.object({
						id: Joi.required()
					}),
					payload: Joi.object({
						name: Joi.string().min(3).max(100),
						power: Joi.string().min(3).max(100)
					}),
					headers,
					failAction
				}
			},
			handler: async (req, h) => {
				try {
					const {id} = req.params;
					const {payload} = req;
					const dataString = JSON.stringify(payload);
					const data = JSON.parse(dataString);
					const result = await this.context.update(id, data);

					if (result.modifiedCount !== 1) {
						return {
							message: 'Update hero failed!'
						};
					}

					return {
						message: 'Hero updated!'
					};
				} catch (e) {
					console.log(e)
					return Boom.internal();
				}
			}
		}
	}

	delete() {
		return {
			path: '/heroes/{id}',
			method: 'DELETE',
			options: {
				tags: ['api'],
				description: 'Must delete a hero by id',
        		notes: 'Can delete a hero by id',
				validate: {
					params: Joi.object({
						id: Joi.required()
					}),
					headers,
					failAction
				}
			},
			handler: async (req, h) => {
				try {
					const {id} = req.params;
					const result = await this.context.delete(id);

					if (result.deletedCount !== 1) {
						return {
							message: 'Delete hero failed!'
						};
					}

					return {
						message: 'Hero deleted!'
					};
				} catch (e) {
					console.log(e)
					return Boom.internal();
				}
			}
		};
	}

	deleteAll() {
		return {
			path: '/heroes',
			method: 'DELETE',
			options: {
				validate: {
					headers,
				},
				tags: ['api'],
				description: 'Must delete all heroes',
        		notes: 'Can delete all heroes',
				
			},
			handler: async (req, h) => {
				try {
					const result = await this.context.delete();

					return {
						message: 'Heroes deleted!'
					};
				} catch (e) {
					console.log(e)
					return Boom.internal();
				}
			}
		};
	}
}