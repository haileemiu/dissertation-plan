const express = require('express');
const pool = require('../modules/pool');
const nodemailer = require('nodemailer');
const router = express.Router();

// Transporter to send emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL, // To Do: Needs to be a different email from password reset
    pass: process.env.MAIL_PW,
  },
});

router.post('/', async (req, res) => {
  try {
    const mailConfig = {
      from: process.env.ADMIN_EMAIL,
      to: req.body.email,
      subject: 'Message from coaching app',
      html: `
      <p>Name: ${req.body.name}</>
        <ul>
          <li>Email: ${req.body.email}</li>
          <li>Area of Study: ${req.body.study}</li>
          <li>Stage of PhD: ${req.body.stage}</li>
          <li>How long have you been working?: ${req.body.length}</li>
        </ul>
        <p>${req.body.message}</p>
      `,
    };

    await transporter.sendMail(mailConfig);
    res.sendStatus(200);
  } catch (err) {
    console.log('Error in coaching contact router:', err);
    res.sendStatus(500);
  }
});

module.exports = router;
