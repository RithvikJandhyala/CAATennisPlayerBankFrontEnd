import React, { useState } from 'react';
import './Profile.css';
import {useNavigate} from "react-router-dom";
function NavItem(props) {
  const [open,setOpen] = useState(false);
  const navigate=useNavigate();          
  return (
      <div style={{ position: "relative", marginRight : 5}}>
         <span style={{ color: "white", marginTop : 20, marginRight : 10}}>
              {localStorage.firstName} {localStorage.lastName}
        </span>
        <a href='#' className="icon-button" onClick={() => setOpen(!open)} style={{ float: "right"}}>
            {props.icon}
        </a>
        <br/>
        {open? 
         <div>
            <a href='#' style={{ float: "right" , marginRight: 20}}>About</a>
            <a href='#'style={{ float: "right" ,marginRight: 20 }}
              onClick={() => {setOpen(!open);
                            localStorage.clear();
                            navigate("/");}}
            > Log out </a> 
          </div> :
          <></>   
        }        
      </div>
  );
}

export default NavItem;
