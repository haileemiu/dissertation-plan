// Path: /api/password-reset
const express = require('express');
const pool = require('../modules/pool');
const encryptLib = require('../modules/encryption');

const router = express.Router();

// This will check if the temp_key and temp_key_active=true
router.get('/', (req, res) => {
  const queryForLinkActive = 'SELECT temp_key, temp_key_active FROM person WHERE temp_key=$1;';

  pool.query(queryForLinkActive, [req.query.key])
    .then((response) => {
      res.send(response.rows[0].temp_key_active); // Sends true or false
    })
    .catch((err) => {
      console.log('Error:', err);
      res.sendStatus(500);
    });
});


// Adds new password to database
// Sets temp_key_active to false
router.put('/', (req, res) => {
  const { password, key } = req.body;

  const encryptedPassword = encryptLib.encryptPassword(password);
  const queryToResetPassword = 'UPDATE person SET password=$1, temp_key_active=false WHERE temp_key=$2;';

  pool.query(queryToResetPassword, [encryptedPassword, key])
    .then(() => { res.sendStatus(200); })
    .catch((error) => {
      console.log('Error in updating password:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
