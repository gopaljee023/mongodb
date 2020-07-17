//const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');
const circulationRepo = require('./repos/circulationRepo');
const data = require('./circulation.json');
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'circulation1';// if doesn't persent, mongodb will create one for you

(async function main() {
 
  let client;
  try {
    console.log('Trying to connect:');
    client =  await MongoClient.connect(url);
    console.log('Connected correctly')

  
    const result = await circulationRepo.loadData(data); 
    assert.equal(data.length, result.insertedCount);  //checking inserted data equals data.length or not

    // I missed await here.. await is required since getData() is a promise
    const newsPappers =  await circulationRepo.getData();
    //console.log(getDatas);
    assert.equal(data.length, newsPappers.length);

    const filteredData =  await circulationRepo.getData({"Newspaper": "Wall Street Journal"});
    console.log(filteredData);
    assert.deepEqual(newsPappers[1], filteredData[0]);

    const filteredData1 =  await circulationRepo.getData({},3);
    console.log(filteredData1);
    assert.equal(filteredData1.length, 3);

  
  }
  catch (err) {
    console.log(err.stack);
  }
  finally{
    const admin = await client.db(dbName).admin();
    //  console.log(await admin.serverStatus());
     console.log(await admin.listDatabases());
     //here we finally dropping the db to see our test case.. not in production code
     await client.db(dbName).dropDatabase();
     //when client is not needed.. we are closing it.
     client.close();
  }
})();


