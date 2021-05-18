const router = require('express').Router();
const { checkIfUnique, checkPayload, checkUsernameExists } = require('../middleware/validateUser.js')

const Users = require("../users-model.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../secrets.js")

router.post('/register', checkPayload, checkIfUnique, async (req, res, next) => {
  //res.end('implement register, please!');
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
  try {
    const username = req.body.username
    const password = req.body.password

    const newUser = await Users.add({
      username,
      password: await bcrypt.hash(password, 8) // 2 ^ 8 rounds of hashing
    })

    res.status(201).json(newUser)

  } catch (err) {
    next(err)
  }
});

router.post('/login', checkPayload, checkUsernameExists, (req, res, next) => {
  //res.end('implement login, please!');
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
  const user = req.user;

  //Below code enables creation of a new session for the user
  req.session.user = user;

  res.json({
    message: `Welcome ${user.username}!`,
  })
});

// This endpoint will help us clear out session for the user
router.get("/logout", async (req, res, next) => {
  //Checks whether a session exists or not
  if (!req.session || !req.session.user) {
    return res.status(200).json({
      message: "no session",
    })
  } else {
    //If the session exists for the user, clear it
    req.session.destroy((err) => {

      if (err) {

        next(err)
      } else {

        res.status(200).json({
          message: "logged out",

        })
      }
    })
  }
})

module.exports = router;
