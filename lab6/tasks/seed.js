const dbConnection = require('../config/mongoConnection');
const data = require('../data');
const books = data.books;
const reviews = data.reviews;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  const girlOnTheTrain = await books.create('Girl On the Train', {firstName: 'Paula', LastName:  'Hawkins'}, ['Fiction', 'Murder Mystery'], "1/16/2015", "A washed up drunk commutes to her old job via the train when she notices an altercation of a couple at a house she rides past. She decides to investigate. ", [] );
  const spot = await books.create('Spot', {firstName: 'Doggy', LastName: 'Doo'},['Fiction', 'Children'], "02/03/2021", "A dog story.", []  ); 
  console.log(girlOnTheTrain)
  // const id = girlOnTheTrain._id.toString();
   const review1=  await reviews.create('Thrilling', 'Joe Schmo', 10, 'poop', "This novel kept me on the edge of my seat. Very well written, I couldn't put it down", girlOnTheTrain._id);

  console.log('Done seeding database');

  await db.serverConfig.close();
}

main();