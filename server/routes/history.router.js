const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

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
