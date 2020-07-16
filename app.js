//const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'circulation';// if doesn't persent, mongodb will create one for you

(async function main() {
 
  let client;
  try {
    console.log('Trying to connect:');
    client =  await MongoClient.connect(url);
    console.log('Connected correctly')
    const admin = await client.db(dbName).admin();
   
    console.log(await admin.serverStatus());
    console.log(await admin.listDatabases());
  }
  catch (err) {
    console.log(err.stack);
  }
})();


