const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// Handles adding new task to goal list
router.post('/', (req, res) => {
  // Adds for individual user_id and goal type
  const queryText = 'INSERT INTO goal_tasks (title, type_id) VALUES ($1, $2);';

  pool.query(queryText, [req.body.name, req.body.id])
    .then(() => { res.sendStatus(201); })
    .catch((error) => {
      console.log('Error in adding task:', error);
      res.sendStatus(500);
    });
});

// Handles marking steps complete or not complete
router.put('/:id/completed', (req, res) => {
  const queryText = 'UPDATE goal_tasks SET completed = $1 WHERE id=$2;';

  pool.query(queryText, [req.body.completed, req.params.id])
    .then(() => { res.sendStatus(200); })
    .catch((error) => {
      console.log('Error in adding goal:', error);
      res.sendStatus(500);
    });
});

// Handles editing tasks
router.put('/:id/edit', (req, res) => {
  const queryText = 'UPDATE goal_tasks SET title=$1 where id=$2;';

  pool.query(queryText, [req.body.name, req.params.id])
    .then(() => { res.sendStatus(200); })
    .catch((error) => {
      console.log('Error in editing goal:', error);
      res.sendStatus(500);
    });
});

// Handles deleting tasks
router.delete('/:id', (req, res) => {
  const queryText = 'DELETE FROM goal_tasks WHERE id=$1;';

  pool.query(queryText, [req.params.id])
    .then(() => { res.sendStatus(200); })
    .catch((error) => {
      console.log('Error in adding goal:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
