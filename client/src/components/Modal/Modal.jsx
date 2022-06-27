import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setModal } from '../../actions';
import './Modal.css'

const Modal = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [input, setInput] = useState({
        username: "",
        password: ""
    })

    const handleModal = (e) => {
        e.preventDefault();
        dispatch(setModal(false))
    }
    let handleOnChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin =  (e) => {
        e.preventDefault()
        axios({
            method: 'POST',
            data: input,
            withCredentials: true,
            url: 'http://localhost:3001/user/signin'
          })
            .then(res => {
                console.log(res.data)
            })
        dispatch(setModal(false))
        setInput({
            username: "",
            password: ""
        })
        navigate('/')
    }

    return (
        <>
            <div className='fondo'>
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
                    <form onSubmit={handleLogin} >
                        <div className='form'>
                            <label >Nombre: </label>
                            <input
                                type='text'
                                name="username"
                                value={input.username}
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
                        <button type='submit'>Aceptar</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Modal