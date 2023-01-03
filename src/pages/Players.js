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
const Players=()=>{ 
    const navigate=useNavigate();
    const [logo,setLogo]=useState("");
    useEffect(()=>{
        if(localStorage.username === undefined){
            navigate("/");
        }
        else{
            setLogo(require('../components/images/'+SchoolService.getSchoolImg(localStorage.school)));
        }
        toast.success('Welcome Buddy !', {
            position: toast.POSITION.TOP_CENTER
        });
        
    });
   

    return(
        <div> 
            <header>               
                <Navbar>
                    <NavItem icon = {<CgIcons.CgProfile/>}>
                        <DropDownMenu/>
                    </NavItem>
                    {/*<h5>
                            <span class = "nameR">
                                {localStorage.firstName} {localStorage.lastName}
                            </span>
                    </h5> */
                    }  
                </Navbar>
            </header>
            <section>
                <div>
               
                    <h5>
                    <span className = "name">                           
                            {"asfgfgsfgsfgyfyfyuf"}
                           
                        </span>               
                        <span className = "school">                           
                            {localStorage.school}
                            <img  src= {logo} style={{ width: 50, height:50,marginLeft: 10 }} className = 'player1' />
                        </span>
                    </h5>
                    
                </div>
                <h1 className = "text-center"><AiIcons.AiOutlineUser style={{ marginBottom: 10 ,marginRight: 5}}/>My Players</h1>
                <PlayersReactTable/>
             </section>
        </div>
    )
}
export default Players