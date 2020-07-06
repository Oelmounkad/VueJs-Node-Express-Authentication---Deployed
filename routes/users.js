const express = require('express')
const bycrypt = require('bcryptjs')
const passport = require('passport')

//User model
const User = require('../models/User')

const router = express.Router()

// Login route

router.get('/login', (req,res) => {
    res.render('login')
})




// Register route

router.get('/register', (req,res) => {
    res.render('register')
})


/*router.post('/register', (req,res) => {
    const {name,email,password,password2} = req.body
    let data = {
        name,
        email,
        password,
        password2
    }
    res.send(data)
})*/

// Register handle
router.post('/register', (req,res) => {
    const {name,email,password,password2} = req.body

    let errors = []

    // Check required fields
    if(!name || !email || !password || !password2){
        errors.push({
            msg: 'pls fill in all the fields!'
        })
    }

    // Check password match
    if(password !== password2){
        errors.push({msg : 'password do not match'})
    }

    // check password length
    if(password.length < 6){
        errors.push({msg: 'password should be at least 6 characters'})
    }

    if(errors.length > 0){
        res.send({
            errors
        })
    }else{
        //Validation passed

        User.findOne({email:email})
        .then(user => {
            if(user){
                // User exists
                errors.push({msg: 'Email is already in use !'})
                res.send({
                    errors
                })
            }else{
                    const newUser = new User({
                        name,
                        email,
                        password
                    })

                    // Hash password
                    bycrypt.genSalt(10, (err,salt) => 
                    bycrypt.hash(newUser.password,salt, (err,hash) =>{
                            if(err) throw err;
                            //set password to hashed passord
                            newUser.password = hash;
                            // save user
                            newUser.save()
                            .then(user => {
                                req.flash('success_msg','You are now registered !')
                                let data = {
                                    user:user,
                                    msg:`${user.name} , You are now registered !`
                                }
                                res.send(data)
                            })
                            .catch(err => console.log(err))
                    }) )

            }
        } )

    }

})

// Login handle
router.post('/login',(req,res,next) => {
    passport.authenticate('local',(err, user, info) => {
            if(err){
                res.send(`Passport error : ${err}`)
            }
            if(info){
                res.send(info);
            }
            if(user){
                res.send({username:user.name});
            }
    })(req,res,next)
})


//Logout handle
router.get('/logout',(req,res) => {
    req.logout()

   res.send('Logged out !')
})

module.exports = router;