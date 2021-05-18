const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

//express-session package enables us to store the cookie received by the client and let them stay logged in. 
//However, the session authentication will be lost once the server restarts

const session = require("express-session")

//connect-session-knex package helps us store the session for a user directly on the server. 
// The benefit of using connect-session-knex is that the user session is not lost even after the server restarts

const KnexSessionStore = require("connect-session-knex")(session)
const db = require("../data/dbConfig.js")

const restrict = require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session({
    name: 'chocolatechip',
    resave: false,
    saveUninitialized: false,
    secret: "keep it secret keep it safe",

    //store property will let us store the session directly inside the database
    store: new KnexSessionStore({
        //configured instance of knex
        knex: db,

        //creates a session table automatically, rather than doing a migration for it
        createtable: true,
    })
}))

server.use('/api/auth', authRouter);
server.use('/api/jokes', restrict, jokesRouter); // only logged-in users should have access!


//This is a catch-all error-handling middleware
server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    })
})

module.exports = server;
