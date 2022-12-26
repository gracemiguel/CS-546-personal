const axios = require('axios')
const people = require("./people")
async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')
    //const parsedData = JSON.parse(data) // parse the data from JSON into a normal JS Object
    return data // this will be the array of people objects
}
async function getWork(){
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json')
    return data 
}

async function isSSN(ssn){
    try{

    if(typeof ssn !== 'string'){
        throw 'ssn is not a string'
    }
    else if(ssn.length == 11 && ssn.charAt(3) =="-" && ssn.charAt(6)=='-'){
        nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        ssn = ssn.replace(/-/g, "")
        x=0
        while(x<ssn.length){
            if(!nums.includes(ssn.charAt(x))){
                throw 'Not a proper social security number'
            }
            x++
        }
        

    }
}catch(e){
    return e
}
}

function isPhoneNumber(phoneNumber){
    
    if(typeof phoneNumber !== 'string'){
        throw 'This is not a string'
    }
    if(phoneNumber.length === 12){
        if(phoneNumber.charAt(3)== "-" && phoneNumber.charAt(7)== '-'){
            phoneNumber = phoneNumber.replace(/-/g, "")
            x=0
            nums = ['0','1','2','3','4','5','6','7','8','9']
            while(x<phoneNumber.length){
                if(!nums.includes(phoneNumber.charAt(x))){
                    throw 'Not a proper phone number!'
                }
               
                x++
            }
        }
    }
   
}
async function getPersonById(id){
    try{
        let x =  await getPeople();
        //let input = people.input_exists(id)
        //let num = people.isProperNumber(id)
        let obj = {}
        if(id<=x.length && id>0){
            for(i=0; i<x.length; i++){
                if(x[i].id == id){
                    obj.first_name = x[i].first_name
                    obj.last_name = x[i].last_name
                    return obj
                }
              }
        }else{
            throw 'invalid input'
        }
    }catch(e){
        return e
    }
}
async function getEmployees(company_name){
    let work = await getWork()
    
    for(i=0; i<work.length; i++){
        
        if(work[i].company_name == company_name){
            let names = new Array(work[i].employees.length)
            let emps = await work[i].employees
            for(j=0; j<emps.length; j++){
                names[j] = await getPersonById(emps[j])
                
            }
            return names
        
        }
    }
  

}

async function listEmployees(){
    try{
        
        let work = await getWork()
        let companies = new Array(work.length)

        for(let i =0; i< companies.length; i++){
            let company_name = work[i].company_name     //grabbing company_name of each company
            
            companies[i] = {}                           //make each company and object
            companies[i].company_name = company_name    //company_name property
            //let people = await getEmployees(company_name)//get employees and make it a variable
            companies[i].employees = await getEmployees(company_name)                 //add employees property which is an array []
               
            
        }
        return companies                                    //return array of companies
}   catch(e){
        return e
    }
}

async function fourOneOne(phoneNumber){
    try{
    let input = await  people.input_exists(phoneNumber)
    let propNumber = await isPhoneNumber(phoneNumber)
    
    let work = await getWork()
    let info = {}
    for(i=0; i<work.length; i++){
        if(work[i].company_phone == phoneNumber){
            info.company_name = work[i].company_name
            info.company_address = work[i].company_address
        }
    }
    return info
}catch(e){
    return e
}
    
}

async function whereDoTheyWork(ssn){
    try{
    let input = people.input_exists(ssn)      //this is all error handling
    let prop_ssn = await isSSN(ssn)
    let persons = await getPeople()
    let work = await getWork()

    
    for(let i=0; i<persons.length; i++){        //see if the ssn is in the persons parsed json
        let person = persons[i]
        if(person.ssn == ssn){
            var fullname = person.first_name + " " + person.last_name     //get full name
            var id = person.id
            i=persons.length                        //exit loop
            }
        
    }
    for(let i=0; i<work.length; i++){                   //find the company they work for
        let employees = work[i].employees
        if(employees.includes(id)){
            var company_name = work[i].company_name
            i=work.length 
            break
        }
    }
    return `${fullname} works at ${company_name}`
}catch(e){
    return e
}
    
}
module.exports = {listEmployees, getWork, listEmployees, getEmployees, isPhoneNumber, fourOneOne, whereDoTheyWork, isPhoneNumber}