import React, { useState, useEffect }  from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import  {getRecipes, filterByDiet, orderByName, orderByScore}  from '../actions/index.js';
import Card from "./Card";
import Paginado from './Paginado'
import SearchBar from "./SearchBar.jsx";
import './Home.css'

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
    }
    return(
     <div  >
         <div className="grid-layout-menu">
            <div className="grid-titulo"><h1>Fast Food</h1></div>
            <div className="grid-searchBar"><SearchBar setCurrentPage={setCurrentPage}/></div>
            <div className="grid-paginado">
                <Paginado 
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                     paginado={paginado}
                     currentPage={currentPage}
                />
            </div>
            <Link className="grid-createbutton" to = '/recipe'><button>Crear Receta</button></Link>
            <div className="grid-filter">
                    <select  onChange={(e) => handleFilterDiet(e) }>
                        <option value='all'>Todas</option>
                        <option value='vegetarian'>Vegetariana</option>
                        <option value='vegan'>Vegana</option>
                        <option value='gluten free'>Sin gluten</option>
                        <option value='lacto ovo vegetarian'>Ovo Lacto vegetariana</option>
                        <option value='dairy free'>Sin lacteos</option>
                        <option value='pescatarian'>Pescatariana</option>
                        <option value='paleolithic'>Paleo</option>
                        <option value='primal'>Primitivo</option>
                        <option value='fodmap friendly'>FODMAP bajo</option>
                        <option value='whole 30'>Entero30</option>
                    </select>
                </div>
                <div className="grid-alfabetico">
                    <select onChange={(e) => handleSortName(e)}>
                        <option value='sin'>Orden Alfabetico</option>
                        <option value='asc'>A-Z</option>
                        <option value='des'>Z-A</option>
                    </select>
                </div>
                <div className="grid-puntuacion">    
                    <select onChange={(e)=> handleSortScore(e)}>
                        <option value='puntuacion' >Puntuación</option>
                        <option value='mayor' >Mayor Puntuación</option>
                        <option value='menor' >Menor Puntuación</option>
                    </select>
                </div>    

        </div>
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
