import React from 'react';
import { Link } from 'react-router-dom'


const Nav = ({ setAuth, auth }) => {
   const handleClick = () => {
      localStorage.clear();
      setAuth(null)
   }

   return (<>
      {auth ?
         <ul className='list'>
            <li><Link to="/" className='listChild'>Products</Link></li>
            <li><Link to="/add" className='listChild'>Add Products</Link></li>
            <li><Link to="/update" className='listChild'>Update Products</Link></li>
            <li><Link to="/delete" className='listChild'>Delete Product</Link></li>
            <li><Link to="/login" onClick={handleClick} className='listChild'>Logout</Link></li>
            <li>Hii {(auth)?.name}</li>
         </ul>
         : (
            <ul className='list'>
               <li><Link to="/signup" className='listChild'>SignUp</Link></li>
               <li><Link to="/login" className='listChild'>Login</Link></li>
            </ul>
         )
      }
   </>)
}

export default Nav