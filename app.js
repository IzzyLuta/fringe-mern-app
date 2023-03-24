const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const path = require('path');
const { findAll, getShowById, findGenre, createShow, updateShow, deleteShow } = require('./show.controller');
const User = require('./user.model');
const { getUserById, updateUser } = require('./user.controller');
const { addBookmark, removeBookmark, getBookmarkedShows } = require('./bookmarks.controller');

const fs = require('fs');
fs.readdir(path.join(__dirname, 'fringe-react-app/build/static/js'), (err, files) => {
  if (err) {
    console.error(err);
  } else {
    console.log('JS files in build directory:', files);
  }
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'fringe-react-app/build')));

//Database connection (MongoDB Atlas) 
let mongoose = require('mongoose');
const uri = 'mongodb+srv://isabellaluta:sGf25FKdX46tboRA@fringecluster.sgdnvxd.mongodb.net/fringe_programme.shows?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'fringe_programme'
})
  .then(() => console.log('Connected to database fringe_programme!'))
  .catch(err => console.log(err));

// Log in operation
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Look up the user by email in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ err: 'Invalid email or password' });
    }

    // Check if the provided password matches the password stored in the database
    if (password !== user.password) {
      return res.status(401).send({ err: 'Invalid email or password' });
    }

    const payload = {
      email: user.email,
      admin: user.admin || false
    };

    //JWT token used to authenticate user login 
    const token = jwt.sign(JSON.stringify(payload), 'jwt-secret', {
      algorithm: 'HS256'
    });

    res.send({ token, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ err: 'Internal server error' });
  }
});

//FETCH DATA ON SHOW(S) - all users
app.get('/shows', findAll);
app.get('/shows/genre/:genre', findGenre);
app.get('/shows/:id', getShowById);

//EDIT, DELETE + CREATE SHOWS - users with admin status only
app.post('/shows', createShow);
app.put('/shows/:id', updateShow);
app.delete('/shows/:id', deleteShow);

//USER PROFILE - fetch user data and update user data - all users
app.get('/users/id/:id', getUserById);
app.put('/users/:id', updateUser);

//BOOKMARKS - bookmark shows - all users
app.post('/bookmarks', addBookmark);
app.delete('/bookmarks', removeBookmark);
app.get('/users/id/:id/bookmarks', getBookmarkedShows);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'fringe-react-app/build', 'index.html'));
});

//start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

