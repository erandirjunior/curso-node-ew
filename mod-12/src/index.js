const Context = require('./db/strategy/base/context-strategy');
const Mongo = require('./db/strategy/mongo');
const Postgres = require('./db/strategy/postgres');

const contextMongoDB = new Context(new Mongo());
contextMongoDB.create();

const contextPostgres = new Context(new Postgres());
contextPostgres.create();

// Throw exception
// contextMongoDB.find();