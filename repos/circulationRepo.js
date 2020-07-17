const { MongoClient } = require('mongodb');


function circulationRepo() {
   
  function getData(query,limit){
    let client;
    const url = 'mongodb://localhost:27017';
    const dbName = 'circulation1';// if doesn't persent, mongodb will create one for you
    return new Promise(async (resolve, reject) => {
      try {
        client = await MongoClient.connect(url);
        const db = client.db(dbName);
      
        const items = db.collection('newspaper1').find(query); //find will give cursor.. using await items.toArray() we get all data
          
        if(limit>0)
         items.limit(limit);
          
        resolve(await items.toArray());
        client.close();
      }
      catch(error){
        console.log('error ');
        reject(error);
      }
    })
  }
  
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
        client.close();
      }
      catch(error){
        reject(error);
      }
    })
    
  }
  return {loadData,getData};
}

module.exports =  circulationRepo() ;