
var MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/Capstone";


async function select (collection, query) {
	const db = await MongoClient.connect(url);
	const dbCollection = db.collection(collection);
	const result = await dbCollection.find(query).toArray();
	return result;
}

async function insertInto (collection, query) {
	const db = await MongoClient.connect(url);
	const dbCollection = db.collection(collection);
	const result = await dbCollection.insertOne(query);
}

async function deleteFrom (collection, query) {
	const db = await MongoClient.connect(url);
	const dbCollection = db.collection(collection);
	const result = await dbCollection.deleteMany(query);
}

async function getUsers () {
	const collection = 'UserInfo';
	const query = {};
    return await select(collection, query);
}

async function getUserById (id) {
	const collection = 'UserInfo';
    const query = { id: id};
    let res = await select(collection, query);
    return res[0];
}

async function addUser (user) {
	const collection = 'UserInfo';
    let dbUser = await getUserById(user.id);
    if (dbUser === undefined) {
        const query = { id: user.id, username: user.username, password: user.password, lastName: user.lastName, firstName: user.firstName, email: user.email};
        await insertInto(collection, query);
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
	const collection = 'UserInfo';
    const query = { id: id};
    await deleteFrom(collection, query);
}

async function deleteAllUsers () {
	const collection = 'UserInfo';
    const query = {};
    await deleteFrom(collection, query);
}

async function areValidCredentials (credentials) {
	const collection = 'UserInfo';
    const query = { username: credentials.username};
    let res = await select(collection, query);
    return res[0].password === credentials.password;
}

async function getGames () {
	const collection = 'GameInfo';
    const query = {};
    return await select(collection, query);
}

async function getGameById (id) {
	const collection = 'GameInfo';
    const query = { id: id};
    let res = await select(collection, query);
    return res[0];
}

async function addGame (game) {
	const collection = 'GameInfo';
    let dbUser = await getGameById(game.id);
    if (dbUser === undefined) {
        const query = { id: game.id, timeStarted: game.timeStarted, users: game.users, results: game.results, timeLasted: game.timeLasted};
        await insertInto(collection, query);
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
	const collection = 'GameInfo';
    const query = { id: id};
    await deleteFrom(collection, query);
	return {success: true};
}

async function deleteAllGames () {
	const collection = 'GameInfo';
    const query = {};
    await deleteFrom(collection, query);
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