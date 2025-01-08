import React from "react";
import Header from "../components/common/Header";
import { getFirestore, getDocs, collection, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import app from "../pages/FireBase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState([]);

  const fetchProfile = async () => {
    const db = getFirestore(app);
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
      console.error("No authenticated user found. Please log in.");
      return;
    }

    const profileRef = collection(db, "users", user.uid, "Profile");

    try {
      const querySnapshot = await getDocs(profileRef);
      const fetchedProfile = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProfileData(fetchedProfile);
    } catch (err) {
      console.log("Error fetching the Data");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-blue-50">
        <div className="max-w-6xl mx-auto py-10 px-4">
          <h1 className="text-3xl font-bold text-center mb-8">My Profile</h1>
          {profileData.length > 0 ? (
            profileData.map((profile) => (
              <div key={profile.id} className=" rounded-lg shadow-lg p-6">
                {/* Header Section */}
                <div className="flex items-center mb-6">
                  <div className="w-[336px] h-[336px] rounded-full bg-blue-100 flex justify-center items-center overflow-hidden relative">
                    <img
                      src={profile.Image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full p-2">
                      <i className="fas fa-camera"></i>
                    </button>
                  </div>
                       <div className="p-6 ml-6">
        {/* Name */}
        <h2 className="text-2xl font-bold mb-2">{profile.Name}</h2>
        
        {/* Specification */}
        <h4 className="text-lg font-semibold text-gray-700">Specification</h4>
        <p className="text-lg text-gray-600 mb-4">{profile.Specification}</p>

        {/* Contact Number */}
        <h4 className="text-lg font-semibold text-gray-700 mt-2">
          Contact Number:
        </h4>
        <p className="text-gray-600 mb-4">{profile.PhoneNumber}</p>

        {/* Email */}
        <h4 className="text-lg font-semibold text-gray-700 mt-2">Email:</h4>
        <p className="text-gray-600 mb-4">{profile.Email}</p>

        {/* Address */}
        <h4 className="text-lg font-semibold text-gray-700 mt-2">Address:</h4>
        <p className="text-gray-600">{profile.Address}</p>
      </div>

                </div>

                {/* Details Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold">Professional Details</h4>
                    <p>Current Hospital: {profile.HospitalName}</p>
                    <p>License Number: {profile.LicenseNumber}</p>
                    <p>License Expiry: 31st December 2025</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold">Social Links & Awards</h4>
                    <p>Twitter: {profile.Twitter}</p>
                    <p>Instagram: {profile.Instagram}</p>
                    <p>Awards: {profile.Awards}</p>
                  </div>
                </div>

                {/* Edit Button */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => {
                      navigate("/updateprofile");
                    }}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-200"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
