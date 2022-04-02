import React from 'react'
import { useDispatch } from 'react-redux';
import { filterByDiet, orderByName, orderByScore } from '../../actions';
import './Filters.css'

const Filters = ({setCurrentPage, setRender}) => {
    const dispatch = useDispatch()

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

    return (
        <div className='filters'>
                <h3>Filtros</h3>
                <select onChange={(e) => handleFilterDiet(e)}>
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
                <select onChange={(e) => handleSortName(e)}>
                    <option value='sin'>Orden Alfabetico</option>
                    <option value='asc'>A-Z</option>
                    <option value='des'>Z-A</option>
                </select>
                <select onChange={(e) => handleSortScore(e)}>
                    <option value='puntuacion' >Puntuación</option>
                    <option value='mayor' >Mayor Puntuación</option>
                    <option value='menor' >Menor Puntuación</option>
                </select>
        </div>
    )
}

export default Filters