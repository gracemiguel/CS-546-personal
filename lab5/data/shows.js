const axios  = require('axios');

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
};

module.exports = exportedMethods;