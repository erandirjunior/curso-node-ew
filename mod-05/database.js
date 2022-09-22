const { readFile, writeFile } = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

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

	async write(data) {
		await writeFileAsync(this.FILE_NAME, JSON.stringify(data));
		return true;
	}

	async create(hero) {
		const data = await this.getData();
		const id = hero.id <= 2 ? hero.id : Date.now();
		const newHero = {
			...hero,
			id
		};
		const finalData = [...data, newHero];
		const result = this.write(finalData);
		return result;
	}

	async delete(id) {
		if (!id) {
			return await this.write([]);
		}
		
		const data = await this.find();
		// const dataFiltered = data.filter(item => Number(item.id) !== Number(id));
		// return await this.write(dataFiltered);
		
		const index = data.findIndex(item => parseInt(item.id) === parseInt(id));
		if (index === -1) {
			throw Error('Hero not found!');
		}

		data.splice(index, 1);
		return await this.write(data);
	}
}

module.exports = new Database();