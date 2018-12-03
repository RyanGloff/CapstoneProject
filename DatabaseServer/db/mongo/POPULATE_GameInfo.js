//db.COLLECTION_NAME.insertMany(document)

/*db.GameInfo.insertMany([
    { id: 1 timeStarted: 70000, users: "houdea, gloffr, kowalchykn", results: "1st", timeLasted: 16000},
    { id: 2 timeStarted: 100000, users: "houdea, gloffr, kowalchykn", results: "3rd", timeLasted: 320000},
    { id: 3 timeStarted: 150000, users: "houdea, gloffr, kowalchykn", results: "2nd", timeLasted: 20000}
])
*/

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Capstone");
  var myobj = [
    { id: 1, timeStarted: 70000, users: [1, 2, 3, 4], results: [3, 4, 2, 1], timeLasted: [16000, 15000, 16500, 17000]},
    { id: 2, timeStarted: 100000, users: [1, 2, 3, 4], results: [3, 4, 2, 1], timeLasted: [32000, 25000, 46000, 46500]},
    { id: 3, timeStarted: 150000, users: [1, 2, 3, 4], results: [2, 1, 4, 3], timeLasted: [20000, 25000, 15000, 16000]}
  ];
  dbo.collection("GameInfo").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});