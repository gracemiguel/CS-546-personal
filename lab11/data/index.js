const axios = require('axios')
const express = require('express')

let exportedMethods = {
    //This needs to return a list of show links
    async getAllShows() {
        const shows = await axios.get("http://api.tvmaze.com/shows")
        return shows
        

    }, 

    async getShowByName(name){
        const shows = await axios.get("http://api.tvmaze.com/shows")
        let output = await axios.get("http://api.tvmaze.com/search/shows?q" +name)
        return JSON.stringify(output)
        
    }, 

    

}