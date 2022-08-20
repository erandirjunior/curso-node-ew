const EventEmmiter = require('events');
class MyEmitter extends EventEmmiter {}

const myEmmiter = new MyEmitter();
const eventName = 'user:click';

// Adicionando um evento
myEmmiter.on(eventName, function(click) {
	console.log('An user clicked', click);
});

// Disparando evento
myEmmiter.emit(eventName, 'on scrollbar');
myEmmiter.emit(eventName, 'on button');


// Código comentado pois travaria a execução dos demais códigos
// let count = 0;
// setInterval(function () {
// 	myEmmiter.emit(eventName, 'on field ' + count++);	
// }, 1000);

// process é um recurso/variável interno(a) do node que não precisa importar
const stdin = process.openStdin();
stdin.addListener('data', function(value) {
	console.log(`You typed: ${value.toString().trim()}`);
});


// O código abaixo está comentado pois só funciona um única vez
// pois promise servem para uma única execução
// e eventos são contínuos
// function main() {
// 	return new Promise((resolve, reject) => {
// 		stdin.addListener('data', function(value) {
// 			resolve(`You typed: ${value.toString().trim()}`);
// 		});
// 	});
// }
// main().then(result => console.log(result));