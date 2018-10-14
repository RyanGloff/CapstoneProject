const pg = require('pg');

var config = {
  user: 'postgres', // env var: PGUSER
  database: 'Capstone', // env var: PGDATABASE
  password: 'password123', // env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, // env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
};

const pool = new pg.Pool(config);

async function getUsers () {
	const client = await pool.connect();
  let res;
  try {
    res = await client.query('SELECT "username", "password", "lastName", "firstName", "email" FROM public."UserInfo";');
  } finally {
    client.release();
  }
  return res.rows;
}

async function getUserById (id) {
	const client = await pool.connect();
  let res;
  try {
      res = await client.query('SELECT "username", "password", "lastName", "firstName", "email" FROM public."UserInfo" WHERE "id" = ' + id + ';');
  } finally {
    client.release()
  }
  return res.rows[0]
}

async function addUser (user) {
	let dbUser = await getUserById(user.id);
	if (dbUser === undefined) {
		const client = await pool.connect();
		try {
			const query = 'INSERT INTO public."UserInfo"("id", "username", "password", "lastName", "firstName", "email") VALUES (' + user.id + ' , \'' + user.username + '\' , \'' + user.password + '\' , \'' + user.lastName + '\' , \'' + user.firstName + '\' , \'' + user.email + '\');';
			await client.query(query);
		} finally {
			client.release();
	  }
		return {success: true , id: user.id};
	}
	return {success: false , reason: 409};
}

async function deleteUser (id) {
	const client = await pool.connect();
	try {
		await client.query('DELETE FROM public."UserInfo" WHERE "id" = ' + id + ';');
	} finally {
		client.release();
	}
}

async function deleteAllUsers () {
	const client = await pool.connect();
  try {
    await client.query('DELETE FROM public."UserInfo";');
  } finally {
    client.release();
  }
}

async function areValidCredentials (credentials) {
	const client = await pool.connect();
  let res;
  try {
      res = await client.query('SELECT "password" FROM public."UserInfo" WHERE "username" = \'' + credentials.username + '\';');
  } finally {
    client.release();
  }
return res.rows[0].password == credentials.password;
}

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.addUser = addUser;
exports.deleteUser = deleteUser;
exports.deleteAllUsers = deleteAllUsers;

exports.areValidCredentials = areValidCredentials;