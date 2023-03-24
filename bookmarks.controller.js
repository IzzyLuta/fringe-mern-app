const User = require('./user.model');

//addBookmark will add the selected show's id to 'bookmarkedShows', an array field in the user's document on MongoDB
exports.addBookmark = async (req, res) => {
  const { userId, showId } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, { $addToSet: { bookmarkedShows: showId } }, { new: true });
    if (user) {
      res.send(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

//removeBookmark will remove the show id from the 'bookmarkedShows' field
exports.removeBookmark = async (req, res) => {
  const { userId, showId } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, { $pull: { bookmarkedShows: showId } }, { new: true });
    if (user) {
      res.send(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

//getBookmarkedShows fetches all shows in the 'bookmarkedShows' field for the logged in user
exports.getBookmarkedShows = async ({ params: { id } }, res) => {

  try {
    console.log('Retrieving user with ID:', id);
    const user = await User.findById(id).populate('bookmarkedShows');
    console.log('User:', user);
    if (user) {
      res.send(user.bookmarkedShows);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
  