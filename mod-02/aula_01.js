function getUser(callback) {
	setTimeout(function () {
		return callback(null, {
			id: 1,
			name: 'Erandir',
			date: new Date()
		});
	}, 1000);
}

function getCellphone(userId, callback) {
	setTimeout(function () {
		return callback(null, {
			cellphone: 8500000,
			areaCode: 85
		});
	}, 2000);
}

function getAddress(userId, callback) {
	setTimeout(function() {
		return callback(null, {
			street: 'Rua Fulando de Tal'
		});
	}, 2000);
}

getUser(function resolveUser(error, user) {
	if (error) {
		console.erro('Fail user!', error);
		return;
	}

	getCellphone(user.id, function resolveCellphone(errorCellphone, cellphone) {
		if (errorCellphone) {
			console.erro('Fail cellphone!', errorCellphone);
			return;
		}

		getAddress(user.id, function resolveAddress(errorAddress, address) {
			if (errorAddress) {
				console.erro('Fail address!', errorAddress);
				return;
			}

			console.log(`Name: ${user.name}, Cellphone: ${cellphone.cellphone}, Address: ${address.street}`);
		});
	});
});


// O código abaixo não executa pois o getUser retorna undefined
// const user = getUser();
// const cellphone = getCellphone(user.id);
// console.log('user', user);