const express = require('express');

const router = express.Router();

/*
  # Collection Routes
  GET    /tests
  GET    /tests/search
  GET    /tests/active
  GET    /tests/expired

  POST   /tests

  # Item routes
  GET    /tests/43
  PUT    /tests/43
  DELETE /tests/43

  # Sub-item collection routes
  GET    /tests/43/questions
  GET    /tests/43/questions/unanswered
  GET    /tests/43/questions/answered

  POST   /tests/43/questions

  # Sub-item item routes
  GET    /tests/43/questions/12
  PUT    /tests/43/questions/12
  DELETE /tests/43/questions/12
 */

router.get('/', async (req, res) => {
  res.send('root route');
});

router.get('/:id', async (req, res) => {
  res.send('getid route (' + req.params.id + ')');
});

router.get('/search', async (req, res) => {
  res.send('root search route');
});

router.get('/:id/questions', async (req, res) => {
  res.send('questions route (' + req.params.id + ')');
});

router.post('/:id/questions', async (req, res) => {
  res.send('questions route (' + req.params.id + ')');
});

router.get('/:testId/questions/:id', async (req, res) => {
  res.send('questions route (' + req.params.testId + ', ' + req.params.id + ')');
});

router.put('/:testId/questions/:id', async (req, res) => {
  res.send('questions route (' + req.params.testId + ', ' + req.params.id + ')');
});

module.exports = router;
