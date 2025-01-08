import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import UpdateProfile from "./ProfilePage/UpdateProfile";

// Helper component for role-based route protection
const RoleBasedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Retrieve user data from localStorage
  const role = user?.role;

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />; // Redirect to login if unauthorized
  }

  return children;
};

function App() {
  return (
    <div className="App">
      <div className="font-sans">
        <UserAuthContextProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Roles />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/home" element={ <HomePage />} />
            <Route path="/appointments" element={ <Appointments/> } />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/updateprofile" element={<UpdateProfile/>} />

 
            {/* Protected Routes
            <Route
              path="/dashboard"
              element={
                <ProtectedRoutes>
                  <RoleBasedRoute allowedRoles={["DOCTOR"]}>
                    <Dashboard />
                  </RoleBasedRoute>
                </ProtectedRoutes>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoutes>
                  <HomePage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoutes>
                  <RoleBasedRoute allowedRoles={["PATIENT"]}>
                    <Appointments />
                  </RoleBasedRoute>
                </ProtectedRoutes>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/updateprofile"
              element={
                <ProtectedRoutes>
                  <UpdateProfile/>
                </ProtectedRoutes>
              } /> */}
          </Routes>
        </UserAuthContextProvider>
      </div>
    </div>
  );
}

export default App;
