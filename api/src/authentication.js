const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt'); 

const {User} = require('./db');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy(async(username, password, done) =>{
            await User.findOne({where:{username}})
                .then(async (user) => {
                    if(!user) return done(null, false, {message:'Incorrect username or password'})
                    await bcrypt.compare(password, user.password, (err,result) => {
                        if(err) throw err
                        if(result === true) return done(null, user)
                        else return done(null,false)
                    })
                })            
        })
    )

    passport.serializeUser((user,cb) =>{
        cb(null, user.id)
    })

    passport.deserializeUser(async (id,cb) => {
        await User.findOne({where:{id}}) 
            .then((user) => {
                cb(null, user)
            })
        }
    )
}