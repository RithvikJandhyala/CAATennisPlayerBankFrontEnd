import React, {useState,useRef,useEffect} from 'react'
import UserService from '../services/UserService'
import {useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar';
import BarLoader from "react-spinners/BarLoader";
import SchoolService from '../services/SchoolService';
import Select from 'react-select';


const AddUser = () => {
   
  const [username,setUserName] = useState('')
  const [name,setName] = useState('')
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [homeTeam,setHomeTeam] = useState('')
  const [password,setPassword] = useState('')
  const [role,setRole] = useState('Coach')
  const optionsSchools = [];
  const navigate  = useNavigate();
    useEffect(()=>{
        if(localStorage.username === undefined){
            navigate("/");
        }    
    });

  
    const inputUsername = useRef();  
    const inputFirstName = useRef();
  const inputLastName = useRef();
  const inputHomeTeam = useRef();
  const inputPassword = useRef();
  
  
  const [loading,setLoading] = useState(false);
 const saveUser = async(e) => {
    e.preventDefault();
    if (isValidForm()) {
        setLoading(true);

        // Trim the variables before constructing the user object
        const trimmedFirstName = firstName.trim();
        const trimmedLastName = lastName.trim();
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        const user = {
            firstName: trimmedFirstName,
            lastName: trimmedLastName,
            homeTeam,
            username: trimmedUsername,
            password: trimmedPassword,
            role
        };

        await UserService.saveUser(user).then((response) => {
            localStorage.message = response.data;
            navigate('/all-users');
        });

        setLoading(false);
    }
};
  const isValidForm = () => {
    var valid = true;
        if(username.length < 1){
            inputUsername.current.style.color = "red";
            valid = false;
        }
        else {
            inputUsername.current.style.color = "black";
        }

        if(firstName.length < 1){
            inputFirstName.current.style.color = "red";
            valid = false;
        }
        else {
            inputFirstName.current.style.color = "black";
        }
        if(lastName.length < 1){
            inputLastName.current.style.color = "red";
            valid = false;
        }
        else {
            inputLastName.current.style.color = "black";
        }
        if(homeTeam.length < 1){
            inputHomeTeam.current.style.color = "red";
            valid = false;
        }
        else {
            inputHomeTeam.current.style.color = "black";
        }
        if(password.length < 1){
            inputPassword.current.style.color = "red";
            valid = false;
        }
        else {
            inputPassword.current.style.color = "black";
        }
        
        return valid;
  }
  SchoolService.getSchools().then((response) => {           
    for(var i = 0; i < response.data.length; i++) 
    {
        optionsSchools.push({
            value: response.data[i].name,
            label: response.data[i].name,
        });
    }
});

  return (
    <div>
    <header>
        <Navbar /> 
     </header>
        <section>
        
        
           
     <br/> {loading?
                <div style={{marginBottom:0}}>
                    
                    <BarLoader
                        color={"#0d6efd"}
                        loading={loading}        
                        height = {4}
                        width = {200}
                        cssOverride={{marginLeft:'44%'}}          
                    />
                </div>
                :
                <></>    
            }<br/>
    <div className = "container" style={{paddingRight:'0.75rem',paddingLeft:'0.75rem',marginLeft: 'auto',marginRight:'auto'}}>
        <div className = "row">
            <div className = "card col-md-6 offset-md-3 offset-md-3">
                <div>
                    <h2 className = "text-center">Add User</h2>
                    <div className = "card-body">
                        <form action = "" >
                            <div  ref={inputUsername}>
                                <h5>Username:</h5>
                                    <input
                                        type = "text"
                                        placeholder = "Example: jdoe"
                                        name = "username"
                                       
                                        className = "form-control"
                                        value = {username}
                                        onChange = {(e) => setUserName(e.target.value)} 
                                        required />
                            </div>
                            <br/>
                            <div   ref={inputFirstName}>
                                <h5>First Name:</h5>
                                    <input
                                        type = "text"
                                        placeholder = "Example: John"
                                        name = "first name"
                                      
                                        className = "form-control"
                                        value = {firstName}
                                        onChange = {(e) => setFirstName(e.target.value)} 
                                        required />
                            </div>
                            <br/>
                            <div ref={inputLastName}>
                                <h5>Last Name:</h5>
                                    <input
                                        type = "text"
                                        placeholder = "Example: Doe"
                                        name = "Last name"
                                        
                                        value = {lastName}
                                        className = "form-control"
                                        onChange = {(e) => setLastName(e.target.value)} 
                                        required />
                            </div>
                            <br/>
                            <div ref={inputHomeTeam} >
                                <h5>Home Team:</h5>
                                <Select
                                    type = "text"
                                    placeholder = "Example: BASIS Scottsdale"
                                    //name={`player${index}Id`} 
                                                               
                                    onChange = {(e) =>{ setHomeTeam(e.label) }} 
                                    options={optionsSchools}
                                /> 
                            </div>
                            <br/>
                            <div ref={inputPassword}>
                                <h5>Password</h5>
                                    <input
                                        type = "text"
                                        placeholder = "Example: Abcd1234"
                                        name = "password"
                                        
                                        className = "form-control"
                                        value = {password}
                                        onChange = {(e) => setPassword(e.target.value)} 
                                        required />
                            </div>
                            <br/>
                            <button type="submit" className = "btn btn-primary mb-2 player-right player-left" 
                                     disabled = {loading}
                                     onClick = {(e) =>saveUser(e)}>
                                Submit
                            </button>
                            <button className = "btn btn-primary mb-2 player-right"
                                    disabled = {loading}                                    
                                    onClick = {(e) =>navigate ('/all-users')}>
                                Cancel
                            </button>
                        </form>

                    </div>
                </div>

            </div>

        </div>
        
    </div>
    </section>
    </div>
  )
}

export default AddUser;
