const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

function initializeDatabase() {
    function readPassFile() {
      try {
        const dbpw = fs.readFileSync('./secrets/mongo_root_password.txt', 'utf8');
        if (dbpw) {console.log("dbpw read successfully: " + dbpw);}
        return dbpw;
      } catch (err) {
        console.error("dbpw not read successfully, error: " + err);
      }
    }
  
    function connect() {
      const dbpw = readPassFile();
      const url = `mongodb://root:${dbpw}@localhost:27017`;
      try {
        const client = new MongoClient(url);
        console.log("Connected successfully to client!")
        return client;
      } catch (err) {
        console.error("client not created successfully, error: " + err);
      }
    }
    return connect();
}
const mongo = initializeDatabase();

module.exports = mongo;