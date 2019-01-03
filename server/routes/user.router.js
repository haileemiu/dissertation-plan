const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
router.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const encryptedPassword = encryptLib.encryptPassword(password);

    // Registers user
    const queryText = 'INSERT INTO person (email, username, password) VALUES ($1, $2, $3) RETURNING id';

    // TODO: add real section headings
    const results = await pool.query(queryText, [email, username, encryptedPassword]);

    // Creates the default dissertation_plan data for the new user
    // No need for data sterilization because this is not based on user input
    const insertResult = await pool.query(`INSERT INTO dissertation_sections (user_id, name) VALUES (${results.rows[0].id}, 'Temporary Section 1'), (${results.rows[0].id}, 'Temporary Section 2') RETURNING id;`);

    // Creates the default dissertation_steps
    await pool.query(`INSERT INTO dissertation_steps (name, section_id) VALUES ('temp step 1a', ${insertResult.rows[0].id}), ('temp step 1b', ${insertResult.rows[0].id}), ('temp step 2a', ${insertResult.rows[1].id});`);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.get('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
