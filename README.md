# Nyoom (Tron Game)

## Database Server
The database server is the server responsible for the persistence layer.
It stores game data and user data for login.

Run `npm install` to install dependencies from npm

To run the database server, from `CapstoneProject/DatabaseServer` run command:
```
node . -c [Connector file]
```
The connector file is a linking file to the DB implementation. Connector files are found in `DatabaseServer/src/dbImpls`

Current implementations are:
- `MemoryBasedDB`
    - Stores data in memory and will reset every time the database server is restarted
    - Default logins for MemoryBasedDB are:

| Username       |   Password      |
|----------------|-------------    |
| RyanUsername   | RyanPassword    |
| NickUsername   | NickPassword    |
| AndrewUsername | AndrewPassword  |
| RandomUsername | RandomPassword  |
| 1              |                 |
| 2              |                 |
| 3              |                 |
| 4              |                 |


- `postgresDB`
    - Stores data in a postgres data base that would have to be set up with the queries in `DatabaseServer/db/postgres`
- `mongoDB`
    - Stores data in a Mongo data base that would have to be set up with the queries in `DatabaseServer/db/graphql`
- `neo4j`
    - Stores data in a Neo4j data base that would have to be set up with the queries in `DatabaseServer/db/neo4j`

Database set up readme's in `DatabaseServer/docs`

## Backend Game Server
The backend game server does all of the game logic processing. As well as serves the front end (web app) to the client.

Run `npm install` to install dependencies from npm

To run the backend game server, from `CapstoneProject/BackendGameServer` run command:
```
node .
```

To get the front end navigate to `localhost:4200`

