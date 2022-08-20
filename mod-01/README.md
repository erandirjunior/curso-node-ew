## Criação de um projeto

Criar um projeto:
```bash
npm init
```

Criar um projeto com as configurações padrões:
```bash
npm init -y
```

## Adicionar novos comando
Edite o arquivo **package.json**, dentro do campo **scripts**, adicione o nome e a ação do novo comando:
```json
{
  "name": "mod-01",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Para executar o comando adicionado:
```bash
npm run nome_do_comando
```