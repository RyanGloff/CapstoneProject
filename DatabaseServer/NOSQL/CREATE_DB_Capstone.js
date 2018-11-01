var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Capstone";

MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

//basic syntax for Creating a database is use DATABASE_NAME
//EX: use Capstone