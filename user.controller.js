const User = require('./user.model');
const jwt = require('jsonwebtoken');

//fetch user information by their user id (_id in their MongoDB document)
exports.getUserById = async ({ params: { id } }, res) => {
  try {
    const user = await User.findById(id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

//When a user is logged in, they are able to update their user information
exports.updateUser = async (req, res) => {
  console.log('updateUser function called');
  const { id } = req.params;
  const { name, surname, email, password, newPassword } = req.body;
  const token = req.headers.authorization.replace('Bearer ', '');

  try {
    const decodedToken = jwt.verify(token, 'jwt-secret');
    console.log('Decoded token:', decodedToken);

    const user = await User.findById(id);
    console.log('User:', user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (decodedToken.email !== user.email) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (password) { //The current password is needed for the user to make changes to their user information
      if (user.password !== password) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
    }

    user.email = email;
    user.name = name;
    user.surname = surname;

    // The password will only be updated if a new password is provided
    if (newPassword) {
      user.password = newPassword;
    }

    const updatedUser = await user.save();
    console.log('Updated user:', updatedUser);
    res.json({ user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


