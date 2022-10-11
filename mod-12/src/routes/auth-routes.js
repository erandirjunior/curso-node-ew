const BaseRoute = require('./base/base-route');
const Joi = require('joi');
const Boom = require('@hapi/boom');
const JWT = require('jsonwebtoken'); 
const failAction = (request, h, err) => {
    request.log('error', err);
    throw err;
};

const USER = {
	username: 'erandirjunior',
	password: '123456'
}

module.exports = class AuthRoutes extends BaseRoute {
	constructor(secret) {
		super();
		this.secret = secret;
	}

	login() {
		return {
			path: '/login',
			method: 'POST',
			options: {
				tags: ['api'],
				description: 'Get jwt token',
				notes: 'Login with username and password',
				validate: {
					payload: Joi.object({
						username: Joi.string().min(3).max(100).required(),
						password: Joi.string().min(3).max(100).required(),
					}),
					failAction
				},
				auth: false// Informa que não precisa de token para acessar
			},
			handler: async (req, h) => {
				try {
					const {username, password} = req.payload;
					if (username.toLowerCase() !== USER.username || password.toLowerCase() !== USER.password) {
						return Boom.unauthorized();
					}
					const token = JWT.sign({
						username,
						id: 1
					}, this.secret);

					return {
						token
					};

				} catch(e) {
					console.log(e);
					return Boom.internal();
				}
			}
		};
	}
}