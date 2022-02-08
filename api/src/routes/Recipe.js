const { Router } = require('express');
const {Recipe, Diet} = require('../db')

const router = Router()

router.post('/', async (req,res) =>{
    let {
        name,
        summary, 
        score, 
        healthScore, 
        preparation,
        diets,
        createInDb
    } = req.body


    let recipeCreated = await Recipe.create({
        name,
        summary, 
        score, 
        healthScore, 
        preparation,
        createInDb 
    })

    let dietsDb = await Diet.findAll({
        where: {name : diets}
    })
    //por id de dieta para setear dieta a cada reseta    .setDiet(ids)
    recipeCreated.addDiet(dietsDb)

    res.send('Recipe created succesfully')
})


module.exports= router