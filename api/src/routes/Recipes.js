const { Router } = require('express');
const {getAll, getRecipe} = require ('./Controller')


const router = Router()


router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res)=>{
    const id = req.params.id
    const recipe = await getRecipe(id)
      res.send(recipe)
})


module.exports= router