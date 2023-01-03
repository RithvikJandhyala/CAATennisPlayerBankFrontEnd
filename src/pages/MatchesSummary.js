import React,{useEffect} from 'react'
import Navbar from '../components/Navbar';
import MatchesSummaryReactTable from '../components/MatchesSummaryReactTable';
import {useNavigate} from "react-router-dom";


const MatchesSummary=()=>{
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
                <MatchesSummaryReactTable/>
            </section>
        </div>
    )
}

export default MatchesSummary;