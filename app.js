const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash  = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const bodyParser  = require('body-parser')
const cors = require('cors')

// importing routes to main app
const index = require('./routes/index')
const users = require('./routes/users')

//initializing the app
const app = express()


//Passport config
require('./config/passport')(passport)

//DB config
const db = require('./config/keys').MongoURI


// connecting to the mongoDB

mongoose.connect(db, {
    useNewUrlParser:true
})
.then( () => console.log('mongoDB connected'))
.catch(err => console.log(err))


// body parser (to get data from the form)
app.use(express.urlencoded({extended:false}))

app.use(cors())
app.use(bodyParser.json())
// Express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }))

//Passport middleware

app.use(passport.initialize());
app.use(passport.session());




// using the routes
app.use('/', index)
app.use('/users', users)



// port that the app listens to
const PORT = process.env.PORT || 5000;

// listening to the port
app.listen(PORT,console.log(`server started on port ${PORT}`))
