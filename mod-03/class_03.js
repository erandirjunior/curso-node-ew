const { getPeople } = require('./service');

Array.prototype.myFilter = function(callback) {
	const results = [];
	for (i in this) {
		const result = callback(this[i], i, this);

		if (result) {
			results.push(this[i]);
		}
	}

	return results;
};

async function main() {
	try {
		const { results } = await getPeople('a');

		console.time('filter');
		let larsFamily = results.filter(people => {
			const result = people.name.toLowerCase().indexOf('lars') !== -1;
			return result;
		});
		console.timeEnd('filter');

		console.time('myFilter');
		larsFamily = results.myFilter(people => {
			const result = people.name.toLowerCase().indexOf('lars') !== -1;
			return result;
		});
		console.timeEnd('myFilter');

		console.log(larsFamily);
	} catch(e) {
		console.error(e);
	}
}

main();