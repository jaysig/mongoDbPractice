var MongoClient = require('mongodb').MongoClient;
//list of nodes we want to connect to
MongoClient.connect("mongodb://localhost:30001,localhost:30002,localhost:30003/course", function(err, db) {
    if (err) throw err;

    db.collection("repl").insert({ 'x' : 1 }, function(err, doc) {
        if (err) throw err;

        db.collection("repl").findOne({ 'x' : 1 }, function(err, doc) {
            if (err) throw err;

            console.log(doc);
            db.close();
        });
    });
});
//Missing node will be discovered as long as one node is listed
