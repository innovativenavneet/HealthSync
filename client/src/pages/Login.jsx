import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, signInWithGoogle } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const db = getFirestore(); // Initialize Firestore

  const params = new URLSearchParams(location.search);
  const role = params.get("role");

  // Function to save user data in Firestore
  const saveUserToFirestore = async (uid, email, role) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);
      console.log("this is user id",uid);
      
      // Only save data if the user document doesn't already exist
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email,
          role,
          createdAt: new Date(),
        });
        console.log("User data saved in Firestore");
      } else {
        console.log("User already exists in Firestore");
      }
    } catch (err) {
      console.error("Error saving user data to Firestore:", err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await login(email, password);
      const uid = userCredential.user.uid;

      // Save user data to Firestore
      await saveUserToFirestore(uid, email, role);

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

  const handleSignInWithGoogle = async () => {
    setError("");

    try {
      const userCredential = await signInWithGoogle();
      const uid = userCredential.user.uid;
      const email = userCredential.user.email;

      // Save user data to Firestore
      await saveUserToFirestore(uid, email, role);

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
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Login as {role === "DOCTOR" ? "Doctor" : "Patient"}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Log In
          </button>
        </form>

        <div className="flex justify-center my-6">
          <GoogleButton
            onClick={handleSignInWithGoogle}
            className="w-full"
          />
        </div>

        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
