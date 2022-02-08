import axios from 'axios'

export function getRecipes(){
    return  function(dispatch){
        return axios('http://localhost:3001/recipes')
                .then(response => dispatch({
                    type: 'GET_RECIPES',
                    payload: response.data
                     }))
                }
            }

export function getRecipesName(name){
    return function(distpach){
        return axios(`http://localhost:3001/recipes?name=${name}`)
                .then(response => distpach({type:'GET_RECIPES_NAME', payload: response.data}))
                .catch( error => console.log(error))
    }
}

export function getDiets(){
    return  function(dispatch){
        return axios("http://localhost:3001/types")
                .then(response => dispatch({type:'GET_DIETS',payload: response.data}))
                }
}

export function getDetail(id){
    return function(dispatch){
        return  axios(`http://localhost:3001/recipes/${id}`)
                .then(response=> dispatch({type:'GET_DETAIL', payload:response.data}))
                .catch(error => console.log(error))
    }
}

export function resetDetail(){
    return{
        type: 'RESET_DETAIL'
    }
}

export function postRecipe(payload){
    return async function(){
        let info = await axios.post("http://localhost:3001/recipe", payload)
        return info.data
    }
}

export function filterByDiet(payload){
    return{
        type: 'FILTER_BY_DIET',
        payload 
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByScore(payload){
    return{
        type: 'ORDER_BY_SCORE',
        payload
    }
}