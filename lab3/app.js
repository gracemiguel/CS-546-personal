//I pledge my honor that I've abided by the Stevens Honor System.
const people = require("./people")
const work = require("./work")

async function main(){
    try{
        const fourOneOne = await work.fourOneOne(9876543210)
        console.log(fourOneOne)
    }catch(e){
        console.log(e)
    }

    /*
    try{
        const peopleId = await people.getPersonById("foo")
        console.log(peopleId)
        }catch(e){
            console.log(e)
        }
    try{
        const state = await people.howManyPerState("WY")
        console.log(state)
    }catch(e){
        console.log(e)
    }
       
    try{
        const personByAge = await people.personByAge(9000)
        console.log(personByAge)
    }catch(e){
        console.log(e)
    }
       try{
        const peopleMetrics = await people.peopleMetrics()
        console.log(peopleMetrics)
    }catch(e){
        console.log(e)
    }
    

        try{
        const whereDoTheyWork = await work.whereDoTheyWork()
        console.log(whereDoTheyWork)
    }catch(e){
        console.log(e)
    }
        try{
        const listEmployees = await work.listEmployees("Hackett LLC")
        console.log(listEmployees)
    }catch(e){
        console.log(e)
    }
   
    }*/
   
    
    
}

main()