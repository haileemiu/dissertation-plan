const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// Handles POST request for new goal item
router.post('/', (req, res) => {
  const { name } = req.body;

  const queryText = 'INSERT INTO goals (user_id, name) VALUES ($1, $2) RETURNING id;';

  pool.query(queryText, [req.user.id, name])
    .then(() => { res.sendStatus(201); })
    .catch((error) => {
      console.log('Error in posting goal:', error);
      res.sendStatus(500);
    });
});

// Handles retrieving goal list
router.get('/', (req, res) => {
  const queryText = 'SELECT goals.id, goals.user_id, goals.name FROM person LEFT JOIN goals ON person.id = goals.user_id WHERE goal.user_id = $1;';

  pool.query(queryText, [req.user.id])
    .then((results) => { res.send(results.rows); })
    .catch((error) => {
      console.log('Error in getting goals:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
