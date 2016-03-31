mongoimport  //imports human readable data
mongoimport -d crunchbase -c companies companies.json

show dbs //list databases

comapnies collection

27017 // default mongo port

cursos.forEach (
  //what you expect it to do
  //What should happen if it errors
)


//TODO: Find out difference between cursos and just directly querying the database

Field Projection //allow caring about only the fields being queried.
//1 is included and 0 is not included
MongoClinet.connect('mongourl', function(err, db) {
  let query = {"category_Code": "biotech"};
  let projection = {"name": 1, "category_Code":1, "_id": 0};

  var cursor = db.collection('companies').find(query)
  cursor.project(projection);
  cursor.forEach(
    function(doc){
      console.log(doc.name + " is a " + doc.category_Code + " company");
      console.log(doc);
    }
  )
})
