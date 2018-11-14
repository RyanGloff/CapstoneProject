# DatabaseServer

## Purpose
The purpose of the database microservice is to provide multiple different implementations for the BackendGameServer microservice.

## Setup
Run `npm install` from the `src`folder

### MemoryBasedDB
No prior work is required to set up this DB structure

### Postgres
Steps:
From the `DatabaseServer/db/postgres` directory:
- Run DB creation script with `psql -U postgres -f CREATE_DB_Capstone.sql`
- Run Table creation scripts with:
    - `psql -U postgres -U postgres -d Capstone -f CREATE_TABLE_UserInfo.sql`
    - `psql -U postgres -U postgres -d Capstone -f CREATE_TABLE_GameInfo.sql`
- Run population scripts (Optional):
    - `psql -U postgres -U postgres -d Capstone -f POPULATE_TABLE_UserInfo.sql`
    - `psql -U postgres -U postgres -d Capstone -f POPULATE_TABLE_UserInfo.sql`

### Mongo
Steps:
From the `DatabaseServer/db/mongo` directory:
- Run DB creation script with `node CREATE_DB_Capstone.js`
- Run Table creation scripts with:
    - `node CREATE_COLLECTION_UserInfo.js`
    - `node CREATE_COLLECTION_GameInfo.js`
- Run population scripts (Optional):
    - `node POPULATE_UserInfo.js`
    - `node POPULATE_GameInfo.js`

## Running
Run `node .` to run the basic memory-based implmentation

### Options
- `-c [dbImplmentationFile]` or `--connector [dbImplmentationFile]`
    - Current implementation files are:
        - `MemoryBasedDB`
        - `postgresDB`
        - `mongoDB`

