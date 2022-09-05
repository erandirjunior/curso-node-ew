const service = require('./service');

Array.prototype.myMap = function(callback) {
	const newArrayMapped = [];

	for (let i = 0; i < this.length; i++) {
		const result = callback(this[i], i, this);
		newArrayMapped.push(result);
	}

	return newArrayMapped;
};

async function main(argument) {
	try {
		const result = await service.getPeople('a');
		let names = [];
		console.time('forEach');
		result.results.forEach(function(people) {
			names.push(people.name);
		});
		console.timeEnd('forEach');

		console.time('map');
		names = result.results.map(function(people) {
			return people.name;
		});
		console.timeEnd('map');


		console.time('map2');
		names = result.results.map(people => people.name);
		console.timeEnd('map2');

		console.time('myMap');
		names = result.results.myMap(people => people.name);
		console.timeEnd('myMap');

		console.log(names);
	} catch (e) {
		console.log('Internal Error:', e)
	}
}

main();