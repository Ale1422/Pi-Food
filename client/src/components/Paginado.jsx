import React from "react";
import './Paginado.css'

export default function Paginado({recipesPerPage, allRecipes, paginado, currentPage}){
    const pageNumber = [];

    for(let i=0 ; i< Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumber.push(i+1)
    }
    return(
    <div className="paginado">
        <nav >
            <ul>
                {pageNumber && pageNumber.map(number => {
                    return(
                        <a className={number===currentPage?'active':''} onClick={()=> paginado(number)} key={number}>{number}</a>
                    )
                })}
            </ul>
        </nav>
    </div>
    )
    
}