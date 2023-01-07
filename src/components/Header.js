import React, { useState } from 'react';
import './Navbar.css';
import './Profile.css';
import { IconContext } from 'react-icons';
import pic from "./images/CAA.png";


function Header(props) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar); 
 
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
            <h1 className='header'>
               <img src = {pic} className = 'caa2'/>
                Tennis Player Bank    
            </h1>
               
        </div>         
      </IconContext.Provider>
    </>
  );
}

export default Header;
