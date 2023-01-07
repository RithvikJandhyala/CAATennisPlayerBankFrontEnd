import React from 'react'
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import './Profile.css';

const Profile = () => {
  const navigate=useNavigate();
  return (
    <div className='flex flex-col dropDownProfile'>
        
        <div className='flex flex col gap-4'>
          <h6 className='text'>
            <div style={{color: "black"}} className="text-center">{localStorage.firstName+" "+ localStorage.lastName }</div>
            <div className = "dropdown-button">
             Profile
            </div>
            <div className = "dropdown-button" onClick={()=>{navigate('/'); localStorage.clear()}}>
             Log Out
            </div>
          </h6>
        </div>
    </div>
  )
}



export default Profile