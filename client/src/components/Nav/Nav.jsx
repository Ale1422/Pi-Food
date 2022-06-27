import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setModal, setUser } from '../../actions'
import SearchBar from '../SearchBar/SearchBar'
import './Nav.css'

const Nav = ({ setCurrentPage, search, recipeCreate }) => {
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const dispatch= useDispatch()

  const handleModal = (e) => {
    e.preventDefault();
    dispatch(setModal(true))
  }

  const handleLogOut = () =>{
    axios({
      method: 'POST',
      withCredentials: true,
      url: "http://localhost:3001/user/logout"
    })
    axios({
      method: 'GET',
      withCredentials: true,
      url: "http://localhost:3001/user/infouser"
    })
        .then( res => dispatch(setUser(res.data)))
    navigate('/')
  }

  useEffect(() => {
    axios({
      method: 'GET',
      withCredentials: true,
      url: "http://localhost:3001/user/infouser"
    })
        .then( res => dispatch(setUser(res.data)))
  }, [])
  
  return (
    <div className='nav'>
      <Link to='/home' style={{ textDecoration: 'none', color: 'white' }}><h1>Pi Food</h1></Link>
      {search ? <SearchBar setCurrentPage={setCurrentPage} /> : null}
      {recipeCreate ? <Link to='/recipe'><button>Crear Receta</button></Link> : null}
      {
        user.name ?
        <>
          <h3>{user.name}</h3>
          <button onClick={(e) => handleLogOut(e)}>Cerrar Sesion</button>
        </>:
        <button onClick={(e) => handleModal(e)}>Login</button>}
    </div>
  )
}

export default Nav