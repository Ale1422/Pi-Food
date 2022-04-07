import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../../actions/index.js';
import Card from "../Card/Card";
import Paginado from '../Paginado/Paginado'
import Nav from "../Nav/Nav.jsx";
import Filters from "../Filters/Filters.jsx";
import './Home.css'
import Modal from '../Modal/Modal.jsx'


export default function Home() {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const open = useSelector((state) => state.modal)
    const [render, setRender] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 9
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    function paginado(pageNumber) {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch])

    return (
        <div  >
            <Nav setCurrentPage={setCurrentPage} search={true} recipeCreate={true} />
            <div className="grid-layout-menu">
                <div className="grid-paginado">
                    <Paginado
                        recipesPerPage={recipesPerPage}
                        allRecipes={allRecipes.length}
                        paginado={paginado}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                </div>
            </div>
            <Filters setCurrentPage={setCurrentPage} setRender={setRender} />
            <div className="grid-layout-cards">
                {
                    typeof (currentRecipes[0]) === 'string' ? <div>{currentRecipes[0]}</div> : currentRecipes.map(el => {
                        return (
                            <div key={el.id}>
                                <Card id={el.id} score={el.score} name={el.name} image={el.image} diets={el.diets.map(el => el.name ? el.name : el)} key={el.id} />
                            </div>
                        )
                    })
                }
            </div>
            {open? <Modal/> : null}
        </div>
    )
}

