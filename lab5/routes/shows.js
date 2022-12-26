const express = require('express');
const router = express.Router();
const data = require('../data')
const shows = data.shows
router.get('/:id', async (req, res) => {
  try {
    const showId = await shows.getShowById(req.params.id);
    res.json(showId);
  } catch (e) {
    res.status(404).json({message: e})
    res.status(404).json({ message: 'Show not found' });
  }
});

router.get('/', async (req, res) => {
  try {
    const showList = await shows.getAllShows(); 
    res.json(showList);
  } catch (e) {
    res.status(500).send();
  }
});


module.exports = router;
