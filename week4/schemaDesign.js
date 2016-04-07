Application driven Design
* Supports rich documents
* No Mongo Joins
* Pre Join / Embed database
- No Constraints
- Atomic Operations
- No declared Schema

Most Important factor for designing Schema
- Matching the data access patterns of your Application
- Allows for best performance

Third normal form?

Relational Normalization
- Key must be described

RDBs Normalization goals
- Free of data of anomlies
- Minimizes problems when extending
- avoid bias toward particular access pattern

Model in Mongo Db
- Still need collections
- Demo needs Posts and Author collection

Living without Constraints
- Keeps data consistent even though mongo db lacks foreign key contraints
- Uses embedding
-

Living without transactions
- Atomic operations are present  / Means if part A or B fails then the operation will not be completed 
  - Completed before someone sees the document
  - restructure / everything happens in one document
  - implement in software
  - tolerate inconsistency

  One ot one relations
  - Consider whether to keep things seperate or whether to embed
  - reduces the working set size
  - Because the combined size of the documents would be bigger than 16 mb

One to Many relations
 - City: people who live in the City
 -

 One to Few relation
 - blog posts: comments
 - get away with one collection

 Many to Many relations
 Books: Authors - few:few
  * put array of book ids in the author collection
 Students: Teachers -
 - link in one direction

 Multikey Indexes
 - db.students.ensureIndex({'teachers':1}) - checks for existance
 db.students.find({'teachers': {$all: [0,1]}}) - returns all students who have had teachers 0 and 1
 explain() explains the curser

 Benefits of Embedding
 - Improved Read performance, high latency

 Representing Trees
 - Able to list ancestors
 - Use this to query other documents ancestors array to find descendents
 {
  _id: 34,
  name : "Snorkeling",
  parent_id: 12,
  ancestors: [12, 35, 90]
}
db.categories.find({ancestors:34})


When to denormalize
1:1 embed
1: many embed from the many to the one
many : many Link


4.1
1-2 Wrong
1-3 Wrong
1-4 Wrong
1,2,4 Wrong
1,3,4 Wrong
1 Number of Milestone per year is small; so, its easy to say milestones that happened in a year or a range
4. We can easily see milestones when we query
