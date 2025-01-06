import React, { useState } from "react";
import { useLocation, useNavigate , Link} from "react-router-dom";
import GoogleButton from "react-google-button"; // Import Google Button
import { useUserAuth } from "../context/UserAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, signInWithGoogle } = useUserAuth(); // Access user auth functions
  const navigate = useNavigate();
  const location = useLocation();

  // Extract role from query parameters
  const params = new URLSearchParams(location.search);
  const role = params.get("role");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const userCredential = await login(email, password); // Login using Firebase
      const uid = userCredential.user.uid;
  
      // Save role and UID to localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({ uid, role })
      );
  
      console.log("USER", uid, userCredential.user); // Fixed user reference
  
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };
  

  const handleSignInWithGoogle = async () => {
    setError("");
    try {
      const userCredential = await signInWithGoogle();
      const uid = userCredential.user.uid;

      // Save role and UID to localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({ uid, role })
      );

      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-slate-400 h-screen flex justify-center items-center">
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg sm:max-w-sm sm:p-4">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Login as {role === "DOCTOR" ? "Doctor" : "Patient"}
        </h2>

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
            <button
              type="submit"
              className="w-full p-3 text-base bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Log In
            </button>
          </div>
        </form>

        <div className="my-4">
          <GoogleButton
            onClick={handleSignInWithGoogle}
            className="w-full"
          />
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-700">
            Already have an account?{" "}
            <Link to="/signup" className="text-blue-500 underline hover:text-blue-700">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
