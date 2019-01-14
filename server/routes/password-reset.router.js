// WIP
const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

const queryEmailExists = 'SELECT EXISTS (SELECT person.email FROM person WHERE email = $1);';

router.get('/', (req, res) => {
  pool.query(queryEmailExists, [req.query.email])
    .then((response) => {
      console.log(response.rows);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
