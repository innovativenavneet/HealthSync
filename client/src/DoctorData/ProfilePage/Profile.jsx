import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getFirestore, getDoc, doc, collection} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import app from "../../FireBase/firebaseConfig";
import Header from "../../components/common/Header";
import DoctorAvatar from "../../assets/images/DoctorAvatar.png";
import Edit from "../../assets/images/Edit.png";
import Camera from "../../assets/images/Camera.png";
import { useUserAuth } from "../../context/UserAuthContext";
import Shimmer from "./Shimmer";


  const Profile = () => {

      const navigate = useNavigate();
      const location = useLocation();
      const { user } = useUserAuth();
      console.log("location", location);
      

      const [profileData, setProfileData] = useState(null);
      const [loading, setLoading] = useState(true);

      const fetchProfile = async () => {
        const db = getFirestore(app);
        const auth = getAuth(app);
        const user = auth.currentUser;
    
        if (!user) {
          console.error("No authenticated user found. Please log in.");
          return;
        }
    
        // Reference to the specific document
        const profileDocRef = doc(db, "users", user.uid, "Profile", "Details");
    
        try {
          const docSnap = await getDoc(profileDocRef);
    
          if (docSnap.exists()) {
            setProfileData(docSnap.data());
            console.log("Profile Data:", docSnap.data());
          } else {
            console.log("No such document exists.");
          }
        } catch (err) {
          console.error("Error fetching the data:", err);
        }
      };
    
      useEffect(() => {
        fetchProfile();
      }, []);
    

      if (loading) {
         <Shimmer />
        setLoading(false);
      }

  return (
    <div>
      { profileData ? (
            <div className="relative bg-[var(--light-blue)] min-h-screen">
            <Header/>
      
            <div className="absolute top-28 left-2/4 h-11 w-44 mt-1">
              <h1 className="font-sans font-bold text-3xl leading-3">My Profile</h1>
            </div>
      
            {/* Doctor Image */}
            <div className="absolute top-36 left-40">
              <div className="flex items-center justify-center w-56 h-56 rounded-full overflow-hidden border border-gray-300 bg-blue-400">
                <img
                  className="w-full h-full object-cover p-2 pb-8"
                  src={DoctorAvatar}
                  alt="Doctor Avatar"
                />
              </div>
              <div className="absolute h-11 w-11 flex items-center justify-center border border-gray-300 bg-blue-900 rounded-full left-[165px] top-[175px] overflow-hidden">
                <img
                  src={Camera}
                  className="object-cover w-full h-full p-2 cursor-pointer"
                  onClick={() => {
                    navigate("/updateprofile");
                  }}
                />
              </div>
            </div>
      
            {/* Personal Information */}
            <div className="absolute top-40 left-[477px] bg-white h-56 w-[720px] rounded-lg shadow-md border border-gray-300 p-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between w-full">
                  <div className="text-center flex-1">
                    <h2 className="font-sans font-bold text-xl leading-3">Personal Details</h2>
                  </div>
                  <div className="h-6 w-6">
                    <img
                      src={Edit}
                      alt="Edit Icon"
                      onClick={() => {
                        navigate("/updateprofile",{state : profileData});
                      }}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <h2 className="text-lg font-semibold text-gray-700 h-7 w-20 tracking-wider">Name:</h2>
                  <p className="text-base text-gray-600 tracking-widest">{profileData.name || user.displayName}</p>
                </div>
                <div className="flex items-center">
                  <h2 className="text-lg font-semibold text-gray-700 h-7 w-36 tracking-wider">Specialization:</h2>
                  <p className="text-base text-gray-600 tracking-widest">{profileData.specialization}</p>
                </div>
                <div className="flex items-center">
                  <h2 className="text-lg font-semibold text-gray-700 h-7 w-40 tracking-wider">Mobile Number:</h2>
                  <p className="text-base text-gray-600 tracking-widest">{profileData.mobileNumber}</p>
                </div>
                <div className="flex items-center">
                  <h2 className="text-lg font-semibold text-gray-700 h-7 w-16 tracking-wider">Email:</h2>
                  <p className="text-base text-gray-600 tracking-widest">{profileData.email || user.email}</p>
                </div>
                <div className="flex items-center">
                  <h2 className="text-lg font-semibold text-gray-700 h-7 w-24 tracking-wider">Address:</h2>
                  <p className="text-base text-gray-600 tracking-widest">{profileData.address}</p>
                </div>
              </div>
            </div>
      
            {/* Professional Details */}
            <div className="absolute top-[400px] left-[100px]">
              <div className="bg-white w-[500px] h-[180px] rounded-lg border border-gray-300 shadow-md space-y-3 p-4">
                <div className="flex items-center justify-between w-full">
                  <div className="text-center flex-1">
                    <h2 className="font-sans font-bold text-xl leading-3">Professional Details</h2>
                  </div>
                  <div className="h-6 w-6">
                    <img
                      src={Edit}
                      alt="Edit Icon"
                      onClick={() => {
                        navigate("/updateprofile",{state : profileData});
                      }}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <h2 className="text-lg font-semibold text-gray-700 w-24 tracking-wider">Hospital:</h2>
                  <p className="text-base text-gray-600 tracking-widest">{profileData.hospital}</p>
                </div>
                <div className="flex items-center">
                  <h2 className="text-lg font-semibold text-gray-700 w-42 tracking-wider">License Number:</h2>
                  <p className="text-base text-gray-600 tracking-widest">{profileData.licenseNumber}</p>
                </div>
                <div className="flex items-center">
                  <h2 className="text-lg font-semibold text-gray-700 w-40 tracking-wider">License Expiry:</h2>
                  <p className="text-base text-gray-600 tracking-widest">{profileData.licenseExpiry}</p>
                </div>
              </div>
            </div>
      
            {/* Social Links */}
            <div className="absolute top-[400px] left-[700px]">
              <div className="bg-white w-[500px] h-[180px] rounded-lg border border-gray-300 shadow-md p-4 space-y-3">
                <div className="flex items-center justify-between w-full">
                  <div className="text-center flex-1">
                    <h2 className="font-sans font-bold text-xl leading-3">Social Links</h2>
                  </div>
                  <div className="h-6 w-6">
                    <img
                      src={Edit}
                      alt="Edit Icon"
                      onClick={() => {
                        navigate("/updateprofile",{state : profileData});
                      }}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <h2 className="text-lg font-semibold text-gray-700 w-20 tracking-wider">Twitter:</h2>
                  <a
                    href="https://x.com/?mx=2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-gray-600 hover:underline tracking-widest"
                  >
                   {profileData.twitter}
                  </a>
                </div>
                <div className="flex items-center">
                  <h2 className="text-lg font-semibold text-gray-700 w-28 tracking-wider">Instagram:</h2>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-gray-600 hover:underline tracking-widest"
                  >
                   {profileData.instagram}
                  </a>
                </div>
                <div className="flex items-center">
                  <h2 className="text-lg font-semibold text-gray-700 w-28 tracking-wider">Facebook:</h2>
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-gray-600 hover:underline tracking-widest"
                  >
                    {profileData.facebook}
                  </a>
                </div>
              </div>
            </div>
          </div>
      ) : ( <Shimmer/> ) }
    </div>
  );
};

export default Profile;
