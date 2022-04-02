import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { getRecipesName } from '../../actions';
import './SearchBar.css'


export default function SearchBar({setCurrentPage}){
    const dispatch= useDispatch();
    const [name, setName] = useState('');

    function handleInput(e){
        e.preventDefault();
        setName(e.target.value);
    }

    let handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(getRecipesName(name));
        // setCurrentPage(1)
        setName("")
    }

    return(
        <div className='searchBar'>
            <input
                type= 'text'
                placeholder='Buscar...'
                onChange={(e) => handleInput(e)}
                value={name}
            />
            <button onClick={(e) => handleSubmit(e)} type='submit'>Buscar</button>
        </div>
    )

}