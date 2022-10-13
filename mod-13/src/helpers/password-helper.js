const Bcrypt = require('bcrypt');
const { promisify } = require('util');
const hashAsync = promisify(Bcrypt.hash);
const compareAsync = promisify(Bcrypt.compare);
const SALT = 3;

module.exports = class PasswordHelper {
	static hashPassword(password) {
		return hashAsync(password, SALT);
	}

	static compare(password, hash) {
		return compareAsync(password, hash);
	}
}