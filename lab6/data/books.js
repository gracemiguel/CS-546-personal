const mongoCollections = require('../config/mongoCollection')
const books = mongoCollections.books
const { ObjectId } = require('mongodb');

module.exports = {
    async getAllBooks(){
        const bookCollection = await books()
        const bookList = await bookCollection.find({}).toArray()
        return bookList
    },
    async getBookById(id){
        if(!id){
            throw 'You must provide an Id'
        }
        
        if(typeof id != 'string'){
            throw "Id is not a string"
        }
        if (!id.trim()){

            throw 'id is an empty string';
        }
        id.trim();
        let obj = ObjectId(id)
        var objId = require('mongodb').ObjectID
        if(!objId.isValid(obj)){
            throw 'This is not a valid Object Id'
     }
        const bookCollection = await books()
        const book = bookCollection.findOne({_id: obj})
        if(book === null){
            throw 'Could not find book with id of ' + id
        }
        let bookId= book._id.toString()
        return bookId
        
    },

    async create(title, author, genres, datePublished, summary, reviews){
        if(arguments> 6){
            throw 'Too many arguments given'
        }
        if(!title){
            throw 'You must provide a title'
        }
        if(!author){
            throw 'You must provide an author'
        }
        if(!genres){
            throw 'You must provide a genre'
        }
        if(!datePublished){
            throw 'You must provide a publishing date'
        }
        if(!summary){
            throw 'You must provide a summary'
        }
        if(!reviews){
            throw 'You must provide reviews'
        }
        if(typeof(title) != 'string' || typeof(summary) != 'string'){
            throw 'Not of type string'
        }
        if(typeof(author) != 'object'){
            throw 'Author is not an object'
        }
        if(!Array.isArray(genres) || genres.length ===0){
            throw 'Genres is not an array or is empty'
        }
        if(Array.isArray(genres) && genres.length>0){
            for(i=0; i<genres.length; i++){
                if(typeof genres[i] != 'string'){
                    throw 'Genres is not an array of strings'
                }
            }
        }
        /*if(Object.prototype.toString.call(datePublished) != '[object Date]'){
            throw 'datePublished is not a proper Date object'
        }*/
        if(typeof datePublished !== 'string'){
            throw 'datePublished is not a string'
        }
        if(!Array.isArray(reviews) ){
            throw 'Reviews is not an Array'
        }
        if(Array.isArray(reviews)){
            for(i=0; i<reviews.length; i++){
                if(typeof reviews[i] != 'object'){
                    throw 'Reviews is not an Array of Objects'
                }
            }
        }
        const bookCollection = await books()
        let newBook = {
            title: title, 
            author: author, 
            genre: genres, 
            datePublished: datePublished, 
            summary: summary, 
            reviews: reviews
        }
        const newInsertInfo = await bookCollection.insertOne(newBook)
        if(newInsertInfo.insertCount === 0) throw 'Could not add book'
        const newId = newInsertInfo.insertedId.toString()
        const book = await this.getAllBooks(newId)
        return book
    },
    async addReviewToBook(bookId, reviewId) {
        let currentBook = await this.getBookById(bookId);
    
        const BookCollection = await books();
        const updateInfo = await bookCollection.updateOne(
          { _id: bookId },
          { $addToSet: { Reviews: { id: ReviewId } } }
        );
    
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
          throw 'Update failed';
    
        return await this.getBookById(bookId);
      
    },
      async delete(id) {
        if (!id){
            throw 'You must provide an id' ;
        } 
        if (typeof id !== 'string'){

        throw 'id must be a string';
        }
        if (!id.trim()){
            throw 'Id is an empty string';
        } 
        id.trim();
    
        let obj = ObjectId(id);
        const bookCollection = await books();
        let book = null;
        try {
          book = await this.getBookById(id);
        } catch (e) {
          console.log(e);
          return;
        }
        const deletionInfo = await bookCollection.removeOne({ _id: obj });
        if (deletionInfo.deletedCount === 0) {
          throw `Could not delete post with id of ${id}`;
        }
    
        for (i=0; i < book.reviews.length; i++){
            reviews.delete(book.reviews[i])
        }
        let myObj = {
            bookId: book._id,
            deleted: true
        }
        return myObj;
      },
      async update(id, updatedBook) {

        if (!id){
            throw 'You must provide an id' ;
        } 
        if (typeof id !== 'string'){

        throw 'id must be a string';
        }
        if (!id.trim()){
            throw 'Id is an empty string';
        } 
        id.trim();
    
        if (!updatedBook.title){
            throw 'You must provide a title';
        }
        if (!updatedBook.author){
            throw 'You must provide an author';
        } 
        if (!updatedBook.genres){
            throw 'You must provide a genre';
        } 
        if (!updatedBook.datePublished){
            throw 'You must provide a datePublished';
        }
        if (!updatedBook.summary){
            throw 'You must provide a summary';
        }
    
        if (typeof updatedBook.title !== 'string'){
            throw 'Title is not a string';
        } 
        if (typeof updatedBook.author !== 'string'){
            throw 'Author is not a string';
        } 
        if (typeof updatedBook.summary !== 'string'){
            throw 'Summary must be a string';
        } 
    
        if (!updatedBook.title.trim()){
            throw 'Title is an empty string';
        }
        if (!updatedBook.author.trim()){
            throw 'Author is an empty string';
        } 
        if (!updatedBook.summary.trim()){
            throw 'Summary is an empty string';
        } 
    
        updatedBook.title.trim()
        updatedBook.author.trim()
        updatedBook.summary.trim()
    
        if (!Array.isArray(updatedBook.genres)){
            throw 'genre must be provided as an array';
        } 
        if (!updatedBook.genre.length>0){
            throw 'genre has to have at least one input'
        } 
        for (i=0; i<updatedBook.genre.length;i++){
          if (!updatedBook.genre[i].trim()){
            throw 'one of the elements in cast is an empty string';
          } 
          if (typeof updatedBook.genre[i] !== 'string'){
            throw 'one of the elements in cast is not a string';
          }
          updatedBook.genre[i].trim();
        }
    
        const bookCollection = await books();
    
        const updatedBookData = {};
    
        if (updatedBook.title) {
          updatedBookData.title = updatedBook.title;
        }
        
        if (updatedBook.author) {
            updatedBookData.author = updatedBook.author;
        }
    
        if (updatedBook.genre) {
            updatedBookData.genre = updatedBook.genre;
        }
    
        if (updatedBook.datePublished) {
            updatedBookData.datePublished = updatedBook.datePublished;
        }
    
        if (updatedBook.summary) {
            updatedBookData.summary = updatedBook.summary;
        }
    
        await bookCollection.updateOne({ _id: id }, { $set: updatedBookData });
    
        let update = await this.getBookById; //should change to getBookById(id)
        updated.reviews = update.reviews;   //should change to updatedBook.reviews
    
        return update;
      },
      async removeReviewFromBook(bookId){
        let currentBook = await this.getBookById(bookId);

        const bookCollection = await books();
        const updateInfo = await bookCollection.updateOne(
          { _id: bookId },
          { $pull: { books: { id: reviewId } } }        //$pull removes from array
        );
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
          throw 'Update failed';
    
        return await this.getBookById(bookId);
      }
    }; 
      

    

