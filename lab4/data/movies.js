/*const { create } = require('domain')
const { title } = require('process')*/
const mongoCollections = require('../config/mongoCollections')
const movies = mongoCollections.movies
const { ObjectId } = require('mongodb');
module.exports = {
async create(title, plot, rating, runtime, genre, cast, info){
    if(arguments.length > 7){
        throw 'Too many arguments'
    }
    if(!title){
        throw 'You must provide a title'
    }
    if(!plot){
        throw 'You must provide a plot'
    }
    if(!rating){
        throw 'You must provide a rating'
    }
    if(!runtime){
        throw 'You must provide a runtime'
    }
    if(!genre){
        throw 'You must provide a genre'
    }
    if(!cast){
        throw 'You must provide the cast'
    }
    if(!info){
        throw 'You must provide the info of the movie'
    }
    if(typeof title != 'string' || typeof plot !='string' || typeof rating !='string' || typeof genre !='string' || typeof runtime != 'string'){
        throw 'Must be a string'
    }
    if(title.trim().length === 0){
        throw 'empty title'
    }
  
    if(plot.trim().length ===0){
        throw 'Empty plot'
    }
   
    if(rating.trim().length === 0){
        throw 'Empty rating'
    }
   
    if(runtime.trim().length ===0){
        throw 'empty runtime'
    }
    
    if(genre.trim().length ===0){
        throw 'empty genre'
    }
   
    if(!Array.isArray(cast) || cast.length ===0){
        throw 'Cast is not an array or is empty'
    }
    if(typeof info != 'object'){
        throw 'Info is not an object'
    }
    if(!info.director || typeof info.director != 'string' ||  info.director.trim().length ==0){
        throw 'Director information is not provided or is of the wrong type'
    }
    if(!info.yearReleased || typeof info.yearReleased != 'number'){
        throw 'Year Released is not provided or is not a number'
    }
    if(info.yearReleased/1000 <1){
        throw 'The release year is invalid'
    }
    var d = new Date()
    var n = d.getFullYear()
    if(info.yearReleased <1930 || info.yearReleased > n){
        throw "Release year is invalid"
    }


    const movieCollection = await movies()
    let newMovie = {
        title: title, 
        plot: plot, 
        rating: rating, 
        runtime: runtime, 
        genre: genre, 
        cast: cast, 
        info: info

    }
    const insertInfo = await movieCollection.insertOne(newMovie)
    if(insertInfo.insertCount === 0) throw 'Could not add movie'
    const newId = insertInfo.insertedId.toString()
    const movie = await this.get(newId)
    return movie



},

async getAll(){
    const movieCollection = await movies()
    const movieList = await movieCollection.find({}).toArray()
    if(movieList.length == 0){
        return []
    }
    for(i = 0; i<movieList.length; i++){
        movieList[i]._id = movieList[i]._id.toString()
    }
    return movieList 
},
 async get(id){
    
     if(!id){
         throw 'No id provided'
     }

     if(typeof id !== 'string'){
         throw 'Id is not a string'
     }
     
     let obj = ObjectId(id)
     var objId = require('mongodb').ObjectID
     if(!objId.isValid(obj)){
         throw 'This is not a valid Object Id'
     }
   
     const movieCollection = await movies()
     const film = await movieCollection.findOne({ _id: obj})
     if( film === null){
         throw 'No movie with that id'
     }
    film._id = film._id.toString()
     
     return film

 },
 async remove(id){
     let stuff = ""
     if(!id){
         throw 'No id provided'
     }
     if(typeof id !== "string"){
         throw 'id is not a string'
     }
     let obj = ObjectId(id)
     var objId = require('mongodb').ObjectID
     if(!objId.isValid(obj)){
         throw 'This is not a valid Object Id'
     }
     try{
        stuff =  await this.get(id)
     }catch(e){
         throw 'Movie not found'
     }
     let movieTitle = stuff.title 

    const movieCollection = await movies()
    const deletionInfo = await movieCollection.deleteOne({_id: obj})
    if(deletionInfo.deleteCount ===0){
        throw `Could not delete movie with id of ${id}`
    }
    return movieTitle + " has successfully been deleted"
}, 
async rename(id, newTitle){
    if(!id || !newTitle){
        throw 'No id or newTitle provided'
    }
    if(typeof id !== "string" || id.trim().length === 0){
        throw 'id is not a string'
    }
    if(typeof newTitle != 'string' || newTitle.trim().length ===0){
        throw 'newTitle is not a string'
    }
    try{
        stuff =  await this.get(id)
     }catch(e){
         throw 'Movie not found'
     }
    let obj = ObjectId(id)
    var objId = require('mongodb').ObjectID
    if(!objId.isValid(obj)){
        throw 'This is not a valid Object Id'
    }
    const movieCollection = await movies()
    const updatedMovie = {
        title: newTitle
    }
    const updatedInfo = await movieCollection.updateOne(
        {_id: obj}, 
        {$set: updatedMovie}
    )
    if(updatedInfo.modifiedCount === 0){
        throw 'could not update movie successfully'
    }
    return await this.get(id)
}
}

