import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; // Import Firestore

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PATIENT"); // Default role
  const [error, setError] = useState("");
  const { signup } = useUserAuth();
  const navigate = useNavigate();
  const db = getFirestore(); // Initialize Firestore

  // Function to save user data to Firestore
  const saveUserToFirestore = async (uid, email, role) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);

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
      const userCredential = await signup(email, password);
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Health Sync Signup
        </h2>

        {error && (
          <div className="text-red-600 text-center mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full border border-gray-300 rounded px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-medium">
              Select Role
            </label>
            <select
              className="w-full border border-gray-300 rounded px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="PATIENT">Patient</option>
              <option value="DOCTOR">Doctor</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-all"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 underline hover:text-blue-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
