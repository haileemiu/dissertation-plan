
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const goalTypeRouter = require('./routes/goalType.router');
const goalTaskRouter = require('./routes/goalTask.router');
const historyRouter = require('./routes/history.router');
const dissertationRouter = require('./routes/dissertation.router');
const passwordResetRouter = require('./routes/password-reset.router');
const forgotPasswordRouter = require('./routes/forgot-password.router');
const coachingRouter = require('./routes/coaching.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/password-reset', passwordResetRouter); // WIP
app.use('/api/goals/types', goalTypeRouter);
app.use('/api/goals/tasks', goalTaskRouter);
app.use('/api/forgot-password', forgotPasswordRouter);
app.use('/api/password-reset', passwordResetRouter);
app.use('/api/history', historyRouter);
app.use('/api/dissertation', dissertationRouter);
app.use('/api/coaching', coachingRouter);
// app.use('/api/tests', require('./routes/test.router'));

// Serve static files
app.use(express.static('build'));

// Read Environment Variables
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
