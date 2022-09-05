const service = require('./service');

async function main() {
	try {
		const result = await service.getPeople('a');
		const names = [];
		console.time('for');
		for (let i = 0; i < result.results.length; i++) {
			const people = result.results[i];
			names.push(people.name);
		}
		console.timeEnd('for');

		console.time('for-in')
		for (let i in result.results) {;
			const people = result.results[i];
			names.push(people.name);
		}
		console.timeEnd('for-in');

		console.time('for-of');
		for (people of result.results) {
			names.push(people.name);
		}
		console.timeEnd('for-of');

		console.log(names);
	} catch (e) {
		console.log('Internal Error:', e);
	}
}

main();