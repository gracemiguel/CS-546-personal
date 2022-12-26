const express = require('express');
const router = express.Router();
const data = require('../data');
const bookData = data.books;

router.get('/', async (req, res) => {
  try {
    const bookList = await bookData.getAllBooks();
    res.json(bookList);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});




router.post('/', async (req, res) => {
  const bookData = req.body;
  if (!bookData.title) {
    res.status(400).json({ error: 'You must provide book title' });
  }
  if(!bookData.author){
    res.status(400).json({ error: 'You must provide an author' });
  }
  if(!bookData.genres){
    res.status(400).json({ error: 'You must provide a genre/s' });
  }
  if(!bookData.datePublished){
  res.status(400).json({ error: 'You must provide a datePublished' });
  }
  if(!bookData.summary){
    res.status(400).json({ error: 'You must provide a summary' });
  }
  if(!bookData.reviews){
    res.status(400).json({ error: 'You must provide book title' });
  
    return;
  }
  if (!blogPostData.body) {
    res.status(400).json({ error: 'You must provide blog post body' });
    return;
  }
  if (!blogPostData.posterId) {
    res.status(400).json({ error: 'You must provide poster ID' });
    return;
  }
  try {
    const newBook = await booksData.create(
      bookData.title,
      bookData.author,
      bookData.genres,
      bookData.datePublished,
      bookData.summary,
      bookData.reviews
       );
    res.json(newBook);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.put('{id}', async (req, res) => {
  const updatedData = req.body;
  if (!updatedData.title || !updatedData.author || !updatedData.genres || !updatedData.datePublished || !updatedData.summary || !updatedData.reviews) {
    res.status(400).json({ error: 'You must Supply All fields' });
    return;
  }
  try {
    await bookData.geBookById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }

  try {
    const updatedBook = await BookData.gerBookbyId(req.params.id, updatedData);
    res.json(updatedBook);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.patch('/{id}', async (req, res) => {
  const requestBody = req.body;
  let updatedObject = {};
  try {
    const oldPost = await BookData.getBookById(req.params.id);
    if (requestBody.title && requestBody.title !== oldPost.title)
    updatedObject.title = requestBody.title;
    if (requestBody.author && requestBody.author !== oldPost.author)
      updatedObject.author = requestBody.author;
    if (requestBody.genre && requestBody.genre !== oldPost.genre)
      updatedObject.genre = requestBody.genre;
    if (requestBody.datePublished && requestBody.datePublished !== oldPost.datePublished)
      updatedObject.datePublished = requestBody.datePublished;
    if (requestBody.summary && requestBody.summary !== oldPost.summary)
      updatedObject.summary = requestBody.summary;
    
  } catch (e) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }
    try {
      const updatedBook = await BookData.update(
        req.params.id,
        updatedObject
      );
      res.status(200).json(updatedBook)
    }
   catch(e){
    res.status(400).json({
      error:
        'No fields have been changed from their inital values, so no update has occurred'
    });
  }
});

router.delete('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'You must Supply and ID to delete' });
    return;
  }
  try {
    await bookData.getBookById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }
  try {
    await bookData.removeBook(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;