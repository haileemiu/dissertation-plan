// WIP
const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const querySectionHeadings = 'SELECT * FROM dissertation_sections WHERE user_id=$1;';
    const sectionHeadings = await pool.query(querySectionHeadings, [req.user.id]);
    // console.log(sectionHeadings);

    const sectionHeadingsRows = sectionHeadings.rows;
    // console.log(sectionHeadingsRows);

    const sectionHeadingsIds = sectionHeadingsRows.map(section => section.id);
    // console.log(sectionHeadingsIds);

    const sectionIds = sectionHeadingsIds.join(',');
    // console.log(sectionIds);

    const stepsBySection = await pool.query(`SELECT * FROM dissertation_steps WHERE section_id IN (${sectionIds}) ORDER BY id;`);
    // console.log(stepsBySection.rows);

    const rowsOfStepsBySection = stepsBySection.rows;

    const responseArray = sectionHeadingsRows.map(section => ({
      ...section,
      step: Array.from(rowsOfStepsBySection).filter(step => step.section_id === section.id),
    }));

    res.send(responseArray);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// Handles marking steps complete or not complete
router.put('/:id', (req, res) => {
  const queryText = 'UPDATE dissertation_steps SET completed = $1 WHERE id=$2;';

  pool.query(queryText, [req.body.completed, req.params.id])
    .then(() => { res.sendStatus(200); })
    .catch((error) => {
      console.log('Error in adding goal:', error);
      res.sendStatus(500);
    });
});

// WIP
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

// Handles editing steps in dissertation plan
// NOTE: remember there is another put in this router
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
