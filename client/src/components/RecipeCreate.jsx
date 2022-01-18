import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import {postRecipe, getDiets} from "../actions"
import { useDispatch, useSelector } from "react-redux";
import './RecipeCreate.css'


function validator(input){
    let errors= {}

    if(!input.name){
        errors.name = 'Se requiere un Nombre'
    }
    if(!input.summary){
        errors.summary = 'Es requerido un resumen del plato'
    }
    if(input.score < 0 || input.score > 100){
        errors.score = 'Puntuación debe estar entre 0 y 100'
    }
    if(input.healthScore < 0 || input.healthScore > 100){
        errors.score = 'Nivel de comida saludable debe estar entre 0 y 100'
    }

    return errors
}

export default function RecipeCreate(){
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const diets =  useSelector((state)=> state.diets)
    const [step, setStep] = useState('')
    const [disable, setDisable] = useState(null)
    const [errors, setErrors]= useState({})
    const [input, setInput] = useState({
        name: '',
        summary: '',
        score: 0 ,
        healthScore: 0,
        preparation: [], 
        diets:[]       
    })

    useEffect(()=>{
        dispatch(getDiets())
    },[dispatch]);

    let handleOnChange= (e) =>{
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validator({
            ...input,
            [e.target.name]: e.target.value
        }))
        if(disable===null){
            setDisable(true)
        }else if(!errors.name&&!errors.summary&&!errors.score&&!errors.healthScore){
            setDisable(false)
        }        
    }

    let handleOnChangeStep= (e) =>{
        setStep(e.target.value)
    }

    let handleRemoveStep= (e, el) =>{
        e.preventDefault()
        setInput({
            ...input,
            preparation: input.preparation?.filter(ele => ele !== el)
        })
    }

    let handleAddStep = (e)=>{
        e.preventDefault();
        setInput({
            ...input,
            preparation: [...input.preparation, step]
        })
        setStep('')
    }

    let handleCheck = (e)=>{
        if(e.target.checked){
            setInput({
                ...input,
                diets:[...input.diets, e.target.value]
            })
        }else{
            setInput({
                ...input,
                diets: input.diets.filter(el => el !== e.target.value)
            })
        }
    }

    let  handleSubmit= (e) =>{
        e.preventDefault();
        dispatch(postRecipe(input));
        alert('Receta creada');
        setInput({        
            name: '',
            summary: '',
            score: 0 ,
            healthScore: 0,
            preparation: [], 
            diets:[]       
            })
        navigate('/home')
    }  
    
    return(
        <div className="recipe-create">
            <Link to= '/home'><button>Home</button></Link>
            <h1>Create your recipe</h1>
        
            <form onSubmit={handleSubmit}>
                <div className="grid-form">
                    <label className="grid-label">Nombre: </label>
                    <input className="grid-input" type='text' name="name" value={input.name} onChange={(e) => handleOnChange(e)}></input>
                    {errors.name && (<p>{errors.name}</p>)}
                    <label className="grid-label">Resumen:</label>
                    <input className="grid-input" type='text' name="summary" value={input.summary} onChange={(e) => handleOnChange(e)}></input>
                    {errors.summary && (<p>{errors.summary}</p>)}
                    <label className="grid-label">Puntuación: </label>
                    <input className="grid-input" type='number' name="score" value={input.score} onChange={(e) => handleOnChange(e)}></input>
                    {errors.score && (<p>{errors.score}</p>)}
                    <label className="grid-label">Nivel de comida saludable: </label>
                    <input className="grid-input" type='number' name="healthScore" value={input.healthScore} onChange={(e) => handleOnChange(e)}></input>
                    {errors.healthScore && (<p>{errors.healthScore}</p>)}
                    <label className="grid-label">Paso a paso: </label>
                    <input className="grid-input" type='text' name="step" value={step} onChange={(e) => handleOnChangeStep(e)}></input>
                    <button className="grid-button" onClick={handleAddStep} >Agregar</button>
                    {input.preparation?.map(el => <><p className="grid-step">{el}</p><button className="grid-stepbutton" onClick={(e)=>handleRemoveStep(e,el)}>Eliminar</button></>)}
                </div>   
                <div className="grid-dietas">
                    <h3 className="grid-titulo">Tipo de dieta</h3>
                    {diets?.map(el =>{
                        return(
                            <><div>
                                <label><input 
                                onChange={e => handleCheck(e)} 
                                type='checkbox' 
                                name={el} 
                                value={el}
                                key={el}
                                ></input>{el}</label>
                            </div></>
                        )
                    })}
                </div>
                <button type="submit" disabled={disable}>Crear</button>
            </form>
        </div>
    )
}