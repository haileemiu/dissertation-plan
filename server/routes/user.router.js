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
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const { email } = req.body;
  const { username } = req.body;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = 'INSERT INTO person (email, username, password) VALUES ($1, $2, $3) RETURNING id';

  // WIP
  // TODO: add real section headings
  // Create the default dissertation_plan data for the new user
  // No need for data sterilization because this is not based on user input
  pool.query(queryText, [email, username, password])
    .then((results) => {
      console.log('results.rows[0].id', results.rows[0].id);
      const querySections = `INSERT INTO dissertation_sections (user_id, name) VALUES (${results.rows[0].id}, 'Temporary Section 1'), (${results.rows[0].id}, 'Temporary Section 2') RETURNING id;`;
      pool.query(querySections)
        .then((result) => {
          const querySteps = `INSERT INTO dissertation_steps (name, section_id) VALUES ('temp step 1' ${result.rows[0].id}), ('temp step 2' ${result.rows[0].id});`;

          pool.query(querySteps)
            .then(() => { res.sendStatus(201); })
            .catch(() => { res.sendStatus(500); });

          res.sendStatus(201);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });

      res.sendStatus(201);
    })
    .catch((err) => { next(err); });
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
