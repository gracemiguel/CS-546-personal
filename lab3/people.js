const axios = require('axios')
async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')
    //const parsedData = JSON.parse(data) // parse the data from JSON into a normal JS Object
    return data // this will be the array of people objects
}
function input_exists(x){
    if(typeof(x)=== 'undefined'){
        throw 'No input'
    }
}
function isProperNumber(num, variableName){
    if(typeof num !== 'number'){
        throw `${variableName || 'provided variable'} is not a number`
    }   
    if(isNaN(num)){
        throw `${variableName ||'provided variable'} is not a number`
    }
}
function isProperString(s, variableName){
    if(typeof s !== 'string'){
        throw `${variableName || 'provided variable'} is not a String`
    }
}

  async function getPersonById(id){
      try{
          let x =  await getPeople();
          let input = await input_exists(id)
          let num = await isProperNumber(id)
          if(id<=x.length && id>0){
              for(i=0; i<x.length; i++){
                  if(x[i].id == id){
                      return x[i]
                  }
                }
          }else{
              throw 'invalid input'
          }
      }catch(e){
          return e
      }
  }
async function howManyPerState(stateAbbrv){
    try{
    let x = await getPeople()
    let input = await input_exists(stateAbbrv)
    let isString = await isProperString(stateAbbrv)
    let state_count = 0;
    for(i=0; i<x.length; i++){
        if(x[i].address.state == stateAbbrv){
            state_count++
        }
    
        
    }
    return state_count
}   catch(e){
        return e
}
}

async function to_date(birth){
    let today = await new Date()
    let birthdate = await birth.split("/")
    let month = birthdate[0]
    let day =  birthdate[1]
    let year = birthdate[2]
    let birthday = new Date(year, month-1, day)
    return birthday
}
async function age(birth){
    let today = await new Date()
    let birthdate = await birth.split("/")
    let month = birthdate[0]
    let day =  birthdate[1]
    let year = birthdate[2]
    let birthday = new Date(year, month-1, day)
    let age = Math.trunc((((today.getTime()- birthday.getTime())/86400000)/365))
    return age
}
async function personByAge(index){
    try{
        let x = await getPeople()
        let input = await input_exists(index)
        let num = await isProperNumber(index)
        function age_sorter(property){
            return function(a,b){
                if(a[property]>b[property]){
                    return 1
                } else if(a[property]< b[property]){
                    return -1;
                }
                return 0;
            }
        }
        if(index<x.length && index>0){

        
        for(i =0; i<x.length; i++){
            birthday = x[i].date_of_birth
            x[i].age = await age(birthday)
            x[i].birthdate = await to_date(birthday)
        }
        let sorted_people = await x.sort(age_sorter('birthdate'))
        let person = {
        }
        person.first_name = x[index].first_name
        person.last_name = x[index].last_name
        person.date_of_birth = x[index].date_of_birth
        person.age = x[index].age
        return person
    }else{
        throw 'index out of bounds!'
    }
       
    }catch(e){
        return e
    }
}

async function peopleMetrics(){
    try{
        let people = await getPeople()
        let totalLetters = 0
        let totalVowels = 0
        let totalConsonants = 0
        let longestName = ""
        let shortestName = "fillerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
        let mostRepeatingCity = ""
        let averageAge = 0;
        let cities = {}
        let output = {}
        
        for(i=0; i<people.length; i++){    
            let birthday = people[i].date_of_birth                //Run through whole parsed JSON to add letters, vowels, consonants and ages.
            people[i].age = await age(birthday)        //Get age of each person
            averageAge+=people[i].age                          //add ages together
            if(typeof cities[people[i].address.city] == 'undefined'){   //check if city is logged
                cities[people[i].address.city] = 1                      //if not, log it
            }
            else{
                cities[people[i].address.city]+=1                        //otherwise, increment
            }
            for(k=0; k< people[i].last_name.length;k++){
               people[i].last_name= people[i].last_name.replace(/[^a-zA-Z ]/g, "")

            }
            for(m=0;m<people[i].first_name.length; m++){
               people[i].first_name= people[i].first_name.replace(/[^a-zA-Z ]/g, "")
            }
            let fullname = people[i].first_name + " " + people[i].last_name       // get fullname
            people[i].fullname = fullname
            if(fullname.length>longestName.length){                         //get longestName
                longestName = people[i].fullname
            }
            else if(fullname.length>0 && fullname<shortestName){            //get shortestName
                shortestName = people[i].fullname
            }
            totalLetters+=fullname.length                                   //total letters
            for(j=0; j<fullname.length; j++){
                if(fullname.charAt(j) == 'a' || fullname.charAt(j) =='e' || fullname.charAt(j) == 'i' || fullname.charAt(j) == 'o' || fullname.charAt(j)== 'u'){
                    totalVowels++
                }
                else{
                    totalConsonants++
                }
        }
    }
    averageAge = await Math.trunc(averageAge/people.length)
    mostRepeatingCity = await Object.keys(cities).reduce(function(a,b){ return cities[a]>cities[b] ? a: b})
    output.totalLetters = totalLetters
    output.totalVowels = totalVowels
    output.totalConsonants = totalConsonants
    output.longestName = longestName
    output.shortestName = shortestName
    output.mostRepeatingCity = mostRepeatingCity
    output.averageAge = averageAge
    return output
}catch(e){
    return e
}
}
 

 module.exports = { getPeople, getPersonById, howManyPerState, age, personByAge, to_date, peopleMetrics, input_exists, isProperNumber}