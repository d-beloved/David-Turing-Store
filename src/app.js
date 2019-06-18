import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import router from './routes';
import connectSession from 'connect-session-sequelize';
import { sequelize } from './models';

require('dotenv').config();

// initialize sequelize with session store
const SequelizeStore = connectSession(session.Store);
const store = new SequelizeStore({
  db: sequelize
})


// This will be our application entry. We'll setup our server here.
const http = require('http');

// Set up the express app
const app = express();

// set up the Cors security for allowing requests from frontend
const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000', 'https://turing-shop-client.herokuapp.com', 'https://davidayodeji-turing.netlify.com'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// // initialize cookie-parser to allow us access the cookies stored in the browser.
// app.use(cookieParser());

// initialize express-session to allow us track the user across sessions.
app.use('/stripe', express.static(`${__dirname}/public`));

app.use(session({
  key: 'user_sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store
}));


// creates the table for the session storage ifNotExist
store.sync()

app.use(router);

export default app;
