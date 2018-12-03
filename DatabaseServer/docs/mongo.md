# Mongo
## Summary
MongoDB is a cross-platform, document oriented database that provides, high performance, high availability, and easy scalability. MongoDB works on concept of collection and document.
### Database
Database is a physical container for collections. Each database gets its own set of files on the file system. A single MongoDB server typically has multiple databases.
### Collection
Collection is a group of MongoDB documents. It is the equivalent of an RDBMS table. A collection exists within a single database. Collections do not enforce a schema. Documents within a collection can have different fields. Typically, all documents in a collection are of similar or related purpose.
### Document
A document is a set of key-value pairs. Documents have dynamic schema. Dynamic schema means that documents in the same collection do not need to have the same set of fields or structure, and common fields in a collection's documents may hold different types of data.
## Installation Process
Step 1: Download MongoDB here: `https://www.mongodb.com/download-center/community`

Step 2: Choose the community server and then choose the correct os
## Setup Process
Step 1: Find the MongoDB bin and copy that into your environment variables.

Step 2: Create a folder called `data` with anouther folder inside called `db`

Step 3: In your console enter `mongod`

Step 4: Once that is done you can now enter the mongo shell by entering in the console `mongo`

Step 5: In the shell write `show dbs` to see what databases are there

Step 6: In anouther console go to the `CapstoneProject`, `DatabaseServer`, `NOSQL` folders and run `node CREATE_DB_Capstone`

Step 7: run both `node CREATE_COLLECTION_GameInfo` and `node CREATE_COLLECTION_UserInfo`

Step 8: Populate both collections by running `node POPULATE_GameInfo` and  `node POPULATE_UserInfo`

IF YOU WANT TO DROP A COLLECTION OR BOTH

run `node DROP_GameInfo` and `node DROP_User`