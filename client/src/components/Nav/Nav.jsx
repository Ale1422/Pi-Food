import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setModal } from '../../actions'
import SearchBar from '../SearchBar/SearchBar'
import './Nav.css'

const Nav = ({ setCurrentPage, search, recipeCreate }) => {
  const dispatch= useDispatch()

  const handleModal = (e) => {
    e.preventDefault();
    dispatch(setModal(true))
  }


  return (
    <div className='nav'>
      <Link to='/home' style={{ textDecoration: 'none', color: 'white' }}><h1>Pi Food</h1></Link>
      {search ? <SearchBar setCurrentPage={setCurrentPage} /> : null}
      {recipeCreate ? <Link to='/recipe'><button>Crear Receta</button></Link> : null}
      <button onClick={(e) => handleModal(e)}>Login</button>
    </div>
  )
}

export default Nav