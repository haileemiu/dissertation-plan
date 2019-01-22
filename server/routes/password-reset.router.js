// WIP
const express = require('express');
// const nodemailer = require('nodemailer');
const pool = require('../modules/pool');
const encryptLib = require('../modules/encryption');

const router = express.Router();

router.put('/', (req, res) => {
  const { password } = req.body;
  const encryptedPassword = encryptLib.encryptPassword(password);
  const queryToResetPassword = 'UPDATE person SET password=$1 WHERE email=$2;';

  pool.query(queryToResetPassword, [encryptedPassword, req.body.email])
    .then(() => { res.sendStatus(200); })
    .catch((error) => {
      console.log('Error in updating password:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
