//db.COLLECTION_NAME.insert(document)

//db.UserInfo.insert({ id: 1 username: "houdea", password: "password123", lastName: "Houde", firstName: "Andrew", email: "houdea@email.com"})
 
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Capstone");
  var myobj = { id: 1, username: "houdea", password: "password123", lastName: "Houde", firstName: "Andrew", email: "houdea@email.com"};
  dbo.collection("UserInfo").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});