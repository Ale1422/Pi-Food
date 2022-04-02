import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import './Nav.css'

const Nav = ({setCurrentPage}) => {
  return (
    <div className='nav'>
       <Link to='/home' style={{ textDecoration: 'none', color: 'white' }}><h1>Pi Food</h1></Link>
       <SearchBar setCurrentPage={setCurrentPage}/> 
       <button>
           Login
       </button>
    </div>
  )
}

export default Nav