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
