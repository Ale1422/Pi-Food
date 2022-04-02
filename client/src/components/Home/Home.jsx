import React, { useState, useEffect }  from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import  {getRecipes, filterByDiet, orderByName, orderByScore}  from '../../actions/index.js';
import Card from "../Card/Card";
import Paginado from '../Paginado/Paginado'
import './Home.css'
import Nav from "../Nav/Nav.jsx";
import Filters from "../Filters/Filters.jsx";


export default function Home(){
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const [render, setRender] = useState('') 
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 9
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe);

    function paginado(pageNumber){
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getRecipes())
    },[dispatch])

    function handleSortName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setRender(`Render  ${e.target.value}` )
    }

    function handleSortScore(e){
        e.preventDefault();
        dispatch(orderByScore(e.target.value));
        setCurrentPage(1);
        setRender(`Render ${e.target.value}`)
    }

    function handleFilterDiet(e){
        dispatch(filterByDiet(e.target.value))
        setCurrentPage(1);
    }
    return(
     <div  >
         <Nav setCurrentPage={setCurrentPage}/>
         <div className="grid-layout-menu">
            <div className="grid-paginado">
                <Paginado 
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                     paginado={paginado}
                     currentPage={currentPage}
                />
            </div>
            <Link className="grid-createbutton" to = '/recipe'><button>Crear Receta</button></Link>
        </div>
        <Filters setCurrentPage={setCurrentPage} setRender= {setRender}/>
            <div className="grid-layout-cards">
            {
                typeof(currentRecipes[0]) === 'string'? <div>{currentRecipes[0]}</div>:currentRecipes.map(el => {
                    return(
                        <div>
                            <Card id={el.id} score={el.score} name= {el.name} image={el.image} diets={el.diets.map(el => el.name? el.name: el)} key={el.id}/>
                        </div>
                        )
                })
            }
            </div>
        </div>
    )
}

 