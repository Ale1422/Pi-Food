const { Router } = require('express');
const {Recipe, Diet} = require('../db')
const recipes = require('./Recipes.js')
const types = require ('./Types.js')
const recipe = require ('./Recipe')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', recipes)
router.use('/types', types)
router.use('/recipe', recipe)


module.exports = router;
