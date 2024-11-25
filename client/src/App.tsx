import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Profile from "./pages/Profile";
// now all of our routes will store here



function App() {
  return (
    <div className="App">
        <div className="font-sans">
        <BrowserRouter>                    
        <Routes>


          
          <Route path="/"                   element={<HomePage />} />
          <Route path="/Dashboard"     element={<Dashboard />} />
          <Route path="/Appointments"     element={<Appointments />} />
          <Route path="/Profile" element={<Profile />} />


        </Routes>
      </BrowserRouter>

        </div>
   
    </div>
  );
}

export default App;
   