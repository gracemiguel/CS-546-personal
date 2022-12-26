const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const users = require("../data/users")


// let users = [
//     {
//         _id: 0,
//         username: "masterdetective123",
//         hashedPassword: "$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.",
//         firstName: "Sherlock",
//         lastName: "Holmes",
//         profession: "Detective", 
//         bio : "Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a 'consulting detective' in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard."
//     },
//     {
//         _id: 1,
//         username: "lemon",
//         hashedPassword: "$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm",
//         firstName: "Elizabeth", 
//         lastName: "Lemon",
//         bio: "Elizabeth Miervaldis 'Liz' Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan."
//     },
//     {
//         _id: 2,
//         username: "theboywholived",
//         hashedPassword: "$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm",
//         firstName: "Harry",
//         lastName: "Potter",
//         bio: "Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles."
//     }

// ]

router.get('/', async(req, res)=>{
    console.log(`This is the session id: ${req.session.id}`)
    if(req.session.user){
        
        res.redirect('/private')
    }
    else{
        res.render('crazy/login', {}) //no input
    }
})


router.get('/private', async(req, res)=>{
    res.render('crazy/private', {firstName: req.session.user.firstName, lastName: req.session.user.lastName, bio: req.session.user.bio, username: req.session.user.username})
 
  })


router.post('/login', async (req, res) => {
    //console.log(`This is the session id: ${req.session.id}`)
    let {username, password }= req.body;
     username = username.toLowerCase()
    if(users.find(x=> x.username === username)){
        let login = users.find(x=> x.username === username) //Checks to see if username is in database.
        let match = false;
        try{
            match = await bcrypt.compare(password, login.hashedPassword)
            console.log(match)
        }catch(e){
            res.json({error: "we have an error"})
        }
        if(match ==true){
            req.session.user = { username: login.username,  firstName: login.firstName, lastName: login.lastName, profession: login.profession, bio: login.bio}        //Checks to see if appropriate username has correct password
             res.redirect('/private')
             
        }
        
        else{
         res.status(401).json({error : "401: Invalid Password"})
        }
    }
        
    else{
         res.status(401).json({error: "401: Invalid Username and/or Password"})
     }
        
  })

  router.get('/logout', (req, res)=>{
    console.log(`This is the session id: ${req.session.id}`)
    if (req.session.user) {
        req.session.destroy();
        res.render('crazy/logout');
    } else {
        res.redirect('/private');
    }    
  })




module.exports = router


    