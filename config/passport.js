const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


// Load User model 
const User = require('../models/User')

module.exports = (passport) => {
    passport.use(
        new localStrategy({usernameField: 'email'},(email,password,done) => {
            //Match User
            User.findOne({email:email})
            .then(user => {
                if(!user){
                    return done(null,false,{authErrorMessage:'That email is not registered'});
                }
                // Match password
                bcrypt.compare(password, user.password, (err,isMatch) =>{
                    if(err) throw err;
                    if(isMatch){
                        return done(null,user)
                    }else{
                        done(null,false,{authErrorMessage:'Password incorrect !'})
                    }
                })

            })
            .catch(err => console.log(err))
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) =>{
          done(err, user);
        });
      });


}