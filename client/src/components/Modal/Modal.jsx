import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setModal } from '../../actions';
import './Modal.css'

const Modal = () => {
    const dispatch= useDispatch()
    const [input, setInput] = useState({
        name: "",
        password: ""
    })
  
    const handleModal = (e) => {
        e.preventDefault();
        dispatch(setModal(false))
      }
      let handleOnChange= (e) =>{
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async () => {
        await axios.post('http://localhost:3001/user/signin')
    }

    return (
            <div className='modal'>
                    <button 
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            marginTop: '5px',
                            marginRight: '5px'
                    }}
                    onClick={(e) => handleModal(e)}
                    >
                        X
                    </button>
                <div className='titulo'>
                    <h2>Ingresa!</h2>
                </div>
                <form >
                    <div className='form'>
                        <label >Nombre: </label>
                        <input 
                            type='text' 
                            name="name" 
                            value={input.name}
                            onChange={(e) => handleOnChange(e)} 
                        />
                        <label >Contraseña: </label>
                        <input 
                            type='password' 
                            name="password" 
                            value={input.password}
                            onChange={(e) => handleOnChange(e)} 
                        />
                    </div>
                    <button>Aceptar</button>
                </form>
            </div>
    )
}

export default Modal