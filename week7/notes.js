WRITE CONCERN
- Memory hold temps stuff, Disk holds long term
- W = 1 wait fora write to be acknowledged
- J = false fora journal to be written to memory
W&J write concern
w=1;j=1 to ensure insert or update has been written all the way to the disk

w   j
1  false - small window of vulnerablity
1  true (1) - waits

NETWORK ERRORS
- Stuff could get written but you may not know about it
- $inc increment


REPLICATION
- Availability
- Fault Tolerance
- Original number of nodes needed to assure election of a new Primary if a node goes down 3

TYPES OF REPLICA SET NODES
- Regular
- Arbiter - Voting
- Delayed / Regular (cant become a primary node)
- Hidden (analytics)

WRITE CONSISTENCY
- REad and write go to primary
- Read can go to secondaries but there could be lag
- Mongod does not offer eventual consistency by default

CREATING A REPLICA SET
-BASH < file_name.sh
- db.slaveOk() - allows querying of secondaries

REPLICATION INTERNALS
- Seconardies can read from other secondaries if there is an oplog
- Oplog use statement documents, allows fora rolling upgrade
- Replication supports mixed-mode storage engines. For examples, a mmapv1 primary and wirdTiger secondary
- A copy of the oplog is kepy on both the primary and secondary servers
- The oplog is implemented as a capped collection. This means the size is fixed and older documents get
overwritten when the maximum size is reached

FALLOVER AND ROLLBACK
- Mongo node will rollback data and requires to be manually added
- set w write concern to ensure majority of data is written


REVISITING WRITE CONCERN
- Connection
- Collection
- Replica Set
w = 3 wait fora primary node and two nodes to acknolede the write
w = majority wait fora majority to acknowledge


READ PREFERENCE
- Primary - send only to the primary

IMPLICATIONS OF REPLICATION
- Seed lists
- Write concern w,j
- Read Preferences
- Errors can happen

INTRO TO SHARDING
- Sharing data to multiple databases
- Shards split the data and are replica sets
- Mongos:handles routing
- Range based, use shard key, If it doesnt have the shard key it will have to scan all shards
- Only one node of a replica set is required to handle a search across all of the shards

IMPLICATIONS OF SHARING ON DEVELOPMENT
- Every doc includes the shard key
- Shard Key is immutable
- index starts with the shard key
- shared key specified , multi is true
- no shard key - scatter gather
- no unique key - unless part of shard key

SHARING AND REPLICATIONS
- shards are replica sets
- still have write concern
- Drivers ensure you can fall over to different mongos

CHOOSING A SHARD Key
- sufficient cardinality
- Hot spotting
- choose something that consistent across everything
- Post time will cause hotspotting
- Username will distribute posts well

7.1
Replication in Mongo DB
- minimum number of voting nodes is 3  TruE
- MongoDB Replication is synchronus  False
- By default, Mongo DB connection clas is w=1 and j =1 FALSE
- Oplog uses capped collection TRUE

7.2
five member replica set and want to assure that writes are committed to the journal and are acknowledged
by at least 3 nodes before you proceed forward. What would be the appropriate settings fora w and j
w"majority":j:1


7.3
- Shard key must be unique FALSE
- There must be an index on the collection the starts with the shard key TRUE
- MongoDB cannot enforce unique indexes on a sharded collection other than the shard key itself
or indexes preferred by the shard key True
- Any update that does not contain the shard key will be sent to all shards TRUE 
- You can change a shard key on a collection if you desire FALSE
