const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// Handles POST request for new goal item
router.post('/', (req, res) => {
  const { title } = req.body;

  const queryText = 'INSERT INTO goal (user_id, title) VALUES ($1, $2) RETURNING id;';

  pool.query(queryText, [req.user.id, title])
    .then(() => { res.sendStatus(201); })
    .catch((error) => {
      console.log('Error in posting goal:', error);
      res.sendStatus(500);
    });
});

// Handles retrieving goal list
router.get('/', (req, res) => {
  const queryText = 'SELECT goal.id, goal.title, goal.completed FROM person LEFT JOIN goal ON person.id = goal.user_id WHERE goal.user_id = $1;';

  pool.query(queryText, [req.user.id])
    .then((results) => { res.send(results.rows); })
    .catch((error) => {
      console.log('Error in getting goals:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
