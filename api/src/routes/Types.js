const { Router } = require('express');
const {getAll} = require ('./Controller')
const {Recipe, Diet} = require('../db')

const router = Router()


router.get('/', async (req,res) => {
    const typeDiets = await Diet.findAll() 
    const dietsType = typeDiets.map(el => el.name)
    if(!typeDiets.length>0){
     const recipes = await getAll()
     const diets = recipes.map(el => el.diets)
  
     diets.map( el => {
         el.forEach(element => {
             Diet.findOrCreate({
                 where:{name : element}
             })
         });
     })
     const info = await Diet.findAll()
     const dietsIf = info.map (el => el.name)
     res.send(dietsIf)
    }else{
        res.send(dietsType)
    }
 })

 
 module.exports= router