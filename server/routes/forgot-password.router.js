// WIP
const express = require('express');
const nodemailer = require('nodemailer');
const pool = require('../modules/pool');
const encryptLib = require('../modules/encryption');


const router = express.Router();

// Transporter to send emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL, // WIP TO DO UPDATE
    pass: process.env.MAIL_PW,
  },
});

// Generate random strings
const generateRandomString = () => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  const stringLength = 8;
  let randomString = '';
  for (let i = 0; i < stringLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    randomString += chars.substring(randomNumber, randomNumber + 1);
  }
  return randomString;
};

router.get('/', async (req, res) => {
  try {
    // Checks to see if that email exists in the database
    const queryEmailExists = 'SELECT EXISTS (SELECT person.email FROM person WHERE email = $1);';
    let doesEmailExist = await pool.query(queryEmailExists, [req.query.email]);

    // Holds true or false as an answer
    doesEmailExist = doesEmailExist.rows[0].exists;

    // If email exists, send code email
    if (doesEmailExist) {
      /* IF WE GO THE SEND CODE ROUTE
      // const code = await generateRandomString();

      // // Sets up email to be sent
      // const mailConfig = {
      //   from: process.env.ADMIN_EMAIL,
      //   to: req.query.email,
      //   subject: 'Taina Password Reset',
      //   html: `<p><b>${code}</b></p>`,
      // };
      */

      // WIP
      // Create a temp_key with a timeout
      const tempKeyToEncrypt = generateRandomString();
      const tempKeyToSend = encryptLib.encryptPassword(tempKeyToEncrypt);
      const queryTempKeyCreate = 'UPDATE person SET temp_key=$1, temp_key_timeout=current_date+1 WHERE email=$2;';
      // Updates the database with temp_key and timeout
      await pool.query(queryTempKeyCreate, [tempKeyToSend, req.query.email]);
      // Create link to send to user
      const passwordResetLink = `${process.env.PUBLIC_URL}/#/password-reset/?email=` + encodeURIComponent(`${req.query.email}`) + `&key=` + encodeURIComponent(`${tempKeyToSend}`);
      // Sets up email to be sent
      const mailConfig = {
        from: process.env.ADMIN_EMAIL,
        to: req.query.email,
        subject: 'Taina Password Reset',
        html: `<p><a href=${passwordResetLink}>Reset Password</a></p>`,
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
      res.sendStatus(200);
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
