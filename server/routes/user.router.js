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

    const results = await pool.query(queryText, [email, username, encryptedPassword]); // holds the user's id

    // console.log(results);

    await pool.query(
      `INSERT INTO goal_types (user_id, title) VALUES 
      (${results.rows[0].id}, 'Coursework'),
      (${results.rows[0].id}, 'Research'), 
      (${results.rows[0].id}, 'Writing'),
      (${results.rows[0].id}, 'Fitness'),  
      (${results.rows[0].id}, 'Self-care'),
      (${results.rows[0].id}, 'Family and friends'),
      (${results.rows[0].id}, 'Chores'),
      (${results.rows[0].id}, 'Other');`,
    );


    // Creates the default dissertation_plan data for the new user by holding the id's the sections to be used in the creation of steps
    // No need for data sterilization because this is not based on user input
    const insertResult = await pool.query(`
        INSERT INTO dissertation_sections (user_id, name) VALUES 
        (${results.rows[0].id}, 'During Course Work'),
        (${results.rows[0].id}, 'Proposal Development'), 
        (${results.rows[0].id}, 'Proposal Defense'),
        (${results.rows[0].id}, 'Conducting Research'),  
        (${results.rows[0].id}, 'Dissertation Writing'),
        (${results.rows[0].id}, 'Dissertation Defense')
        RETURNING id;`);

    // console.log(insertResult);
    // Creates the default dissertation_steps
    await pool.query(`
      INSERT INTO dissertation_steps (name, section_id) VALUES
      ('Become acquainted with library and librarian', ${insertResult.rows[0].id}),
      ('Become acquainted with issues and literature in the field', ${insertResult.rows[0].id}),
      ('Search for dissertation topic', ${insertResult.rows[0].id}),
      ('Search for dissertation director', ${insertResult.rows[0].id}),
      ('Choose a topic', ${insertResult.rows[0].id}),
      ('Choose a director', ${insertResult.rows[0].id}),
      ('Choose other committee members', ${insertResult.rows[0].id}),

      ('Develop a topic', ${insertResult.rows[1].id}),
      ('Consider grant or loan application if necessary', ${insertResult.rows[1].id}),
      ('Begin meeting with director to discuss proposal', ${insertResult.rows[1].id}),
      ('Find out requirements for proposal submission', ${insertResult.rows[1].id}),
      ('Outline proposal', ${insertResult.rows[1].id}),
      ('Complete detailed review of literature; construct theoretical framework; write review of literature chapter', ${insertResult.rows[1].id}),
      ('Decide on methodology; write method chapter', ${insertResult.rows[1].id}),
      ('Give proposal to committee', ${insertResult.rows[1].id}),

      ('File paperwork and schedule defense', ${insertResult.rows[2].id}),
      ('Arrange permission, community contracts, and other preliminaries', ${insertResult.rows[2].id}),
      ('Defend proposal', ${insertResult.rows[2].id}),
      ('Revise proposal if necessary', ${insertResult.rows[2].id}),

      ('Meet with director to draw up schedule for research', ${insertResult.rows[3].id}),
      ('Conduct research for study', ${insertResult.rows[3].id}),
      ('Analyze data from research', ${insertResult.rows[3].id}),

      ('Outline dissertation', ${insertResult.rows[4].id}),
      ('Meet with director to discuss outline and preliminary data analysis', ${insertResult.rows[4].id}),
      ('Update proposal chapters for dissertation', ${insertResult.rows[4].id}),
      ('Write results chapter', ${insertResult.rows[4].id}),
      ('Write summary and conclusions chapter ', ${insertResult.rows[4].id}),
      ('Find out requirements for submission and scheduling of final oral defense', ${insertResult.rows[4].id}),
      ('Polish writing; consult with editor if necessary', ${insertResult.rows[4].id}),
      ('Submit draft of dissertation to committee', ${insertResult.rows[4].id}),
      
      ('Submit dissertation paperwork and schedule for oral defense', ${insertResult.rows[5].id}),
      ('Have dissertation professionally typed or printed from word processor', ${insertResult.rows[5].id}),
      ('Defend dissertation', ${insertResult.rows[5].id}),
      ('Make minor revisions, if necessary', ${insertResult.rows[5].id}),
      ('Graduate', ${insertResult.rows[5].id});`);

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
