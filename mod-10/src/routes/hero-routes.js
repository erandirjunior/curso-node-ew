const BaseRoute = require('./base/base-route');

module.exports = class HeroRoutes extends BaseRoute {
	constructor(context) {
		super();
		this.context = context;
	}

	find() {
		return {
			path: '/heroes',
			method: 'GET',
			handler: (request, headers) => {
				try {
					const {skip, limit, name} = request.query;
					const query = name ? {name} : {};

					if (skip && !/^\d+$/.test(skip)) {
						throw Error('Skip type is not accepted');
					}

					if (limit && !/^\d+$/.test(limit)) {
						throw Error('Limit type is not accepted');
					}

					return this.context.find(query, parseInt(skip), parseInt(limit));
				} catch (e) {
					console.log(e);
					return headers.response('Internal Error').code(500);
				}
			}
		}
	}
}