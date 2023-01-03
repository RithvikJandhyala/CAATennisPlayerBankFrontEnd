import React from 'react';
import './App.css';
import App from './App'; 
import {  Route, Routes } from 'react-router-dom';
import Players from './pages/Players';
import AddMatchDataJH from './pages/AddMatchDataJH';
import AddMatchDataH from './pages/AddMatchDataH';
import AddMatchDataform from './pages/AddMatchDataform';
import AddPlayer  from './pages/AddPlayer';
import AllPlayers  from './pages/AllPlayers';
import PastMatches from './pages/PastMatches';
import MatchesSummary from './pages/MatchesSummary';
import TeamStanding from './pages/TeamStanding';


function RegisterRoutePaths() { 
  return (
    
 
       <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Players />} />
        <Route path = "/add-match-data-jh" element ={<AddMatchDataJH />}/>
        <Route path = "/add-match-data-h" element ={<AddMatchDataH />}/>
        <Route path = "/add-match-data-form" element ={<AddMatchDataform />}/>
        <Route path = "/add-player" element ={<AddPlayer />}/>
        <Route path = "/all-players" element ={<AllPlayers />}/> 
        <Route path = "/past-matches" element ={<PastMatches />}/>
        <Route path = "/matches-summary" element ={<MatchesSummary />}/>
        <Route path = "/team-standing" element ={<TeamStanding />}/>        
      </Routes> 
       
  );
}

export default RegisterRoutePaths;
