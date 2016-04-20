//Operations - supports analytics
-Match
- Project
- sort
- skip
- limit
db.companies.aggregate([
    { $match: { founded_year: 2004 } },
])



db.companies.aggregate([
    { $match: { founded_year: 2004 } },
    { $project: {
        _id: 0,
        name: 1,
        founded_year: 1
    } }
])
//Provides more readabilitity
//Pipeline is an array with elements


db.companies.aggregate([
    { $match: { founded_year: 2004 } },
    { $limit: 5 },
    { $project: {
        _id: 0,
        name: 1 } }
])
//Creates a smaller dataset via limit


db.companies.aggregate([
    { $match: { founded_year: 2004 } },
    { $sort: { name: 1} },
    { $limit: 5 },
    { $project: {
        _id: 0,
        name: 1 } }
])



// Take care with the order in which you specify sort skip and limit
db.companies.aggregate([
    { $match: { founded_year: 2004 } },
    { $limit: 5 },
    { $sort: { name: 1} },
    { $project: {
        _id: 0,
        name: 1 } }
])



db.companies.aggregate([
    { $match: { founded_year: 2004 } },
    { $sort: { name: 1} },
    { $skip: 10 },
    { $limit: 5 },
    { $project: {
        _id: 0,
        name: 1 } },
])

//Try to include match as early as possible
// Match stage functions similar to find
