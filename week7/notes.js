WRITE CONCERN
- Memory hold temps stuff, Disk holds long term
- W = 1 wait fora write to be acknowledged
- J = false fora journal to be written to memory
W&J write concern
w=1;j=1 to ensure insert or update has been written all the way to the disk


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
