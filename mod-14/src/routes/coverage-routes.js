const BaseRoute = require('./base/base-route');
const Joi = require('joi');
const Boom = require('@hapi/boom');
const { join } = require('path');


module.exports = class CoverageRoutes extends BaseRoute {
	constructor() {
		super();
	}

	index() {
		return {
			path: '/coverage/{params*}',
			method: 'GET',
			options: {
				tags: ['api'],
				description: 'Show coverage test',
				auth: false
			},
			handler: {
				directory: {
					path: join(__dirname, '../../coverage/'),
					redirectToSlash: true,
					index: true
				}
			}
		}
	}
}