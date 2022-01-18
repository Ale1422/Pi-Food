import axios from 'axios'

export function getRecipes(){
    return async function(dispatch){
        let info = await axios('http://localhost:3001/recipes')
        return dispatch({
            type: 'GET_RECIPES',
            payload: info.data
        })
    } 
}

export function getRecipesName(name){
    return async function(dispatch){
        try {
            let info= await axios(`http://localhost:3001/recipes?name=${name}`)
            return dispatch({
                type: 'GET_RECIPES_NAME',
                payload: info.data
            })
        }catch(e){
            return dispatch({
                type: 'GET_RECIPES_NAME',
                payload: e
            })
        }
    }
}

export function getDiets(){
    return async function(dispatch){
        let info = await axios("http://localhost:3001/types")
        return dispatch({
            type:'GET_DIETS',
            payload: info.data
        })
    }
}

export function getDetail(id){
    return async function(dispatch){
        try {
            let info = await axios(`http://localhost:3001/recipes/${id}`)
            return dispatch({
                type: 'GET_DETAIL',
                payload: info.data
            })
        }catch(e){
            console.log(e);
        }
    }
}

export function resetDetail(){
    return{
        type: 'RESET_DETAIL'
    }
}

export function postRecipe(payload){
    return async function(distpach){
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