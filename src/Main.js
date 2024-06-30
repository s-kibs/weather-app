//src/Main.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import App from './App';
import AdvancedPage from './ComponentsAdv/AdvanceW'; // The new "advanced" page
import './App.css';

function Main() {
  return (
    <Router>
      <Routes>
        {/* Route for the main page */}
        <Route exact path="/" element={<App/>} />

        {/* Route for the advanced page */}
        <Route exact path="/advanced" element={<AdvancedPage/>} />
      </Routes>
    </Router>
  );
}

export default Main;
