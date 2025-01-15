import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import app from "../../FireBase/firebaseConfig";
import Header from "../../components/common/Header";
import DoctorAvatar from "../../assets/images/DoctorAvatar.png";
import Edit from "../../assets/images/Edit.png";

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
    <div className="bg-[var(--light-blue)]">
      <Header />
      <div className="absolute top-28 left-2/4 h-11 w-44 mt-1">
        <h1 className="font-sans font-bold text-3xl leading-3">My Profile</h1>
      </div>

      {/* Doctor Image */}
      <div className="absolute top-36 left-40">
        <div className="flex items-center justify-center w-56 h-56 rounded-full overflow-hidden border border-gray-300 bg-blue-300">
          <img className="w-full h-full object-contain p-2 pb-8" src={DoctorAvatar} alt="Doctor Avatar" />
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white h-56 w-[720px] rounded-lg shadow-md border border-gray-300 p-2 absolute top-40 left-[477px]">
        <div className="space-y-2">
          <div className="flex items-center justify-between w-full">
            <div className="text-center flex-1">
              <h2 className="font-sans font-bold text-xl leading-3">Professional Details</h2>
            </div>
            <div className="h-6 w-6">
              <img src={Edit} alt="Edit Icon" />
            </div>
          </div>
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-700 h-7 w-20 tracking-wider">Name:</h2>
            <p className="text-base text-gray-600 tracking-widest">Anand</p>
          </div>
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-700 h-7 w-36 tracking-wider">Specialization:</h2>
            <p className="text-base text-gray-600 tracking-widest">Cardiologist</p>
          </div>
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-700 h-7 w-40 tracking-wider">Mobile Number:</h2>
            <p className="text-base text-gray-600 tracking-widest">1234567890</p>
          </div>
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-700 h-7 w-16 tracking-wider">Email:</h2>
            <p className="text-base text-gray-600 tracking-widest">anand12@gmail.com</p>
          </div>
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-700 h-7 w-24 tracking-wider">Address:</h2>
            <p className="text-base text-gray-600 tracking-widest">Jaipur, Rajasthan</p>
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
              <img src={Edit} alt="Edit Icon" />
            </div>
          </div>
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-700 w-24 tracking-wider">Hospital:</h2>
            <p className="text-base text-gray-600 tracking-widest">Swaimann Hospital</p>
          </div>
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-700 w-42 tracking-wider">License Number:</h2>
            <p className="text-base text-gray-600 tracking-widest">ABC132FR</p>
          </div>
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-700 w-40 tracking-wider">License Expiry:</h2>
            <p className="text-base text-gray-600 tracking-widest">31st December 2090</p>
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
              <img src={Edit} alt="Edit Icon" />
            </div>
          </div>
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-700 w-20 tracking-wider">Twitter:</h2>
            <a href="https://x.com/?mx=2" target="_blank" rel="noopener noreferrer" className="text-base text-gray-600 hover:underline tracking-widest">
              www.Twitter.com
            </a>
          </div>
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-700 w-28 tracking-wider">Instagram:</h2>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-base text-gray-600 hover:underline tracking-widest">
              www.Instagram.com
            </a>
          </div>
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-700 w-28 tracking-wider">Facebook:</h2>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-base text-gray-600 hover:underline tracking-widest">
              www.Facebook.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
