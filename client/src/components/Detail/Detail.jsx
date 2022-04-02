import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, resetDetail } from "../../actions";
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
                <button className="button">Home</button>
            </Link>
            <div>
                {
                detail.name?
                <div className="recipe">
                    <img src={detail.image ? 
                        detail.image :
                        'https://img.freepik.com/foto-gratis/vista-perspectiva-plato-mate-naranja-vacio-cena-madera-blanca_79075-3058.jpg?size=626&ext=jpg'
                        } alt='not found'
                        />
                    <h1>{detail.name}</h1>
                    <div className="grid">
                        <div>
                            <h2>Tipo de plato</h2>
                            <p>{detail.dishTypes?detail.dishTypes: 'No definido'}</p>
                        </div>
                        <div>
                            <h2>Tipos de dietas</h2>
                            {detail.diets.map(el => el.name ? <p key={el.name}>{el.name +' '}</p>:<p key={el}>{el + ' '}</p> )}
                        </div>
                        <div>
                            <h2>Puntuacion del Plato</h2>
                            <p>{detail.score}</p>
                        </div>
                        <div>
                            <h2>Nivel de comida saludable</h2>
                            <p>{detail.healthScore}</p>
                        </div>
                    </div>
                    <h2>Resumén del plato</h2>
                    <p className="resumen-paso" dangerouslySetInnerHTML={{ __html: detail.summary }}></p>
                    <h2>Paso a paso</h2>
                    {detail.preparation?.map(el => <p className="resumen-paso" key={el}>{el}</p>)}
                </div>: <img className="gif" src="https://cdn.dribbble.com/users/645440/screenshots/3266490/loader-2_food.gif" />
                }
            </div>     
        </div>
    )
 }