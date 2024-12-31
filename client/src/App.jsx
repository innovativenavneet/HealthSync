import React from "react";
import {Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Profile from "./ProfilePage/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { UserAuthContextProvider } from '../src/context/UserAuthContext';
import ProtectedRoutes from "./components/common/ProtectedRoutes";
import Roles from "./pages/Roles";

function App() {

  return (

    <div className="App">
        <div className="font-sans">
          <UserAuthContextProvider>
            <Routes>
              <Route path="/" element={<Roles/>} />    
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<ProtectedRoutes> <HomePage/> </ProtectedRoutes>} />
              <Route path="/Dashboard"    element={<ProtectedRoutes> <Dashboard/> </ProtectedRoutes>} />
              <Route path="/Appointments" element={ <ProtectedRoutes> <Appointments/> </ProtectedRoutes> } />
              <Route path="/Profile" element={<ProtectedRoutes> <Profile/> </ProtectedRoutes>} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </UserAuthContextProvider>
        </div>
   
    </div>
  );
}

export default App;
   