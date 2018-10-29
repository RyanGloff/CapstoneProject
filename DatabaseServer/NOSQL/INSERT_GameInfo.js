//db.COLLECTION_NAME.insert(document)

//db.GameInfo.insert({ id: 1 timeStarted: 70000, users: ["houdea", "gloffr", "kowalchykn"], results: "1st", timeLasted: 16000};

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Capstone");
  var myobj = { id: 1, timeStarted: 70000, users: [1, 2, 3], results: [3, 1, 2], timeLasted: [16000, 35000, 27000]};
  dbo.collection("GameInfo").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});