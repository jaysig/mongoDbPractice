Introduction to the Aggregation Framework
- controls input docs
- reuse stages like filters

Familiar Aggregation Operations
-

Expressions
- and, or set
- Comparsion
- armithmatic - floor, ceiling
- String
- array expressions
- date expressions

Accumulators
- $push
- $addToSet
- Project stage must operate on arrays, otherwise provide functions on multiple documents


HW

6.1
db.companies.aggregate( [
    { $match: { "relationships.person.permalink": { $eq: "roger-ehrenberg" } } },
    { $project: { relationships: 1, name:1 } },
    { $unwind: "$relationships" },
    { $group: {
        _id: {person: "$relationships.person.permalink", company_name: "$name"},
        count: { $sum: 1 }
    } },
    { $sort: { count: -1 } }
] )

db.companies.aggregate( [
    { $match: { "relationships.person.permalink": { $eq: "eric-di-benedetto" } } },
    { $project: { relationships: 1, name:1 } },
    { $unwind: "$relationships" },
    { $group: {
        _id: {person: "$relationships.person.permalink", company_name: "$name"},
        count: { $sum: 1 }
    } },
    { $group: {
        _id: {person: "$_id.person"},
        count: { $sum: 1 }
    } },
    { $sort: { count: -1 } }
] )

6.2
mongoimport -d test -c grades --drop grades.json
db.grades.aggregate( [
    { $match: { "scores.type": { $ne: "quiz" } } },
    { $project: { student_id: 1, class_id: 1 } },
    { $unwind: "$scores" },
    { $group: {
        _id: "$student_id",
        count: { $avg: 1 }
    } },
    { $sort: { count: -1 } }
] )

db.grades.aggregate( [
    { $match: { "scores.type": { $ne: "quiz" } } },
    { $project: { student_id: 1} },
    { $unwind: "$scores" },
    { $group: {
        _id: "$student_id",
        count: { $avg: 1 }
    } },
    { $sort: { count: -1 } }
] )

db.grades.aggregate( [
    { $match: { "scores.type": { $eq: "quiz" } } },
    { $project : { class_id : "$class_id", student_id : "$student_id", _id: 0, scores: "$scores" } },
    { $sort : { class_id : 1 } }
] )

db.grades.aggregate( [
    { $project : { class_id : "$class_id", student_id : "$student_id",
      scores: {
            $filter: {
               input: "$score",
               as: "score",
               cond: { $ne: [ "$$score.type", "quiz"] }
            }
         } } },
    { $unwind: "$scores" },
    { $group: {
        _id: {score: "$scores.score", student: "$student_id", class: "$class_id"},
        count: { $avg: 1 }
    } },
    // { $group: {
    //     _id: {class: "$_id.class_id"},
    //     count: { $avg: 1 }
    // } },
    { $sort : { class_id : 1 } }
] )
//Match what you are looking for
//Project - search based these parameters
//Unwind seperate an array into seperate things
