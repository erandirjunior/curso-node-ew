const assert = require('assert');
const password = 'ErandirJunior12';
const PasswordHelper = require('./../helpers/password-helper');
const HASH = '$2b$04$axhWGmbfImcs6IXUR1OXL.4x7Lrvh6s80Ht.84S//YXDNp8rLl5wC';

describe.only('Password hash suite', function() {
	it('Must generate hash', async () => {
		const result = await PasswordHelper.hashPassword(password);
		assert.ok(result.length > 10);
	});

	it('Password compare', async () => {
		const result = await PasswordHelper.compare(password, HASH);

		assert.ok(result);
	});
});