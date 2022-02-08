import React from "react";
import './Paginado.css'

export default function Paginado({recipesPerPage, allRecipes, paginado, currentPage}){
    const pageNumber = [];

    let maxPage= Math.ceil(allRecipes/recipesPerPage)

    for(let i=0 ; i<maxPage ; i++){
        pageNumber.push(i+1)
    }
    return(
    <div className="paginado">
        <nav >
            <ul>
                {pageNumber && pageNumber.map(number => {
                    return(
                        <button className={number===currentPage?'active':''} onClick={()=> paginado(number)} key={number}>{number}</button>
                    )
                })}
            </ul>
        </nav>
    </div>
    )
    
}