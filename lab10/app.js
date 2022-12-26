//I pledge my honor that I've abide by the Stevens Honor System.

const express = require('express')
const app = express()
const session = require('express-session')
const exphbs = require('express-handlebars');
const configRoutes = require('./routes')
const path = require("path")

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json())
app.use(express.urlencoded());
app.use(
    session({
        name: "AuthCookie", 
        secret: "some secret string!",
        resave: false,
        saveUninitialized: true,
        // cookie: {maxAge: 3000}
    })
)

app.use('/login', (req, res, next) => {
    if (req.session.user) {
      return res.redirect('/private');
    } else {
      //here I',m just manually setting the req.method to post since it's usually coming from a form
      req.method = 'POST';
      next();
    }
  });
app.use('/private', (req, res, next)=>{
    console.log(req.session.id) //check to see if there's a session
    if(!req.session.user){      //if not a registered user go back to homepage
        return res.redirect('/')
    }
    else{
        next()
    }
})


app.use(async (req, res, next) => {     
    let date = new Date().toUTCString();
   
    let method = req.method;
    let url = req.originalUrl;
    let auth;
    if(!req.session.user){
      auth = '(Non-Authenticated User)'
    }else{
      auth = '(Authenticated User)';
    }
    console.log(date, method, url, auth);
    next();
  });



app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
configRoutes(app)
app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
  });