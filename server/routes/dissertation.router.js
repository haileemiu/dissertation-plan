// WIP
const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    // Handles retrieving dissertation sections
    const querySections = `
    SELECT 
    dissertation_sections.id AS sectionId,
    dissertation_sections.name AS sectionName, 
    dissertation_sections.name AS userId
    FROM dissertation_sections 
    WHERE user_id = $1
    RETURNING id;`;

    const sections = await pool.query(querySections, [req.user.id]);

    // Handles retrieving the dissertation steps
    const querySteps = `
    SELECT 
    dissertation_steps.id AS stepId,
    dissertation_steps.name AS step,
    dissertation_steps.section_id AS sectionIdReference,
    dissertation_steps.completed AS completed
    FROM dissertation_steps
    WHERE section_id = $1;`;
    await pool.query(querySteps, [sections]);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// WIP TEST
// Get just the section name
// router.get('/', (req, res) => {
//   const queryText = 'SELECT name from dissertation_sections WHERE user_id = $1;';

//   pool.query(queryText, [req.user.id])
//     .then((results) => { res.send(results.rows); })
//     .catch((error) => {
//       console.log('Error in getting dissertation plan:', error);
//       res.sendStatus(500);
//     });
// });

// ?? Handles adding new section heading to dissertation plan??

// Handles adding new steps to dissertation plan
// router.post('/', (req, res) => {
// Adds for individual user_id and section heading
//   const queryText = 'INSERT INTO ;';

//   pool.query(queryText, [req.user.id])
//     .then(() => { res.sendStatus(201); })
//     .catch((error) => {
//       console.log('Error in adding step:', error);
//       res.sendStatus(500);
//     });
// });

// Handles editing steps in dissertation plan
// router.put(('/', (req, res) => {
//   const queryText = 'UPDATE -- SET -- = $1 where id=$2;';

//   pool.query(queryText, [req.user.id])
//     .then(() => { res.sendStatus(201); })
//     .catch((error) => {
//       console.log('Error in adding goal:', error);
//       res.sendStatus(500);
//     });
// }));

// Handles deleting steps in dissertation plan
// router.delete(('/', (req, res) => {
//   const queryText = 'DELETE FROM -- WHERE id=$;';

//   pool.query(queryText, [req.user.id])
//     .then(() => { res.sendStatus(201); })
//     .catch((error) => {
//       console.log('Error in adding goal:', error);
//       res.sendStatus(500);
//     });
// }));

module.exports = router;
