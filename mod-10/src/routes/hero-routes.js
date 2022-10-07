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
				return this.context.find();
			}
		}
	}
}