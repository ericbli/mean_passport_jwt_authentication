const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

// Initialize the application
const app = express();

// Load routes
const users = require('./routes/users');

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/database');

// Connect to mongoose
// This is a Promise
//mongoose.connect('mongodb://localhost/vidjot-dev')
mongoose.connect(db.mongoURI)
  .then(() => console.log(`Connected to database ${db.mongoURI}`))
  .catch(err => console.log('err'));

// CORS Middleware
app.use(cors());

// Body-Parser Middleware
//   to access req.body and get the form value
//   where key is the name attribute of input or textarea
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport Middleware 
//   *MUST* be after Express Session Middleware
//   if express-session is being used
app.use(passport.initialize());
app.use(passport.session());

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Use routes
app.use('/users', users);

// Index route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const port = process.env.PORT || 3000;

// Start Server
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});
