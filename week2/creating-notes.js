db.name.insertMany(
  [
    {
      //allows for the insertion of many objects.
    },
    {
      "ordered": false //allows for the insertion to continue if it encounters erros
    }
  ]
);

/* _id's applied by default



   Reading Documents
*/
db.movieDetails.find({ "writers": ["Ethan Coen", "Joel Coen"] }).count(); //specifies the order and that the values must be in an array

db.movieDetails.find({ "actors": "jeff bridges"}).count(); //will return values as long as jeff bridges is listed somewhere as an actor no matter the order

//Use .pretty() to make sure the data is readable

var c = db.movieDetails.find();
var doc = () => return c.hasNext() ? c.next() : null;
c.objsLeftInBatch();

/* Comparsion operators



*/

db.movieDetails.find({ runtime: { $gt: 90} }).pretty() //returns movies longer than an hour and a half

db.movieDetails.find({ runtime: { $gt: 90, $lte: 120} }).pretty() //returns movies longer than an hour and a half and less than two hours

db.movieDetails.find({ "tomato.meter" : { $gte: 95 }, runtime: { $gt: 90, $lte: 120} }).pretty() //returns movies longer than an hour and a half, less than two hours, and tomato score >= 95

$ne //returns things not equal to and values left blank


db.movieDetails.find({ rated: { $in: ["g", "pg", "pg-13"] } }).pretty() //Matches values

db.movieDetails.find({ "tomato.meter": { $exists:true } }).pretty() //Finds movie that have a tomato value

db.movieDetails.find({ "_id": { $type: "string" } }).pretty() //Finds movie that have an id as a string

db.movieDetails.find({ $or: [ {term 1}, { term 2}] }).pretty() // returns movies that matches either term 1 or term 2

// regex options are available


$all: all things must matches

$size: length of the array

db.movieDetails.find({
  "year": 2013,
  rated: "PG-13",
  awards: {
                $elemMatch: {
                     wins: { $gt: 1 }
                }
      }
}).count()

db.movieDetails.find({"year": 2013, rated: "PG-13", "awards.wins": 0}).pretty() //Answer 1
