const express = require('express');
const axios = require('axios');
const router = express.Router();

let exportedMethods = {
    async  getAllShows() {
        const { data } = await axios.get('http://api.tvmaze.com/shows');
        return data;
      },
      async getShowById(id) {
        let showCollection = await this.getAllShows();
        let test_id = parseInt(id, 10); 
         if(typeof test_id != 'number'){
           throw 'Not a number'
         }
         if(test_id < 0 || !Number.isInteger(test_id)){
           throw 'Invalid id'
         }
         let show =  showCollection.find( myId => myId.id ==id );
     
         if (!show){
     
          throw 'Post not found';
         }
         return show;
       }
}
router.get('/:id', async (req, res) => {
  try {
    const showId = await shows.getShowById(req.params.id);
    res.render("showStuff/indiv", {show: showId});
  } catch (e) {
    res.status(404).json({message: e})
    res.status(404).json({ message: 'Show not found' });
  }
});

module.exports = router;
