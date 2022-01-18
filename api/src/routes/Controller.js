require('dotenv').config();
const {API_KEY} = process.env;
const axios = require ('axios')
const {Recipe, Diet} = require('../db')


const getApiInfo = async () => {
try {
    const info = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const getApiInfo= await info.data.results.map(el =>{
        const diets = []
        if(el.vegetarian) diets.push('vegetarian')
        return{
            id: el.id,
            name: el.title,
            image: el.image,
            dishTypes: el.dishTypes,
            diets: el.diets.concat(diets),
            score: el.spoonacularScore
        }
    })
    return getApiInfo
} catch (error) {
    console.log('Error Api',error.message)
}
}


const getDbInfo = async () => {
    let info = await Recipe.findAll({
        include:{
                model:Diet,
                through: {attributes: []},
                 attributes: ["name"],
                 exclude:["recipe_diet"]}
    })
    return info
}

const getAll = async () =>{
    const apiInfo = await getApiInfo()
    const dbInfo = await getDbInfo()
    const infoTotal = apiInfo? apiInfo.concat(dbInfo):dbInfo
    return infoTotal
}

const getRecipe = async (id) =>{
    if(id.length === 36){
            try {
                const info = await Recipe.findByPk(id,{
                    include:{
                        model:Diet,
                        through: {attributes: []},
                         attributes: ["name"],
                         exclude:["recipe_diet"]}
                            })
               return info
            } catch (error) {
                console.log('error seq', error);
            }
    }
    id = parseInt(id)
     try{
            const infoApi = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
            const diets = []
            if(infoApi.data.vegetarian) diets.push('vegetarian')
            return{
                id:infoApi.data.id,
                name:infoApi.data.title,
                image:infoApi.data.image,
                dishTypes:infoApi.data.dishTypes,
                diets:infoApi.data.diets.concat(diets),
                summary:infoApi.data.summary,
                score: infoApi.data.spoonacularScore,
                healthScore: infoApi.data.healthScore,
                preparation:infoApi.data.analyzedInstructions[0]?infoApi.data.analyzedInstructions[0].steps.map(el => el.step): ['Not found step by step']
       }
     }catch(e){
              console.log(e)
              return e.message
          }
}

module.exports = {
    getAll,
    getRecipe,
    getDbInfo
}

