const { getPeople } = require('./service');

Array.prototype.myReduce = function(callback, startValue) {
	let finalValue = typeof startValue !== undefined ? startValue : this[0];
	for (var i = 0; i < this.length; i++) {
		finalValue = callback(finalValue, this[i], this);
	}
	return finalValue;
}

async function main() {
	try {
		const { results } = await getPeople('a');
		const heights = results.map(item => parseInt(item.height));
		
		console.time('reduce');
		let total = heights.reduce((acum, next) => {
			return acum + next;
		}, 0);
		console.timeEnd('reduce');

		console.log(total);

		console.time('myReduce');
		total = heights.myReduce((acum, next) => {
			return acum + next;
		}, 0);
		console.timeEnd('myReduce');

		console.log(total);

		const myList = [
			['Erandir', 'Junior'],
			['PHPBR', 'NodeBr'],
		];
		const list = myList.myReduce((acum, next) => {
			return acum.concat(next);
		}, [])
		.join(', ');

		console.log(list);

	} catch (e) {
		console.error(e);
	}
}

main();