const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "password123"));

const session = driver.session();

const cypher = 'CREATE (u1:User { id: 1, username: "houdea", password: "password123", lastName: "Houde", firstName: "Andrew", email: "houdea@email.com" })';

session.run(cypher)
	.catch(e => {
		// Output the error
		console.log(e);
	})
	.then(() => {
		console.log('User Inserted');
		return session.close();
	})
	.then(() => {
		// Close the Driver
		return driver.close();
	});