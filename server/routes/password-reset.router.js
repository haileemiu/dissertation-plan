// WIP
const express = require('express');
const pool = require('../modules/pool');
// const nodemailer = require('nodemailer');

const router = express.Router();

// Transporter to send emails
// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.ADMIN_EMAIL, // WIP TO DO UPDATE
//     pass: process.env.MAIL_PW,
//   },
// });

router.get('/', async (req, res) => {
  try {
    // Checks to see if that email exists in the database
    const queryEmailExists = 'SELECT EXISTS (SELECT person.email FROM person WHERE email = $1);';

    let doesEmailExist = await pool.query(queryEmailExists, [req.query.email]);

    // Holds true or false as an answer
    doesEmailExist = doesEmailExist.rows[0].exists;
    console.log('doesEmailExist:', doesEmailExist);


  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// SAVE PREVIOUS WORKING STATE
// const queryEmailExists = 'SELECT EXISTS (SELECT person.email FROM person WHERE email = $1);';

// router.get('/', (req, res) => {
//   pool.query(queryEmailExists, [req.query.email])
//     .then((response) => {
//       console.log(response.rows); // WIP currently responds with [ { exists: false } ] or true correctly
//       // TO DO:
//       // trigger an email send
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.sendStatus(500);
//     });
// });

module.exports = router;
