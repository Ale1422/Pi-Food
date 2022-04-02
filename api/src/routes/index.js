const { Router } = require('express');
const {Recipe, Diet} = require('../db')
const recipes = require('./Recipes.js')
const types = require ('./Types.js')
const recipe = require ('./Recipe')
const user= require('./User')
const reporte = require('./Report')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', recipes)
router.use('/types', types)
router.use('/recipe', recipe)
router.use('/user', user)
router.use('/report', reporte)


module.exports = router;
