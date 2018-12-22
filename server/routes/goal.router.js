const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Handles POST request for new goal item
router.post('/', (req, res) => {
  const { title } = req.body;

  const queryText = 'INSERT INTO goal (user_id, title) VALUES ($1, $2) RETURNING id;'

  pool.query(queryText, [req.user.id, title])
    .then(() => { res.sendStatus(201); })
    .catch((error) => {
      console.log('Error in posting goal:', error);
      res.sendStatus(500);
    })
})

module.exports = router;
