// Path: /api/forgot-password
const express = require('express');
const nodemailer = require('nodemailer');
const pool = require('../modules/pool');
const encryptLib = require('../modules/encryption');
const uuidv1 = require('uuid/v1');


const router = express.Router();

// Transporter to send emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL, // WIP TO DO UPDATE
    pass: process.env.MAIL_PW,
  },
});

// 1) Checks to see if email exists in the database
// 2) Either sends a link to reset password OR send an email informing user that email is not registered
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

      // Create a temp_key using node uuid library
      // and sets temp_key_active to true
      const tempKey = uuidv1();
      const queryTempKeyCreate = 'UPDATE person SET temp_key=$1, temp_key_active=true WHERE email=$2;';
      
      await pool.query(queryTempKeyCreate, [tempKey, req.query.email]);
      // Create link to send to user
      const passwordResetLink = `${process.env.PUBLIC_URL}/#/password-reset/?&key=` + encodeURIComponent(`${tempKey}`);
      
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

module.exports = router;
