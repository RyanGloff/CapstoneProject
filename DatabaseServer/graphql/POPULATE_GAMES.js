const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "password123"));

const session = driver.session();

const cypher = 'CREATE (g1:Game { id: 1, timeStarted: 70000, users: [1, 2, 3, 4], results: [3, 4, 2, 1], timeLasted: [16000, 15000, 16500, 17000] }), (g2:Game { id: 2, timeStarted: 100000, users: [1, 2, 3, 4], results: [3, 4, 2, 1], timeLasted: [32000, 25000, 46000, 46500] }), (g3:Game { id: 3, timeStarted: 150000, users: [1, 2, 3, 4], results: [2, 1, 4, 3], timeLasted: [20000, 25000, 15000, 16000] })';

session.run(cypher)
	.catch(e => {
		// Output the error
		console.log(e);
	})
	.then(() => {
		// Close the Session
		console.log('Games Have Been Populated');
		return session.close();
	})
	.then(() => {
		// Close the Driver
		return driver.close();
	});