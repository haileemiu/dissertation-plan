const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();
/*
// ORIGINAL DESIGN
// // Handles POST request for new goal created
// router.post('/', (req, res) => {
//   const { goal } = req.body;
//   const { instancesPerWeek } = req.body;

//   // Uses the user_id to save new goal
//   const queryText = 'INSERT INTO goals (user_id, goal, instances_per_week) VALUES ($1, $2, $3) RETURNING id;';

//   pool.query(queryText, [req.user.id, goal, instancesPerWeek])
//     .then(() => { res.sendStatus(201); })
//     .catch((error) => {
//       console.log('Error in adding goal:', error);
//       res.sendStatus(500);
//     });
// });

// // Handles retrieving the list of goals that the user previously created
// router.get('/', (req, res) => {
//   // Joins the goals and person table
//   const queryText = 'SELECT goals.id, goals.user_id, goals.goal, instances_per_week FROM person LEFT JOIN goals ON person.id = goals.user_id WHERE goals.user_id = $1;';

//   pool.query(queryText, [req.user.id])
//     .then((results) => { res.send(results.rows); })
//     .catch((error) => {
//       console.log('Error in getting goals:', error);
//       res.sendStatus(500);
//     });
// });
*/

router.get('/', async (req, res) => {
  try {
    const queryGoalTypes = 'SELECT * FROM goal_types WHERE user_id=$1;';
    const types = await pool.query(queryGoalTypes, [req.user.id]);

    const typesRows = types.rows;

    const typeHeadingsIds = typesRows.map(type => type.id);

    const typesIds = typeHeadingsIds.join(',');

    const tasksByType = await pool.query(`SELECT * FROM goal_tasks WHERE type_id IN (${typesIds}) ORDER BY id;`);

    const rowsOfStepsByType = tasksByType.rows;

    const responseArray = typesRows.map(type => ({
      ...type,
      task: Array.from(rowsOfStepsByType).filter(task => task.type_id === type.id),
    }));

    res.send(responseArray);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// Handles adding new steps to dissertation plan
router.post('/', (req, res) => {
  // Adds for individual user_id and section heading
  const queryText = 'INSERT INTO dissertation_steps (name, section_id) VALUES ($1, $2);';

  pool.query(queryText, [req.body.name, req.body.id])
    .then(() => { res.sendStatus(201); })
    .catch((error) => {
      console.log('Error in adding step:', error);
      res.sendStatus(500);
    });
});

// Handles marking steps complete or not complete
router.put('/:id/completed', (req, res) => {
  const queryText = 'UPDATE dissertation_steps SET completed = $1 WHERE id=$2;';

  pool.query(queryText, [req.body.completed, req.params.id])
    .then(() => { res.sendStatus(200); })
    .catch((error) => {
      console.log('Error in adding goal:', error);
      res.sendStatus(500);
    });
});

// Handles editing steps in dissertation plan
router.put('/:id/edit', (req, res) => {
  const queryText = 'UPDATE dissertation_steps SET name=$1 where id=$2;';

  pool.query(queryText, [req.body.name, req.params.id])
    .then(() => { res.sendStatus(201); })
    .catch((error) => {
      console.log('Error in editing goal:', error);
      res.sendStatus(500);
    });
});


// Handles deleting steps in dissertation plan
router.delete('/:id', (req, res) => {
  const queryText = 'DELETE FROM dissertation_steps WHERE id=$1;';

  pool.query(queryText, [req.params.id])
    .then(() => { res.sendStatus(200); })
    .catch((error) => {
      console.log('Error in adding goal:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
