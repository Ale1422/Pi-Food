require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session')
const sequelizeStore = require('connect-session-sequelize')(session.Store)
const passport = require('passport')
const cors = require('cors')
const {DB_USER, DB_PASSWORD, DB_HOST,DB_PORT,DATABASE} = process.env


const routes = require('./routes/index.js');
const { sequelize } = require('./db.js');

require('./db.js');
require('./authentication.js')(passport)

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
server.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
server.use(session({
  secret:'food',
  resave: false,
  saveUninitialized: true,
  store: new sequelizeStore({
    db: sequelize
  }),
  proxy: true
}));
server.use(cookieParser('food'));
server.use(passport.initialize());
server.use(passport.session())



server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
