const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "password123"));

const session = driver.session();

const cypher = 'MATCH (n:User) RETURN n';

function parseUser(record) {
	let user = record._fields[0].properties;
    user.id = user.id.low;
	return user;
}

session
	.run(cypher)
	.then(function(result){
		result.records.forEach(function(record){
			console.log(parseUser(record));
		});
	})
	.catch(function(err){
		console.log(err);
	})
	.then(() => {
		// Close the Session
		return session.close();
	})
	.then(() => {
		// Close the Driver
		return driver.close();
	});






