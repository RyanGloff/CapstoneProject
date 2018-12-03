const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "password123"));

const session = driver.session();

const cypher = 'CREATE (g1:Game { id: 1, timeStarted: 70000, users: [1, 2, 3], results: [3, 1, 2], timeLasted: [16000, 35000, 27000]})';

session.run(cypher)
	.catch(e => {
		// Output the error
		console.log(e);
	})
	.then(() => {
		console.log('Game Inserted');
		return session.close();
	})
	.then(() => {
		// Close the Driver
		return driver.close();
	});