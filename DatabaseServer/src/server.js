var express = require('express');  
var app = express();  
var server = require('http').createServer(app);
var bodyParser = require('body-parser');

var commander = require('commander');

commander
  .option('-c, --connector [type]', 'Add the type of db implementation', 'MemoryBasedDB')
  .parse(process.argv);

console.log('Using', commander.connector, 'db implementation');
const dbConnector = require('./dbImpls/' + commander.connector);
const restAuditer = require('./restAuditer.js');

const usersRouter = require('./routers/usersRouter');
const gamesRouter = require('./routers/gamesRouter');
const loginRouter = require('./routers/loginRouter');

app.use(bodyParser.json());

usersRouter.addEndpoints(app, restAuditer, dbConnector);
gamesRouter.addEndpoints(app, restAuditer, dbConnector);
loginRouter.addEndpoints(app, restAuditer, dbConnector);

server.listen(8081);