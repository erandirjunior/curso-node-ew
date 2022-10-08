const BaseRoute = require('./base/base-route');
const Joi = require('joi');
const failAction = (request, h, err) => {
    request.log('error', err);
    throw err;
};

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
					return headers.response('Internal Error').code(500);
				}
			}
		}
	}

	create() {
		return {
			path: '/heroes',
			method: 'POST',
			options: {
				validate: {
					payload: Joi.object({
						name: Joi.string().min(3).max(100),
						power: Joi.string().min(3).max(100)
					}),
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
					return headers.response('Internal Error').code(500);
				}
			}
		}
	}
}