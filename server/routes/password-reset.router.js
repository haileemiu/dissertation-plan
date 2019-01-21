// WIP
const express = require('express');
const nodemailer = require('nodemailer');
const pool = require('../modules/pool');


const router = express.Router();

// Transporter to send emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL, // WIP TO DO UPDATE
    pass: process.env.MAIL_PW,
  },
});

router.get('/', async (req, res) => {
  try {
    // Checks to see if that email exists in the database
    const queryEmailExists = 'SELECT EXISTS (SELECT person.email FROM person WHERE email = $1);';

    let doesEmailExist = await pool.query(queryEmailExists, [req.query.email]);

    // Holds true or false as an answer
    doesEmailExist = doesEmailExist.rows[0].exists;

    // If email exists, send code email
    if (doesEmailExist) {
      // Sets up email to be sent
      const mailConfig = {
        from: process.env.ADMIN_EMAIL,
        to: req.query.email,
        subject: 'Taina Password Reset',
        html: '<p><b>reset</b></p>',
      };

      await transporter.sendMail(mailConfig);

      // If email does not exist, send info email
    } else {
      // Sets up email to be sent
      const mailConfig = {
        from: process.env.ADMIN_EMAIL,
        to: req.query.email,
        subject: 'Taina Email not found',
        html: '<p><b>not found</b></p>',
      };

      await transporter.sendMail(mailConfig);
    }
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
