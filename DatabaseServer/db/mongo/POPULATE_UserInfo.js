//db.COLLECTION_NAME.insert(document)
/*db.UserInfo[
    { id: 1 username: "houdea", password: "password123", lastName: "Houde", firstName: "Andrew", email: "houdea@email.com"},
    { id: 2 username: "gloffr", password: "pass123", lastName: "Gloff", firstName: "Ryan", email: "gloffr@email.com"},
    { id: 3 username: "kowalchykn", password: "test123", lastName: "Kowalchyk", firstName: "Nick", email: "kowalchykn@email.com"},
  ];
*/

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Capstone");
  var myobj = [
    { id: 1, username: "houdea", password: "password123", lastName: "Houde", firstName: "Andrew", email: "houdea@email.com"},
    { id: 2, username: "gloffr", password: "pass123", lastName: "Gloff", firstName: "Ryan", email: "gloffr@email.com"},
    { id: 3, username: "kowalchykn", password: "test123", lastName: "Kowalchyk", firstName: "Nick", email: "kowalchykn@email.com"},
	{ id: 4, username: "crazy", password: "123password", lastName: "Smith", firstName: "Tom", email: "smitht@email.com"}
  ];
  dbo.collection("UserInfo").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});