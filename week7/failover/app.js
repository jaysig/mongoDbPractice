var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:30001,localhost:30002,localhost:30003/course", function(err, db) {
    if (err) throw err;

    var documentNumber = 0;
    function insertDocument() {

        db.collection("repl").insert({ 'documentNumber' : documentNumber++ }, function(err, doc) {
            if (err) throw err;
            console.log(doc);
        });

        console.log("Dispatched insert");
        setTimeout(insertDocument, 1000);
    }

    insertDocument();
});

//Insert will be buffered until the eolection completes, then the callback will be called
// after the operation is sent and a response is recieved 
