const { readFile } = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(readFile);

// Podemos manipular arquivos json diretamente
const jsonData = require('./heroes.json');

class Database {
	constructor() {
		this.FILE_NAME = 'heroes.json';
	}

	async getData() {
		const file = await readFileAsync(this.FILE_NAME, 'utf8');

		// Os dados vem no formato buffer, por isso precisamos utilizar o toString()
		return JSON.parse(file.toString());
	}


	async find(id) {
		const data = await this.getData();
		return data.filter(item => id ? Number(item.id) === Number(id) : true);
	}
}

module.exports = new Database();