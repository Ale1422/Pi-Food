import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, resetDetail } from "../actions";
import './Detail.css';

export default function Detail(){

    let {id} = useParams()
    const dispatch = useDispatch()
    
    const detail = useSelector((state) => state.detail)
    
    useEffect(() => {
        dispatch(getDetail(id))
    },[dispatch])

    useEffect(()=>{
        return () => {setTimeout(dispatch(resetDetail()),1000)}
    },[])

    return(
        <div>
            <Link to = '/home'>
                <button>Home</button>
            </Link>
            {
                detail.name?
                <div>
                    <img src={detail.image} alt='not found' />
                    <h1>{detail.name}</h1>
                    <h2>Tipo de plato</h2>
                    <p>{detail.dishTypes?detail.dishTypes: 'No definido'}</p>
                    <h2>Tipos de dietas</h2>
                    {detail.diets.map(el => el.name ? <p key={el.name}>{el.name +' '}</p>:<p key={el}>{el + ' '}</p> )}
                    <h2>Resumén del plato</h2>
                    <p dangerouslySetInnerHTML={{ __html: detail.summary }}></p>
                    {/* <h3 dangerouslySetInnerHTML={{ __html: detail.summary }}></h3> */}
                    <h2>Puntuacion del Plato</h2>
                    <p>{detail.score}</p>
                    <h2>Nivel de comida saludable</h2>
                    <p>{detail.healthScore}</p>
                    <h2>Paso a paso</h2>
                    {detail.preparation?.map(el => <p key={el}>{el}</p>)}
                </div>: <p>Loading...</p>
            }
        </div>
    )
 }