import React,{useState} from 'react';
import './App.css';
import Header from './components/Header'; 
import Login from './Login'; 
import NavItem from './components/NavItem';
import DropDownMenu from './components/DropdownMenu';
import Profile from './components/Profile.js';
import * as CgIcons from 'react-icons/cg';
function App() { 
  return (
    
      <div>
         <header>
           <Header/>
           {//<Profile/>  
}
         </header>
        <section>
          <Login/>
        </section>
      </div>
       
  );
}

export default App;
