const { Router } = require('express');
const bcrypt = require('bcrypt')
const {User} = require('../db')
const passport = require('passport')

const router = Router()

router.post('/register', async (req, res) =>{
    const {username, name, lastname, password, email} = req.body
    try {
        const userExist = await User.findOne({
            where: {username}
        })
        if(userExist) {
            res.send('Ya existe el usuario')}
        if(!userExist){
            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = {
                username, name, lastname, email, password: hashPassword
            }
            await User.create(newUser)
            res.send('Usuario creado')
        }
    } catch (error) {
        console.log(error)
    }
}) 

router.post('/signin', (req, res, next) =>{
    passport.authenticate('local', (err, user, info) => {
        if(err) throw err;
        if(!user) res.send('No existe el usuario');
        else{
            req.logIn(user, err => {
                if(err) throw err;
                res.send(req.user)
            })
        }
    })(req,res,next)
})

router.get('/infouser',  (req, res) =>{
    res.send(req.user)
})

router.post('/logout' , async (req, res) => {
    await req.logOut();
   res.send(req.user)
})




module.exports= router