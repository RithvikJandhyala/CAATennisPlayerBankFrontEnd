import React, {useState,useRef,useEffect} from 'react'
import PlayerService from '../services/PlayerService'
import {useNavigate} from 'react-router-dom'
import Header from '../components/Header'
import Navbar from '../components/Navbar';

const AddPlayer = () => {
  const [name,setName] = useState('')
  const [singlesName,setSinglesName] = useState('')
  const [player1Name,setPlayer1Name] = useState('')
  const [player2Name,setPlayer2Name] = useState('')
  const [school,setSchool] = useState(localStorage.school)
  const [division,setDivision] = useState('')
  const [playerType,setPlayerType] = useState('')
  const navigate  = useNavigate();
  const [logo,setLogo]=useState("");
    useEffect(()=>{
        if(localStorage.username === undefined){
            navigate("/");
        }    
    });

  const inputSinglesName = useRef();
  const inputPlayer1Name = useRef();
  const inputPlayer2Name = useRef();
  const inputDivision = useRef();
  const inputPlayerType = useRef();
  

  const savePlayer = (e) => {
        e.preventDefault();   
        if(isValidForm()){
            if(playerType === "Singles"){
                var name = singlesName;
            }
            else{
                var name = player1Name +"/"+player2Name            
            }
            setName(name);             
            const player = {name,school,division,playerType}
            PlayerService.createPlayer(player).then((response) => {     
                navigate ('/home');
            }).catch(error => { 
                console.log(error);
            })
        }
  }
  const isValidForm = () => {
    var valid = true;
        if(playerType.length < 1){
            inputPlayerType.current.style.color = "red";
            valid = false;
        }
        else {
            inputPlayerType.current.style.color = "black";
        }

        if(division.length < 1){
            inputDivision.current.style.color = "red";
            valid = false;
        }
        else {
            inputDivision.current.style.color = "black";
        }
        
        if(playerType === 'Singles' || playerType.length < 1) {
            if (singlesName.length < 1) {
                inputSinglesName.current.style.borderColor = "red";
                valid = false;
            } else {
                inputSinglesName.current.style.borderColor = "black";
            }
           
        }        
        if(playerType === 'Doubles'){
            if (player1Name.length < 1)  { 
                inputPlayer1Name.current.style.borderColor = "red";
                valid = false;
            } else {
                inputPlayer1Name.current.style.borderColor = "black";
            }

            if (player2Name.length < 1)  { 
                inputPlayer2Name.current.style.borderColor = "red";
                valid = false;
            } else {
                inputPlayer2Name.current.style.borderColor = "black";
            }            
        }
        return valid;
  }

  return (
    <div>
 
    <header>
        <Navbar /> 
     </header>
        <section>
         <br/><br/>
    <div className = "container">
        <div className = "row">
            <div className = "card col-md-6 offset-md-3 offset-md-3">
                <div>
                    <h2 className = "text-center">Add Player</h2>
                    <div className = "card-body">
                        <form action = "" >
                            <h5>Type:</h5>
                            <div className = "form-group mb-2" ref = {inputPlayerType}>                                                                
                                <input type="radio" value="Singles" name="playerType" onChange = {(e) => setPlayerType(e.target.value)} /> Singles 
                                <br/>
                                <input type="radio" value="Doubles" name="playerType" onChange = {(e) => setPlayerType(e.target.value)} /> Doubles                           
                            </div>
                            <br/>
                            <h5>Division:</h5>
                            <div className = "form-group mb-2" ref={inputDivision}>                         
                                    <input type="radio" value="JH Boys"  name="division" onChange = {(e) => setDivision(e.target.value)} /> JH Boys 
                                    <br/>
                                    <input type="radio" value="JH Girls"  name="division" onChange = {(e) => setDivision(e.target.value)}/> JH Girls
                                    <br/>
                                    <input type="radio" value="HS Boys" name="division" onChange = {(e) => setDivision(e.target.value)} /> HS Boys 
                                    <br/>
                                    <input type="radio" value="HS Girls" name="division" onChange = {(e) => setDivision(e.target.value)}/> HS Girls                              
                                
                            </div>
                            <br/>
                           
                                    {(playerType ==='Doubles')?                                       
                                        <div>
                                            <h5>Player 1 Name:</h5>
                                            <input
                                                type = "text"
                                                placeholder = "Example: John Doe"
                                                name = "player1Name"
                                                ref={inputPlayer1Name}
                                                className = "form-control"
                                                value = {player1Name}
                                                onChange = {(e) => setPlayer1Name(e.target.value)} 
                                                required/>
                                            <br/>
                                            <h5>Player 2 Name:</h5>
                                            <input
                                                type = "text"
                                                placeholder = "Example: Pete Johnson"
                                                name = "player2Name"
                                                ref={inputPlayer2Name}
                                                className = "form-control"
                                                value = {player2Name}
                                                onChange = {(e) => setPlayer2Name(e.target.value)} 
                                                required/>
                                        </div>
                                        :
                                        <div>
                                            <h5>Name:</h5>
                                            <input
                                                type = "text"
                                                placeholder = "Example: John Doe"
                                                name = "singlesName"
                                                ref={inputSinglesName}
                                                className = "form-control"
                                                value = {singlesName}
                                                onChange = {(e) => setSinglesName(e.target.value)} 
                                                required />
                                        </div>
                                    }                           
                            <br/>
                                <div className = "form-group mb-2">
                                <h5> School:</h5>
                                    <input
                                        type = "text"
                                        readOnly={true} 
                                        name = "school"
                                        className = "form-control"
                                        value = {localStorage.school}
                                        onChange = {(e) => setSchool(e.target.value)}                                         
                                    />
                                </div>
                            <br/>
                            <button type="submit" className = "btn btn-primary mb-2 player-right player-left" onClick = {(e) =>savePlayer(e)}>
                                Submit
                            </button>
                            <button className = "btn btn-primary mb-2 player-right" onClick = {(e) =>navigate ('/home')}>
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

export default AddPlayer;