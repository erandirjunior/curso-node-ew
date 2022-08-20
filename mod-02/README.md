## Uso de recursos no node

Importando recursos no node:
```js
const util = require('util');
```

Método **promisify** converte callbacks para promises:
```js
util.promisify(função);
```

## Calculando tempo de execução

Para calcular o tempo de execução de algum código, basta utilizar o **console.time()** e **console.timeEnd()**:
```js
console.time('teste-time');
console.timeEnd('teste time');
```