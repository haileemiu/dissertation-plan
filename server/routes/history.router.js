const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// Handles adding a new entry to the goals_history table based on the goal_id
// (because the goal_id is inherently connected to the user_id)
// by inserting a new row into the table
// (because on insert the table saves the date on default)
router.post('/', (req, res) => {
  const queryText = 'INSERT INTO goals_history (goal_id) VALUES ($1);';

  pool.query(queryText, [req.query.goalId])
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error in adding history:', err);
      res.sendStatus(500);
    });
});

module.exports = router;
