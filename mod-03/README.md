## Uso de recursos no node

Exportando um módulo:
```js
module.exports = {
	getPeople
}
```

Para importar um módulo criado:
```js
const service = require('./service');
```

Para importar apenas recursos específicos:
```js
const { getPeople } = require('./service');
```

## Manipulando array
- for -> percorre array
- for in -> percorre array
- for of -> percorre array
- forEach -> percerre array
- map -> retorna um novo array manipulado
- filter -> retorna um novo array filtrado
- reduce -> retorna um dado reduzido