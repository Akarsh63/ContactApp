import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Contactmanager from './Pages/Contactmanager';
import Loginpage from './Pages/Loginpage';
import Registrationpage from './Pages/Registrationpage';
import Auth from './Pages/Auth';

function App() {

  return (
    <Router>
       <div >
       <Routes>
        <Route path='/' element={<Auth />} />
        <Route exact path='/Contactmanager' element={<Contactmanager />} />
       </Routes>
    </div>
    </Router>
    
  );
}

export default App;
