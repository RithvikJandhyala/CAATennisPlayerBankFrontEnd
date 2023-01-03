import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar';
import PastMatchesReactTable from '../components/PastMatchesReactTable';
import {useNavigate} from "react-router-dom";

const PastMatches=()=>{
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
                <PastMatchesReactTable/>
            </section>
        </div>
    )
}

export default PastMatches;