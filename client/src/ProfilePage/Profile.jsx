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

  const fetchProfile = async ()=>
  {
    const db = getFirestore(app);
    const auth = getAuth(app);
    const user = auth.currentUser;

    if(!user)
    {
      console.error("No authenticated user found. Please log in.");
      return;
    }

    const profileRef = collection(db,"users", user.uid, "Profile");
    console.log(user.uid);

    

    try
    {
      const querySnapshot = await getDocs(profileRef);
      const fetchedProfile = querySnapshot.docs.map((doc) =>({
        id : doc.id,
        ...doc.data(),
      }))
      console.log(fetchedProfile);
      
      setProfileData(fetchedProfile);
      console.log("igpeoirgh",id);
      
    }
    catch(err)
    {
      console.log("Error fetching the Data");
    }

  };

  useEffect(()=>{
    fetchProfile();
  },[]);





  return (
    <div>
      <Header />
      {
        profileData.length > 0 ? (
          profileData.map((profile)=>(
        <div key={profile.id} className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50">

          <div className="max-w-5xl mx-auto mt-12 px-6">
            {/* Profile Card */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
                <img
                  src={profile.Image}
                  alt="Profile"
                  className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow-md object-cover"
                />
                <h2 className="mt-4 text-3xl font-bold text-white">{profile.Name}</h2>
                <h3 className="text-lg text-gray-200">Category</h3>
              </div>
    
              {/* Profile Details */}
              <div className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase">
                      Email
                    </h4>
                    <p className="text-lg font-medium text-gray-800">{profile.Email}</p>
                  </div>
    
                  {/* License No. */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase">
                      License No.
                    </h4>
                    <p className="text-lg font-medium text-gray-800">{profile.LicenseNumber}</p>
                  </div>
    
                  {/* Address */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase">
                      Address
                    </h4>
                    <p className="text-lg font-medium text-gray-800">
                    {profile.Address}
                    </p>
                  </div>
    
                  {/* Contact Info */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase">
                      Contact Info
                    </h4>
                    <p className="text-lg font-medium text-gray-800">{profile.PhoneNumber}</p>
                  </div>
    
                  {/* Experience */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase">
                      Experience
                    </h4>
                    <p className="text-lg font-medium text-gray-800">{profile.Experience}</p>
                  </div>
    
                  {/* Hospital Name */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase">
                      Hospital Name
                    </h4>
                    <p className="text-lg font-medium text-gray-800">{profile.HospitalName}</p>
                  </div>
                </div>
              </div>
    
              {/* Footer */}
              <div className="bg-gray-100 p-4 text-center">
                <button
                onClick={()=>{navigate("/updateprofile")}}
                 className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-200">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
          ))
        ) : (
          <p>No data available</p>
        )
      }
    </div>
  );
};

export default Profile;
