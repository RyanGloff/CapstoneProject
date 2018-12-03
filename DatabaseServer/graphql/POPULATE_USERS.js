const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "password123"));

const session = driver.session();

const cypher = 'CREATE (u1:User { id: 1, username: "houdea", password: "password123", lastName: "Houde", firstName: "Andrew", email: "houdea@email.com" }), (u2:User { id: 2, username: "gloffr", password: "pass123", lastName: "Gloff", firstName: "Ryan", email: "gloffr@email.com" }), (u3:User { id: 3, username: "kowalchykn", password: "test123", lastName: "Kowalchyk", firstName: "Nick", email: "kowalchykn@email.com" }), (u4:User { id: 4, username: "crazy", password: "123password", lastName: "Smith", firstName: "Tom", email: "smitht@email.com" })';

session.run(cypher)
	.catch(e => {
		// Output the error
		console.log(e);
	})
	.then(() => {
		// Close the Session
		console.log('Users Have Been Populated');
		return session.close();
	})
	.then(() => {
		// Close the Driver
		return driver.close();
	});