const util = require('util');
const getAddressAsync = util.promisify(getAddress);

function getUser() {
	// Em caso de problema -> reject(error)
	// Em caso de sucesso -> resolve(success)
	return new Promise(function resolvePromise(resolve, reject) {
		setTimeout(function () {
			//reject('fail');
			
			resolve({
				id: 1,
				name: 'Erandir',
				date: new Date()
			});
		}, 1000);
	});
}

function getCellphone(userId) {
	return new Promise((resolve, reject) => {
		setTimeout(function () {
			return resolve({
				cellphone: 8500000,
				areaCode: 85
			});
		}, 2000);
	});
}

function getAddress(userId, callback) {
	setTimeout(function() {
		return callback(null, {
			street: 'Rua Fulando de Tal'
		});
	}, 2000);
}


// Adicionando a palavra reservada async 
// antes da função, faz com que a função
// retorne automaticamente uma promise
async function main() {
	try	{
		console.time('promise-step-by-step');

		// Await espera o promise ser resolvida
		// e retorna o valor dela
		const user = await getUser();
		const cellphone = await getCellphone(user.id);
		const address = await getAddressAsync(user.id);
		console.log(`Name: ${user.name}, Cellphone: ${cellphone.cellphone}, Address: ${address.street}`);

		console.timeEnd('promise-step-by-step');

		console.time('promise-all');
		const newUser = await getUser();
		const result = await Promise.all([
			getCellphone(user.id),
			getAddressAsync(user.id)
		]);
		const [newCellphone, newAddress] = result;
		console.log(`Name: ${newUser.name}, Cellphone: ${newCellphone.cellphone}, Address: ${newAddress.street}`);

		console.timeEnd('promise-all');
	} catch(error) {
		console.log('Error', error);
	}
}

main();