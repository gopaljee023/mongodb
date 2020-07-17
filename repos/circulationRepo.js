const { MongoClient } = require('mongodb');


function circulationRepo() {
  function loadData(data) {
    let client;
    const url = 'mongodb://localhost:27017';
    const dbName = 'circulation1';// if doesn't persent, mongodb will create one for you
    return new Promise(async (resolve, reject) => {
      try {
        client = await MongoClient.connect(url);
        const db = client.db(dbName);
        // in db.collection('collectionname')
        const result = await db.collection('newspaper1').insertMany(data);
        resolve(result);
      }
      catch(error){
        reject(error);
      }
    })
    
  }
  return {loadData};
}

module.exports = circulationRepo();