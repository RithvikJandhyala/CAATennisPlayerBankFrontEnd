import React,{useEffect} from 'react'
import Navbar from '../components/Navbar';
import AllPlayersReactTable from '../components/AllPlayersReactTable';
import {useNavigate} from "react-router-dom";

const AllPlayers=()=>{
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
                <AllPlayersReactTable/>
            </section>
    
        </div>
    )
}

export default AllPlayers;