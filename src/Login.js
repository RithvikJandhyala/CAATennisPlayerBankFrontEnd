import React,{useState} from 'react';
import './App.css';
import Left from './components/images/racket_left.png';
import Right from './components/images/racket_right.png';
import {  useNavigate } from "react-router-dom";
import UserService from './services/UserService';
import Alert from 'react-bootstrap/Alert' 


function Login() { 

  const navigate=useNavigate();
  const [username,setUserName]=useState('');
  const [password,setPassword]=useState('');
  const [error, setError] = useState("")
  
  const authenticateUser= (e)=>{
    e.preventDefault();
    const user = {username,password}
   
    UserService.authenticateUser(user).then((response) =>{
      
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

    })

  };
 

  return (
    <div  style={{height: '90%' ,textAlign:"center",backgroundImage:""}}>      
    
    <img src={Left} style={{position: "relative",float: 'left',
        height: 400,
        marginLeft:50,
        //left: "-45vh",
        top: "14vh"}}/>
    <img src={Right} style={{position: "relative",float: 'right',
        height: 400,
        marginRight:50,
        //left: "50vh",
        top: "14vh"}}/>
        <div  className="login">
            <div className = "card-body">
                            <form>
    
                            <h2 className="text-center mb-4" style={{marginTop: 20}}>Log In</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                                <div className = "form-group mb-2" style={{marginTop:"5%"}}>
                                    <label className = "form-label">Username</label>
                                <input
                                    type = "text"
                                    value={username}
                                    placeholder = "Username"
                                    name = "username"
                                    onChange={(evt)=>{ setUserName(evt.target.value);}}
                                    className = "form-control"
                                    style={{marginLeft: "5%", width: "90%"}}
                                    required= {true}
                                >
                                </input>
                            </div>
                            <div className = "form-group mb-2" style={{marginTop:"5%"}}>
                                <label className = "form-label">Password</label>
                                <input
                                    type = "password"
                                    placeholder = "Password"
                                    value={password}
                                    name = "name"
                                    onChange={(evt)=>{ setPassword(evt.target.value);}}
                                    className = "form-control"
                                    style={{marginLeft: "5%", width: "90%"}}
                                    required = {true} 
                                >
                                </input>
                            </div> 
                            <button className = "btn btn-primary" style={{marginTop:"5%",width:"70%",marginBottom:20}}
                             onClick={authenticateUser}
                             >
                                Login
                            </button>
                             
                        </form>     
                       
          
       </div>

      </div>
      </div>
       
  );
}

export default Login;
