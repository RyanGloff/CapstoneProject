const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "password123"));

const session = driver.session();

const cypher = 'MATCH (n:Game) RETURN n';

function parseGame(record) {
    let game = record._fields[0].properties;
    game.id = game.id.low;
    game.timeStarted = game.timeStarted.low;
    for(let i = 0; i < game.users.length; i++) {
        game.timeLasted[i] = game.timeLasted[i].low;
        game.users[i] = game.users[i].low;
        game.results[i] = game.results[i].low;
    }
    return game;
}

session
	.run(cypher)
	.then(function(result){
		result.records.forEach(function(record){
			console.log(parseGame(record));
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

	