import React,{} from 'react';
import './App.css';
import Header from './components/Header'; 
import Login from './Login'; 
function App() { 
  return (
    
      <div>
         <header>
           <Header/>
         </header>
        <section>
          <Login/>
        </section>
      </div>
       
  );
}

export default App;
