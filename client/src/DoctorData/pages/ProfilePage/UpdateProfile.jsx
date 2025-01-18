import React, { useState } from "react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import app from "../../../FireBase/firebaseConfig";
import Header from "../../../components/common/Header";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialState = location.state || {};
  const [profileData, setProfileData] = useState({
    name: initialState.name || "",
    specialization: initialState.specialization || "",
    mobileNumber: initialState.mobileNumber || "",
    email: initialState.email || "",
    address: initialState.address || "",
    hospital: initialState.hospital || "",
    licenseNumber: initialState.licenseNumber || "",
    licenseExpiry: initialState.licenseExpiry || "",
    twitter: initialState.twitter || "",
    instagram: initialState.instagram || "",
    facebook: initialState.facebook || "",
  });

  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user) {
      // Dynamically set the Firestore path based on whether it's a doctor profile
      const profileRef = doc(
        db,
        "Users",
        user.uid,
        profileData.specialization ? "Doctor Profile" : "Profile",
        "Details"
      );

      try {
        await setDoc(profileRef, profileData);
        alert("Profile updated successfully!");
        navigate("/profile");
      } catch (error) {
        console.error("Error updating profile: ", error);
      }
    } else {
      alert("No authenticated user found.");
    }
  };

  return (
    <div className="relative bg-[var(--light-blue)] min-h-screen">
      <Header />
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div className="space-y-4">
          {Object.entries(profileData).map(([field, value]) => (
            <div key={field} className="flex items-center space-x-4">
              <label className="text-lg font-semibold text-gray-700 w-32">{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              <input
                name={field}
                value={value}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
                placeholder={`Enter your ${field}`}
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 p-2 rounded text-white w-full hover:bg-blue-600"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
