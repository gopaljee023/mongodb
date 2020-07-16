// const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');

const url = 'mongodb://localhost:27017'

const dbName = 'circulation';// if doesn't persent, mongodb will create one for you

(async function main(){

    const client = new MongoClient();
    await client.connect();
}());

main();