import React,{useEffect} from 'react'
import Navbar from '../components/Navbar';
import TeamStandingReactTable from '../components/TeamStandingReactTable';
import {useNavigate} from "react-router-dom";
const TeamStanding=()=>{ 
    const navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.username === undefined){
            navigate("/");
        }
    }); 
    return(
        <div> 
            <header>
                <Navbar /> 
            </header>
            <section>
                <TeamStandingReactTable/>
            </section>
        </div>
    )
}
export default TeamStanding;