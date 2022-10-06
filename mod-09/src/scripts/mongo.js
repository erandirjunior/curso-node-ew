// Entrar dentro do container mongo já entrando no mongo com o comando abaixo:
docker exec -it mongo_database mongosh -u erandirjunior -p erandirjunior --authenticationDatbase heroes

// Mostra os bancos que o usuário tem acesso
show dbs

// Seleciona um banco
use nome_do_banco

// Mostra as "tabelas"
show collections

// Insere um novo registro em versões antigas do mongo
db.heroes.insert({name: 'Flash', power: 'Speed'})

// Insere um novo registro
db.heroes.insertOne({name: 'Batman', power: 'Money'})

// Lista dados todos os dados
db.heroes.find()

// Lista dados todos os dados formato
db.heroes.find().pretty()

// Podemos executar código javascript
for (let i = 0; i < 10000; i++) {
	db.heroes.insertOne({name: `Clone ${i}`, power: 'Money'})
}

// Lista a quantidade de documentos
db.heroes.countDocuments()

// Lista a quantidade de documentos em versoes antigas
db.heroes.count()

// Lista apenas o primeiro resultado
db.heroes.findOne()

// Lista limitando a uma quantidade especifica e ordenando por nome em ordem descrecente
db.heroes.find().limit(1000).sort({name: -1})

// Listando apenas campos especificos
db.heroes.find({}, {power: 1, _id: 0})

// Atualizando dados
db.heroes.update({_id: ObjectId("632f8466dbc5c74e2e42baa1")}, {$set: {name: 'Superman'}})

// Atualizando vários registros de uma vez
db.heroes.updateMany({power: 'Money'}, {$set: {power: 'Force'}});

// Deletando dados
db.heroes.deleteOne({_id: ObjectId("632f85b0dbc5c74e2e42bab4")})

// Deletando vários
db.heroes.deleteMany({})