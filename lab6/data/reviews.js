const mongoCollections = require('../config/mongoCollection')
const books = mongoCollections.books
const { ObjectId } = require('mongodb');
const allBooks = require('./books');

module.exports = {
    async create(title, reviewer, rating, dateOfReview, review, bookId){
        if(arguments < 6){
            throw "Too many or too little arguments"
        }
        if(typeof title != 'string'){
            throw "Title is not a string"
        }
        if(typeof reviewer != 'string'){
            throw "Reviewer is not a string"
        }
        if(typeof rating != 'number'){
            throw "Rating is not a number"
        }
        if(typeof dateOfReview != 'string'){
            throw 'dateOfReview is not a string'
        }
        if(typeof review != 'string'){
            throw 'Review is not a string'
        }
        if(typeof bookId != 'string'){
            throw 'Not a string'
        }
        const bookCollection = await books()
        let newReview = {
            title: title,
            reviewer: reviewer, 
            rating:rating, 
            dateOfReview: dateOfReview, 
            review: review
        }

        const newInsertInfo = await bookCollection.updateOne({_id: bookId} , {$addToSet: {_id: bookId, review: newReview} })    //check syntax
        return await this.books.getBookById(bookId)
    }, 
    async getReviewById(id) {

        if (!id) {
            throw 'You must provide an id';
        }
        if (typeof id !== 'string'){

        throw 'id must be a string';
        }
        if (!id.trim()){

        throw 'id is an empty string';
        }
        id.trim();
    
        let obj = ObjectId(id);
    
        const reviewsCollection = await reviews();
        const review = await reviewsCollection.findOne({ _id: obj });
    
        let r = review._id.toString();
    
        review._id = r;
        return review;
      },
    async getAllreviews(bookId) {
        if (!bookId){

            throw 'You must provide a book id'
        }
        if (typeof bookId !== 'string'){

         throw 'book id must be a string';
    }
        if (!bookId.trim()){

            throw 'book id is an empty string';
        }
        bookId.trim();
    
        let obj = ObjectId(bookId);
        const bookCollection = await books();
        const book = await bookCollection.findOne({ _id: obj});
    
        const reviewCollection = await reviews();
        let temp = " ";
        const reviewList = await reviewCollection.find({}).toArray();
    
        let reviewArray = [];
    
        for (i=0; i<book.reviews.length; i++){
            reviewArray[i] = await reviewList.findOne({_id: obj});
        }
    
        for (i=0; i<reviewArray.length; i++){
          temp = reviewArray[i]._id.toString();
          reviewArray[i]._id = temp;
        }
    
        return reviewArray;
      },
      async delete(id) {

        if (!id){

         throw 'You must provide an id';
        }
        if (typeof id !== 'string'){

            throw 'id must be a string';
        }
        if (!id.trim()){

         throw 'id is an empty string';
        }
        id.trim();
    
        let obj = ObjectId(id);
        const reviewsCollection = await reviews();
        let review = null;
        try {
          review = await this.getReviewById(id);
        } catch (e) {
          console.log(e);
          return;
        }
        const deletionInfo = await reviewsCollection.removeOne({ _id: obj });
        if (deletionInfo.deletedCount === 0) {
          throw `Could not delete post with id of ${id}`;
        }
        await books.removeReviewFromBook(review.bookBeingReviewed, id);
        let myObj = {
            reviewId: review._id,
            deleted: true
        }
        return myObj;
      }
    };


