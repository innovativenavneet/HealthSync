import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const Login = () => {
  const [email, setEmail] = useState(""); // Initialize with an empty string
  const [password, setPassword] = useState(""); // Initialize with an empty string
  const [error, setError] = useState(""); // For handling error messages
  const { login, signInWithGoogle, uid } = useUserAuth(); // Invoke useUserAuth to access context
  const navigate = useNavigate(); // Corrected capitalization
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const userCredential = await login(email, password); // Await login function
      console.log("This is user UID:", userCredential.user.uid); // Log UID from userCredential
      navigate("/home"); // Navigate to the homepage
    } catch (err) {
      setError(err.message); // Set error message
    }
  };
  
  const handleSignInWithGoogle = async () => { // Removed e.preventDefault()
    setError("");
    try {
      await signInWithGoogle();
      navigate("/home"); // Corrected capitalization
    } catch (error) {
      console.log(error.message);
      setError(error.message); // Display error message
    }
  };

  return (
    <div className="bg-slate-400 h-screen flex justify-center items-center">
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg sm:max-w-sm sm:p-4">
        <h2 className="text-2xl font-semibold text-center mb-4">Health Sync Login</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button type="submit" className="w-full p-3 text-base bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Log In
            </button>
          </div>
        </form>

        <hr className="my-4" />

        <div>
          <GoogleButton
            onClick={handleSignInWithGoogle}
            className="w-full"
            type="dark"
          />
        </div>

        <div className="text-center mt-4">
        Don't have an account? <Link to={"/signup"} className="text-blue-500 hover:text-blue-700">Sign Up</Link>
      </div>
      </div>


    </div>
  );
};

export default Login;

// const Login = ()=>{
//   return (
//     <div>
//       <h1>hello</h1>
//     </div>
//   )
// };

// export default Login;
