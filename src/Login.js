import React,{useState,useEffect} from 'react';
import './App.css';
import Left from './components/images/racket_left.png';

import mygif from './components/images/newtennisgif.gif';
import win from "./components/images/checkb.png";
import Right from './components/images/racket_right.png';
import {  useNavigate } from "react-router-dom";
import UserService from './services/UserService';
import Alert from 'react-bootstrap/Alert';
import BarLoader from "react-spinners/BarLoader"; 
import pic from "./components/images/CAA.png";


import * as AiIcons from 'react-icons/ai';


function Login() { 

  const navigate=useNavigate();
  const [username,setUserName]=useState('');
  const [password,setPassword]=useState('');
  const [error, setError] = useState("");
  const [loading,setLoading] = useState(false);
  const[showPassword,setShowPassword] = useState(false);
  const seePassword = () => setShowPassword(!showPassword);
  const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );


  useEffect(()=>{
    if(localStorage.username !== undefined){
        navigate("/home");
    }
    });
  
  const authenticateUser= async(e)=>{
    e.preventDefault();
    setLoading(true); 
    const user = {username,password};
    //await sleep(500);  
    await UserService.authenticateUser(user).then((response) =>{
      
        if(response.data===""){  
            setError("Invalid Login Credentails");
        }
        else 
        {
            localStorage.school = response.data.homeTeam;
            localStorage.firstName = response.data.firstName;
            localStorage.lastName = response.data.lastName;
            localStorage.username = username;
            navigate('/home');     
        }      
    }).catch(error1 => { 
        setError("Failed to log in");
        setLoading(false); 

    })
    setLoading(false); 

  };
 

  return (
    <div>
    <div  style={{height: '90%' ,textAlign:"center",backgroundImage:""}}>      
    
    <img src={mygif} style={{position: "relative",float: 'left',
        height: '111%',
        width:'75%'
        }}/>
    <div style={{position: "absolute",float: 'left',
        height: '15%',
        width:'80%',
        bottom: 30,
        borderRadius : 20,
        background: "rgb(0, 0, 0)", /* Fallback color */
        background: "rgba(0, 0, 0, 0.5)", /* Black background with 0.5 opacity */
        color: "#f1f1f1", /* Grey text */  
        padding: 20 ,/* Some padding */
        clipPath: "polygon(30px 0, 100% 0%, calc(100% - 32px) 100%, 0% 100%)"
        }}>
             
                            <h3 style={{color: 'white'/*"rgb(39, 58, 94)"*/ ,marginRight:50,
                                        fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif"  }}>
                               <img  src= {win} style={{ width: 25, height:25,marginRight:10 }} className = 'player1' />
                               Manage Your Tennis Season With Ease!
                            </h3>
                            <h3 style={{color: 'white'/*"rgb(39, 58, 94)"*/ ,marginRight:50,
                                        fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif"  }}>
                              <img  src= {win} style={{ width: 25, height:25,marginRight:10 }} className = 'player1' />
                               Boost The Productivity Of Your Coaches!
                            </h3> 
    </div>
   
   
        <div  className="login">
            <div className = "card-body">
                            <form>                      
                            
                            <img src = {pic} style={{marginTop: 50,height: 70}}/>
                            <h1 className='logotext' style={{marginTop:10}}>Tennis Platform</h1>
                            <br></br>                         
                           
                            <br/> {error && <Alert variant="danger">{error}</Alert>} <br/>
                                <div className = "form-group mb-2" style={{marginTop:"0%"}}>
                                    <label className = "form-label" style={{float: 'left', marginLeft: "6%"}}>Email address</label>
                                <input
                                    type = "text"
                                    value={username}
                                    placeholder = "Enter your email"
                                    name = "username"
                                    onChange={(evt)=>{ setUserName(evt.target.value);}}
                                    className = "form-control"
                                    style={{marginLeft: "5%", width: "90%"}}
                                    required= {true}
                                >
                                </input>
                            </div>
                            <div className = "form-group mb-2" style={{marginTop:"5%"}}>
                                <label className = "form-label" style={{float: 'left', marginLeft: "6%"}}>Password</label>
                                <input
                                    type = {showPassword?"text":"password"}
                                    placeholder = "Enter your password"
                                    value={password}
                                    name = "name"
                                    onChange={(evt)=>{ setPassword(evt.target.value);}}
                                    className = "form-control"
                                    style={{marginLeft: "5%", width: "90%"}}
                                    required = {true} 
                                >
                                </input>
                                {/*
                                <span  onClick={seePassword} style={{float: 'right', marginRight: "6%", marginBottom: "6%" , cursor: 'pointer'}}>
                                    {showPassword? 
                                    <AiIcons.AiOutlineEyeInvisible style={{ height:20,width:20}}/>:
                                    <AiIcons.AiOutlineEye style={{ height:20,width:20}}/>
                                    }
                                </span>
                                */}
                            </div> 
                            <br></br>
                            <button className = "btn btn-primary" style={{marginTop:"5%",width:"90%",marginBottom:20, backgroundColor: "rgb(39, 58, 94)" , borderColor: "rgb(39, 58, 94)"}}
                             onClick={authenticateUser}
                             disabled = {loading} 
                             >
                                Login
                            </button>
                            <div/> {loading?
                                <div style={{marginTop:30}}>
                                    
                                    <BarLoader
                                        color={"#0d6efd"}
                                        loading={loading}        
                                        height = {4}
                                        width = {200}
                                        cssOverride={{marginLeft:'34%'}}          
                                    />
                            </div>
                            :
                            <></>    
                            }<div/>

                            <br/><br/><br/>
                                <div class = "footer">                                    
                                    <p style={{margin : 0}}><small>Copyright @CAATennisPlatform</small></p>
                                    <p style={{marginTop : 0}}><small>Created by Rithvik Jandhyala</small></p>
                                 </div>                          
                        </form>  
                                                       
        </div>
        
      </div>
      </div>
   
      
      </div>
      
       
  );
}

export default Login;
