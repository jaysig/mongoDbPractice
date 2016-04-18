Mongo works with a storage engine
* doesn't affect communication between servers or API'
* controls The data file format and format of indexes

-MMAP
1. Uses power of two sized allocations
2. collection level locking - Only one write can happen to the same collection at a time
3. Operating system makes a decision about what is in memory vs. what is in disk

-WiredTiger
1. Document Level Concurrency. No locks
2. Compression
3. Manages memory to access the file
4. Append only, eventually reclaim space. Means no updates
5. Wired Tiger can not open MMAP files

//INDEXES
-Generally best to have an index
- Indexes stored in btrees fo r MMAP
- Stored in b+ trees in wired tiger
- Need to use the left most set of things
- Writes are slower with indexes, but reads are much faster

//CREATING INDEXES
- Explain() explains the output
- db.students.createIndex({student_id:1}); - takes a while when first creating it. 1 is ascending -1 is descending
- add all your data first if its big then add the index
- Quiz Answer : db.students.createIndex({class:1,student_name:1})
use *dbname*
-db.students.getIndexes();   - returns all indexes on a collection
- db.students.dropIndex({student_id:1}) - provide same syntax as index you added and it will be deleted

//MULTIKEY INDEXES
- DB realizes there is a document with the key
- can't' have two items of a compound where both are arrays
- means cant insert "a": [1,2,3], "b": [1,46,12]

//Dot Notation and Multikey
db.students.explain().find({'scores': {$elemMatch: {type:'exam', score:{'$gt':99.8}}}})
 - Match at least one
Quiz answer: db.people.createIndex({"work_history.company":-1});

//Creation Option, unique
db.stuff.createIndex({thing:1}, {unique:true});
db.stuff.remove({thing: 'apple'},{justOne: true});
Quiz Answer: db.students.createIndex({student_id:1,class_id:1},{unique:true})

//Spare Indexes
Used when documents are missing the index key
Spare - do not include documents taht are missing the key
* cant be used fo r sorting

//Index creation
Fore Ground
-fast
- blocks writes and readers

Background
-slow
- don't block read/writes'

//Explain
- Figures out what the database would do
db.foo.explain - .find() , .update(), aggregate()

//Explain: Verbosity
db.example.explain("executionstats") - provides more detail
db.example.explain("allPlansExecution") - Does what the query optimizer, runs all query indexs in paraell
* provides more data

//Covered Query
- Query covered by the index
exp.find({i:45,j:23}, {_id:0,i:1,j:1,k:1});

//When is an index used
Checks which index is the fastest
 - set threshold writes
 - rebuild the index

 //Index Size
 - uses a working set
 - indexes need to be in working memory

 // Number of Index Entries
MMAPP requires more rewritting
Wired Tiger uses immutable locations

//Geospatial indexes
- Needs a location - x,y index
- createIndex({'location': '2d'})
- Use $near (x,y)
Quiz Answer: db.places.find( { location : { $near : [74,140] } }).limit(3)

//Geo Spherical
db.places.createIndex({'location':'2dsphere'})
db.places.find({location: {$near: { $geometry: {
  type: "Point",
  coordinates: []},
  $maxDistance:2000
} } })

Quiz Answer: db.stores.find({ loc: { $near: { $geometry: {
  type: "Point",
  coordinates: [-130,39]},
  $maxDistance:1000000
} } })

//Full Text Search
db.sentences.find({$text: {$search:'dog'}})
db.sentences.find({$text: {$search:'dog'}}, {score:{$meta: 'textScore'}}).sort({score:{$meta:'textScore'}})
http://docs.mongodb.org/manual/reference/operator/query/regex/?&_ga=1.2414832.1394008893.1458229630#index-use

//Designing || Using Indexes
Goal: Efficient read/write
*selectivity is the most important. The fewer records we have to deal with, the better

//Efficiency of Index Use Examples
- create multiple compound indexes to ensure speficicity
- Equality fields before range fields
- Equality fields before sort fields
- sort fields before range fields

//Logging Slow queries
- Mongo logs slow queries
-

//Profiler
db.getProfilingLevel(1,4)
db.setProfilingLevel(1,4)
- 0, off
- 1, slow queries
- 2, all quereis
Quiz Answer: db.system.profile.find({millis:{$gt:1000}}).sort({ts:-1})

//Review
1. Indexes are critical
2. Explain - Further detail on query
3. Hint -
4. Profiling
//Mongotop
Provides read write time duration

//Mongostat
- number of insert, queries, etc..
- stats on your database

//Sharding
- deploy multiple mongo servers
- user mongos f or routers
- insert must include the shard key
- update needs shard key

5-1
1. COLLSCAN

2. Works

3 didnt work
2,3 did work

5-2

2,4 didn't workk'

1. Query uses an index to dertermine the order in which to return results documents / True
2. Query uses an index to determine which documents match / FALSE
3. Query returns 251120 false
4. Query examines 251120 true
5. Covered False

1,4 did work

5-3
