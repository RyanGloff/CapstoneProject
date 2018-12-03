const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "password123"));

const session = driver.session();

const cypher = 'MATCH (games:Game) DETACH DELETE games';

session.run(cypher)
	.catch(e => {
		// Output the error
		console.log(e);
	})
	.then(() => {
		// Close the Session
		console.log('Games Have Been Deleted');
		return session.close();
	})
	.then(() => {
		// Close the Driver
		return driver.close();
	});