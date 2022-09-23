## Curso de Node do Erick Wendel

Aqui ficará a descrição geral para rodar todos os códigos dos capitulos.

### Módulo 6
A partir do módulo 6, foi necessário alterar o arquivo **docker-compose.yml**, que originalmente tinha apenas a imagem do node, onde foi adicionado as images do postgres, mongo, mongo-client e adminer. Abaixo estão as configurações para rodar os códigos:

#### Adminer
SGBD multi-db, para acessar é necessário escolher o banco, informar o servidor, usuário e senha, opcionalmente o banco. Roda na porta 8081.

#### MongoClient
SBGD para mongodb, roda na porta 3000.
No primeiro acesso:
1) Clique em "Connect"
2) Clique em "Create New"
3) Na página que abrir, podemos definir o nome da conexão é opcional
4) Em seguinda informamos o host, que no caso seria "mongo"
5) E o nome do database, informar o nome "admin"
5) Em seguinda clique na aba "Authentication", na listagem "Authentication Type", selecione  a a opção "Scham-Sha-1"
7) Em seguida insira o nome e a senha,  e no campo "Authentication DB", preencha como "admin"

#### Mongodb
Para criar um banco no mongodb:
1) Acesse o container:
```
docker exec -it mongo_database mongosh -u root -p root --authenticationDatabase admin

// Em versões antigas usamos mongo ao invés de mogosh
docker exec -it mongo_database mongo -u root -p root --authenticationDatabase admin
```
2) Rode o comando passando as configurações desejadas:
```
db.getSiblingDB("heroes").createUser({ user: "erandirjunior", pwd: "erandirjunior", roles: [ { role: "readWrite", db: "heroes" }]})