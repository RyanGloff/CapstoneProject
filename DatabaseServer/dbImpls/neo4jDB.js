var neo4j = require('neo4j-driver').v1;
const url = "bolt://localhost:7687";
const authentication =  neo4j.auth.basic("neo4j", "password123");

async function createConnection (url, authentication) {
    const driver = await neo4j.driver(url, authentication);
    return await driver.session();
    
}

function parseUser(record) {
	let user = record._fields[0].properties;
    user.id = user.id.low;
	return user;
}

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

async function select (query) {
	const session = await createConnection(url, authentication);
    const result = await session.run(query);
    await session.close();
	return result;
}

async function insertInto (query) {
	const session = await createConnection(url, authentication);
    await session.run(query);
    await session.close();
}

async function deleteFrom (query) {
    const session = await createConnection(url, authentication);
    await session.run(query);
    await session.close();
}

async function getUsers () {
    const query = 'MATCH (n:User) RETURN n';
    let records = (await select(query)).records;
    let users = [];
    for (let i = 0; i < records.length; i++) {
        users.push(parseUser(records[i]));
    }
    return users;
}

async function getUserById (id) {
	const query = 'MATCH (users:User) WHERE users.id = ' + id + ' RETURN users';
    let records = (await select(query)).records;
    let users = [];
    for (let i = 0; i < records.length; i++) {
        users.push(parseUser(records[i]));
    }
    return users;

}

async function addUser (user) {
    let dbUser = await getUserById(user.id);
    if (dbUser.length === 0) {
		const query = 'CREATE (u'+ user.id +':User { id: ' + user.id + ', username: "' + user.username + '", password: "' + user.password + '", lastName: "' + user.lastName + '", firstName: "' + user.firstName + '", email: "' + user.email + '" })';
        await insertInto(query);
        return {
            success: true,
            id: user.id
        };
    }
    return {
        success: false,
        reason: 409
    };
}

async function deleteUser (id) {
	const query = 'MATCH (users:User) WHERE users.id = ' + id + ' DETACH DELETE users';
    await deleteFrom(query);
}

async function deleteAllUsers () {
	const query = 'MATCH (users:User) DETACH DELETE users';
    await deleteFrom(query);
}

async function areValidCredentials (credentials) {
	const query = 'MATCH (users:User) WHERE users.username = ' + credentials.username + ' RETURN users.password';
    let res = await select(query);
    return res[0].password === credentials.password;
}

async function getGames () {
	const query = 'MATCH (n:Game) RETURN n';
    let records = (await select(query)).records;
    let games = [];
    for (let i = 0; i < records.length; i++) {
        games.push(parseGame(records[i]));
    }
    return games;
}

async function getGameById (id) {
	const query = 'MATCH (games:Game) WHERE games.id = ' + id + ' RETURN games';
    let records = (await select(query)).records;
    let games = [];
    for (let i = 0; i < records.length; i++) {
        games.push(parseGame(records[i]));
    }
    return games;
}

async function addGame (game) {
    let dbGame = await getGameById(game.id);
    if (dbGame.length === 0) {
		const query = 'CREATE (g' + game.id + ':Game { id: ' + game.id + ', timeStarted: ' + game.timeStarted + ', users: [' + game.users + '], results: [' + game.results + '], timeLasted: [' + game.timeLasted + ']})';
        
        await insertInto(query);
        return {
            success: true,
            id: game.id
        };
    }
    return {
        success: false,
        reason: 409
    };
}

async function deleteGame (id) {
	const query = 'MATCH (games:Game) WHERE games.id = ' + id + ' DETACH DELETE games';
    await deleteFrom(query);
	return {success: true};
}

async function deleteAllGames () {
	const query = 'MATCH (games:Game) DETACH DELETE games';
    await deleteFrom(query);
	return {success: true};
}
	
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.addUser = addUser;
exports.deleteUser = deleteUser;
exports.deleteAllUsers = deleteAllUsers;

exports.areValidCredentials = areValidCredentials;

exports.getGames = getGames;
exports.getGameById = getGameById;
exports.addGame = addGame;
exports.deleteGame = deleteGame;
exports.deleteAllGames = deleteAllGames;