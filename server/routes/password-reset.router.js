// WIP
/* Path: /api/password-reset */
const express = require('express');
// const nodemailer = require('nodemailer');
const pool = require('../modules/pool');
const encryptLib = require('../modules/encryption');

const router = express.Router();

// WIP
// This will check if the temp_key and temp_key_active=true
router.get('/', (req, res) => {
  console.log('req.query.key:', req.query.key);
  
  const queryForLinkActive = 'SELECT temp_key, temp_key_active FROM person WHERE temp_key=$1;';

  pool.query(queryForLinkActive, [req.query.key])
    .then((response) => {
      console.log('response:', response.rows[0].temp_key_active);
      // TO DO: send info then give message if link is active or not
      res.send(response.rows[0].temp_key_active);
    })
    .catch((err) => {
      console.log('Error:', err);
      res.sendStatus(500);
    });
});


// Adds new password to database (if key matches)
// Sets temp_key_active to false
router.put('/', (req, res) => {
  
  // NEED TO CHANGE FOR CHECKING HERE

  const { password } = req.body;
  const encryptedPassword = encryptLib.encryptPassword(password);
  const queryToResetPassword = 'UPDATE person SET password=$1, temp_key_active=false WHERE email=$2;'; // TO DO: here is where to check for key?

  pool.query(queryToResetPassword, [encryptedPassword, req.body.email])
    .then(() => { res.sendStatus(200); })
    .catch((error) => {
      console.log('Error in updating password:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
