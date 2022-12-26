
//I pledge my honor that I've abided by the Stevens Honor System
const movies = require('./data/movies')
const connection = require('./config/mongoConnection')

const main = async () => {
    const monstersInc = await movies.create("Monsters Inc.", "Monsters Incorporated is the largest scare factory in the monster world,and James P. Sullivan (John Goodman) is one of its top scarers. Sullivan is a huge, intimidating monster with blue fur, large purple spots and horns.", "PG", "1hr 36m", "Family", ["John Goodman", "Billy Crystal", "Jennifer Tilly", "Steve Buscemi" ], {director: "Pete Doctor", yearReleased: 2001 } )
    try{
    
     console.log(monstersInc)
    }catch(e){ 
        console.log(e)
    }
    const moonrise = await movies.create("Moonrise Kingdom", "The year is 1965, and the residents of New Penzance, an island off the coast of New England,\
      inhabit a community that seems untouched by some of the bad things going on in the rest of the world. Twelve-year-olds Sam (Jared Gilman) and Suzy \
      (Kara Hayward) have fallen in love and decide to run away. But a violent storm is approaching the island, forcing a group of quirky adults ,\
      (Bruce Willis, Edward Norton, Bill Murray) to mobilize a search party and find the youths before calamity strikes.", "PG-13", "1hr 35mins", "Young Adult", ["Kara Hayward", "Jared Gilman", "Edward Norton", "Bruce Willis"], {director: "Wes Anderson", yearReleased: 2012})
    try{
        const allMovies = await movies.getAll()
    console.log(allMovies)
    }catch(e){
        console.log(e)
    }
    const titanic = await movies.create("Titanic", "One of the best romance films in existence", "PG-13", "3hr 15mins", "Romance", ["Leonardo Dicaprio", "Kate Winslet", "Billy Zane"], {director: "James Cameron", yearReleased: 1997})
    try{
    
    console.log(titanic)
    }catch(e){
        console.log(e)
    }
   try{

    const monst_univ = await movies.rename(monstersInc._id, "Monster's University")
    console.log(monst_univ)
   }catch(e){
       console.log(e)
   }
   try{
    const remove = await movies.remove(moonrise._id)
    const all = await movies.getAll()
    console.log(all)
   }
    catch(e){
        console.log(e)
    }
    
    try{
        const badName = await movies.create( 2012, "It's the fake end of the world", "PG-13", "1hr 50mins", "Action", ["Billy Bob", "John Locke"], {director: "Charlie Brown", yearReleased: "2012"})
    console.log(badName)
    }catch(e){
        console.log(e)
    }
    try{
    const not_real = await movies.remove("603db528217c2f8eb5c4c23a")
    console.logo(not_real)
    }catch(e){
        console.log(e)
    }
    try{
    const fake_name = await movies.rename("603db528217c2f8eb5c5d8a", "Water Boy")
    console.log(fake_name)
    }catch(e){
        console.log(e)
    }
    try{
        const crap_data = await movies.rename("603db8d8fd5ae752286bb8d6", [1223])
    console.log(crap_data)
    }catch(e){
            console.log(e)
        }
   try{
    const bad_get = await movies.get("603e8452ae4fa846f1f5bbdc")
    console.log(bad_get)
   }catch(e){
       console.log(e)
   }
   

}
main()