// WIP
const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// Handles retrieving dissertation plan
// router.get('/', (req, res) => {

// Join the dissertation plan tables with the person table
// const queryText = 'SELECT from ;';

// pool.query(queryText, [req.user.id])
//   .then((results) => { res.send(results.rows); })
//   .catch((error) => {
//     console.log('Error in getting dissertation plan:', error);
//     res.sendStatus(500);
//   });
// });

// ?? Handles adding new section heading to disseration plan??

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
