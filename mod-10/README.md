## Neste módulo foi necessário modificar algumas coisas nos arquivos docker-compose.yml e Dockerfile.

### Arquivo docker-compose.yml
Foi alterado a porta de 8080:8080 para 8000:8000

### Arquivo Dockerfile
Foi adicionado a linha EXPOSE 8000

## Uso de recursos no node

Instalando o hapi
```bash
npm install @hapi/hapi
```

Instalando o joi para validar campos da requisição
```bash
npm install joi
```

Instalando Boom para melhorar as respostas de uma requisição
```bash
npm install @hapi/boom
```

Os testes da api precisam de dados no banco do mongo para que funcionem.