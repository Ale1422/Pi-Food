const initialState = {
    recipes: [],
    recipesToFilter:[],
    diets: [],
    detail:[]   
}

function rootReducer(state=initialState, action){
    switch(action.type){
        case "GET_RECIPES":
            return{
                ...state,
                recipes: action.payload,
                recipesToFilter: action.payload
            }
        case 'GET_RECIPES_NAME':
            return{
                ...state,
                recipes: action.payload
            }
        case 'GET_DIETS':
            return{
                ...state,
                diets: action.payload
            }
        case 'GET_DETAIL':
            return{
                ...state,
                detail: action.payload
            }
        case 'RESET_DETAIL':
            return{
                ...state,
                detail:[]
            }
        case 'POST_RECIPE':
            return{
                ...state
            }
        case "FILTER_BY_DIET":
            const allRecipes = state.recipesToFilter;
            const stateFilter = action.payload === 'all' 
            ? allRecipes 
            : allRecipes.filter(
                recipe => 
                recipe.diets.includes(action.payload) ||
                 recipe.diets.map(el => el.name).includes(action.payload)
                 );
            return{
                ...state,
                recipes: stateFilter
            }
        case 'ORDER_BY_NAME':
            const sortName = action.payload === 'asc'?
                    state.recipes.sort(function(a,b){
                        if(a.name > b.name){
                            return 1
                        }
                        if(b.name > a.name){
                            return -1
                        }
                        return 0
                    }):
                    state.recipes.sort(function(a,b){
                        if(a.name>b.name){
                            return -1
                        }
                        if(b.name > a.name){
                            return 1
                        }
                        return 0
                    })
            return{
                ...state,
                recipes: sortName
            }
        case 'ORDER_BY_SCORE':
            const sortScore = action.payload === 'mayor'?
                    state.recipes.sort(function(a,b){
                        if(a.score > b.score){
                            return -1
                        }
                        if(b.score > a.score){
                            return 1
                        }
                        return 0
                    }):
                    state.recipes.sort(function(a,b){
                        if(a.score>b.score){
                            return 1
                        }
                        if(b.score > a.score){
                            return -1
                        }
                        return 0
                    })
            return{
                ...state,
                recipes: sortScore
            }
        default:
            return state
    }
}

export default rootReducer