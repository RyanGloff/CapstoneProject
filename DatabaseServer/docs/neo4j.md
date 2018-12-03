# Neo4j
## Summary
Neo4j’s Graph Platform is specifically optimized to map, analyze, store and traverse networks of connected data to reveal invisible contexts and hidden relationships. By intuitively mapping data points and the connections between them, Neo4j powers intelligent, real-time applications
## Installation Process
Download Neo4j here `https://neo4j.com/download-thanks-desktop/?edition=desktop&flavour=winstall64&release=1.1.10&offline=true`
## Setup Process
Step 1: Authorize the Desktop App by logging in with your Google or social media account, or create a new email-based login. 

Step 2: Create and start a Database by Clicking the “New Graph” button. 

Step 3: This will turn into two blue buttons. Click the one labeled, “Create a Local Graph.” 
Step 4: Enter the password of your choice in the “Set Password” field. Then, click the blue button labeled “Create.” 

Step 5: The “Create” button will soon be replaced by a “Start” button. Click it.

Step 6: Once the database has started, click the “Manage” button.

Step 7: In a console go to the `CapstoneProject`, `DatabaseServer`, `graphql` folders and run `node CREATE_DRIVER`

Step 8: Then populate the driver by running `node POPULATE_GAMES` and `node POPULATE_USERS`

Step 9: Now test to see if the driver was populated by running both `node SELECT_ALL_GAMES` and `node SELECT_ALL_USERS`

IF YOU WANT TO PURGE THE DATABASE RUN `node PURGE`