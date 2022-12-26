const express = require('express');
const router = express.Router();
const data = require('../data');
const bookData = data.books;
const reviewData = data.reviews;

router.get('/{bookId}', async (req, res) => {
    try {
      const review = await reviewsData.getAll(req.params.id);
      res.status(200).json(review);
    } catch (e) {
      res.status(404).json({ error: e+ ' and/or book not found' });
    }
  });

  module.exports = router; 