const axios = require('axios'); 
const express = require('express')
const router = express.Router();
let exportedMethods = {

  async get20Shows(searchTerm){
      if(searchTerm.trim() == 0){
          throw 'No input'
      }
      const {data} = await axios.get( `http://api.tvmaze.com/search/shows?q=${searchTerm}`);
      return data;
  }


}


router.get('/', async (req, res) => {
    res.render("search/search");
});

router.post("/", async(req, res) =>{
    const body = req.body;
    let errors = [];
    if(typeof body.searchTerm !== 'string' || body.searchTerm.trim() == 0){
        errors.push("Search term must be a string")
    }
    if(errors.length>0){
        res.render("search/search",  { errors_exist: true, errors: errors})
    }
    try{
        const results = await get20Shows(body.searchTerm)
            res.render("search/output", { results: results, term: body.searchTerm
            })
        }catch(e){
            res.status(500).json({error:e})
        }
    });
  
  
  module.exports = router;