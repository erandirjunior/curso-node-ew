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

const userPromise = getUser();
userPromise
	.then(function(user) {
		return getCellphone(user.id)
		.then((cellphone) => {
			return {
				user,
				cellphone
			};
		});

	})
	.then(result => {
		return getAddressAsync(result.user.id)
			.then(address => {
				return {
					...result,
					address
				};
			})
	})
	.then(function(result) {
		console.log(`Name: ${result.user.name}, Cellphone: ${result.cellphone.cellphone}, Address: ${result.address.street}`);

		

	// Erros podem ser capturados com o segundo parâmetro
	// do método then
	// ou por meio do método catch()
	}/*, function (error) {}*/)
	.catch(function(error) {
		console.log('Error', error);
	});