import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Earth from './Components/Earth.js';
import WeatherInfo from './Components/WeatherInfo'; 
import { Link } from 'react-router-dom'; 
import './App.css'; 
import Advanced from './ComponentsAdv/AdvanceW.js'

function App() {

  const [selectedCity, setSelectedCity] = useState(null)
  return (
    <>
    <div className="full-screen" >
      <h1>3D Interactive Weather App</h1>
      
      <Earth onClickCity={setSelectedCity} />
    </div>
    
        <Link to="/advanced">
        <button>Advance</button>
        </Link>
      
         <div className="weather-overlay">
      <WeatherInfo city={selectedCity} />
      </div> 
      
    </>
  );
}

export default App;
