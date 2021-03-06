// /api/goals/types
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


// Handles retrieving goal types with goal tasks
router.get('/', async (req, res) => {
  try {
    const queryGoalTypes = 'SELECT * FROM goal_types WHERE user_id=$1 ORDER BY id;';
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

// Handles adding new goal type/section
router.post('/', (req, res) => {
  console.log('req.body:', req.body);
  console.log('req.user.id:', req.user.id);
  const queryAddNewGoalType = 'INSERT INTO goal_types (user_id, title) VALUES ($1, $2);';

  pool.query(queryAddNewGoalType, [req.user.id, req.body.title])
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error in adding section:', err);
      res.sendStatus(500);
    });
});

router.put('/:id/edit', (req, res) => {
  const queryEditType = 'UPDATE goal_types SET title=$1 WHERE id=$2;';

  pool.query(queryEditType, [req.body.title, req.params.id])
    .then(() => { res.sendStatus(200); })
    .catch((error) => {
      console.log('Error in editing goal type:', error);
      res.sendStatus(500);
    });
});

router.put('/:id/uncheck', (req, res) => {
  const queryToUncheckAllOneType = 'UPDATE goal_tasks SET completed=false WHERE type_id=$1;';

  pool.query(queryToUncheckAllOneType, [req.params.id])
    .then(() => { res.sendStatus(200); })
    .catch((error) => {
      console.log('Error in unchecking goals:', error);
      res.sendStatus(500);
    });
});

// WIP
// Possibly a more efficient and less error prone way to complete this
router.delete('/:id', async (req, res) => {
  try {
    const queryToDeleteTasks = await `DELETE FROM goal_tasks WHERE type_id=${req.params.id}`;

    await pool.query(queryToDeleteTasks);

    const queryToDeleteTypes = await `DELETE FROM goal_types WHERE id=${req.params.id}`;

    await pool.query(queryToDeleteTypes);

    res.sendStatus(202); // code for delete
  } catch (err) {
    console.log('Error in deleting', err);
    res.sendStatus(500);
  }
});

module.exports = router;
