const Show = require('./show.model');

//Retrieves information on all the shows in the fringe programme
async function findAll(req, res) {
  try {
    const shows = await Show.find();
    res.send(shows);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Some error occurred while retrieving shows' });
  }
};

//Retrieves information on all shows within a specific genre
const findGenre = async (req, res) => {
  const genre = req.params.genre;
  try {
    const shows = await Show.find({ genre: genre });
    res.send(shows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Some error occurred while retrieving shows by genre');
  }
};

//Retrieves information on an individual show, using its id
async function getShowById({ params: { id } }, res) {
  try {
    const show = await Show.findById(id);
    if (show) {
      res.send(show);
    } else {
      res.status(404).send('Show not found');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

//Admin accounts can edit, delete and create shows 
// Creates a new show
async function createShow(req, res) {
  try {
    const newShow = new Show(req.body);
    await newShow.save();
    res.status(201).send(newShow);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Updates an existing show
async function updateShow(req, res) {
  try {
    const show = await Show.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!show) {
      return res.status(404).send('Show not found');
    }
    res.send(show);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Deletes a show
async function deleteShow(req, res) {
  try {
    const show = await Show.findByIdAndDelete(req.params.id);
    if (!show) {
      return res.status(404).send('Show not found');
    }
    res.status(200).send({ message: 'Show deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  findAll,
  findGenre,
  getShowById,
  createShow,
  updateShow,
  deleteShow
};