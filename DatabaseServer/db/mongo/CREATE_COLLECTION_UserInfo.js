//Collection is the same as a table
//basic syntax for mongo db.createCollection(name, options)

//db.createCollection(UserInfo)

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Capstone");
  dbo.createCollection("UserInfo", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
}); 