const { Router } = require('express');
const {getAll, getRecipe, getDbInfo} = require ('./Controller')
const {Recipe, Diet} = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/recipes', async (req, res) => {
    const allRecipes = await getAll()
    const name = req.query.name
    if(name){
        const recipe = allRecipes.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        recipe.length?
        res.send(recipe):
        res.send([`No se encuentran recetas que incluyan ${name}`])
    }else{
        res.send(allRecipes)
    }
})
router.get('/recipes/:id', async (req, res)=>{
    const id = req.params.id
    const recipe = await getRecipe(id)
      res.send(recipe)
})

router.get('/recipedb', async(req, res)=>{
    const info= await getDbInfo()
    res.send(info)
})

router.get('/types', async (req,res) => {
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

router.post('/recipe', async (req,res) =>{
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

    recipeCreated.addDiet(dietsDb)

    res.send('Recipe created succesfully')
})

module.exports = router;
// {
//     "name": "Arroz frito para todes",
//     "summary": "Arroz frito rico pal bajon", 
//     "score": 99 , 
//     "healthScore": 87, 
//     "preparation": "Fritar el arroz en una olla hasta dorarlo, agregar agua con cuidado, hervir 10 min. Fin",
//     "diets": ["gluten free", "vegan"],
// }