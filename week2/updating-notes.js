db.movieDetails.updateOne({title: "The Martian"},
               { $set: {poster: "poster location"} }) //Select what to update, then set the value. Works with the first one found

$unset // removes the values

$incr // increase the value

$push + $each // allows for each thing to be added individually

updateMany // will do the same things as updateOne but does it for all that match the query

upsert: true // if no document is found then it inserts
