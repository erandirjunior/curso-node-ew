Instalando lib para ler informações dos arquivos .env
```bash
npm i dotenv
```

Instalando lib para ler manipular variáreis de ambiente via linha de comando
```bash
 npm i -g cross-env
```

Para modifificar uma variável de ambiente via cross-ev, basta fazer como no exemplo abaixo:
```bash
cross-env NODE_ENV=prod npm t src/tests/
```