# Postgres
## Summary
PostgreSQL is a powerful, open source object-relational database system

PostgreSQL is an open-source descendant of this original Berkeley code. It supports a large part of the SQL standard and offers many modern features:

    complex queries
    foreign keys
    triggers
    updatable views
    transactional integrity
    multiversion concurrency control

Also, PostgreSQL can be extended by the user in many ways, for example by adding new

    data types
    functions
    operators
    aggregate functions
    index methods
    procedural languages


## Installation Process
Step 1: Download Postgres here: `https://www.postgresql.org/download/` (Choose the correct package for your system)

Step 2: Go through the installation of postgres

## Setup Process
Step 1: Start up pg Admin

Step 2: Create the database by running `psql -U postgres -f CREATE_DB_Capstone`

Step 3: Add the tables by running both `psql -U postgres -d Capstone -f CREATE_TABLE_UserInfo` and `psql -U postgres -d Capstone -f CREATE_TABLE_GameInfo`

Step 4: Now you must populate both tables by running `psql -U postgres -d Capstone -f POPULATE_TABLE_GameInfo` and `psql -U postgres -d Capstone -f POPULATE_TABLE_UserInfo`

Step 5: To test if the populating of the tables worked run any of the lower files

- `psql -U postgres -d Capstone -f SELECT_ALL_UserInfo`
- `psql -U postgres -d Capstone -f SELECT_ALL_GameInfo`
- `psql -U postgres -d Capstone -f SELECT_USER_FROM_UserInfo`
- `psql -U postgres -d Capstone -f SELECT_GAME_FROM_GameInfo`

### TO PURGE A TABLE RUN EITHER

- `psql -U postgres -d Capstone -f PURGE_GameInfo`
- `psql -U postgres -d Capstone -f PURGE_UserInfo`

### TO PURGE THE ENTIRE DATABASE RUN

- `psql -U postgres -d Capstone -f PURGE`



To run .sql files:
- run `psql -U postgres -d Capstone -f {ScriptFile}` to run any other script