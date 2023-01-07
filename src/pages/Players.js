import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar';
import PlayersReactTable from '../components/PlayersReactTable';
import SchoolService from '../services/SchoolService';
import BScottsdale from '../components/images/BScottsdale.png';
import {useNavigate} from "react-router-dom";
import NavItem from '../components/NavItem';
import DropDownMenu from '../components/DropdownMenu';
import * as CgIcons from 'react-icons/cg';
import * as AiIcons from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Players=()=>{ 
    const navigate=useNavigate();
    const [logo,setLogo]=useState("");
    useEffect(()=>{
        if(localStorage.username === undefined){
            console.log("IBIBIB")
            navigate("/");

        }
        else{
            setLogo(require('../components/images/'+SchoolService.getSchoolImg(localStorage.school)));
            console.log("IBIBIB");
        }
        // show any toast messages
        if(localStorage.message != undefined && localStorage.message.length > 0){
            toast.success(localStorage.message, {
                position: toast.POSITION.TOP_CENTER
            });
            localStorage.message ="";
        }
        
    });
   

    return(
        <div> 
            <header>               
                <Navbar/>
            </header>
            <section>
                <div>
                    <ToastContainer/>
               
                    <h5>
                    <span className = "name">                           
                          
                           
                        </span>               
                        <span className = "school">                           
                            {localStorage.school}
                            <img  src= {logo} style={{ width: 50, height:50,marginLeft: 10 }} className = 'player1' />
                        </span>
                    </h5>
                    
                </div>
                <h1 className = "page-name" style = {{marginLeft: '17%',fontFamily: "revert-layer"}}><AiIcons.AiOutlineUser style={{ marginBottom: 10 ,marginRight: 5}}/>My Players</h1>
                <PlayersReactTable/>
             </section>
        </div>
    )
}
export default Players