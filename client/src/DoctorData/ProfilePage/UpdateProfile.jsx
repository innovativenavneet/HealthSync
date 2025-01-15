import { useState, useEffect } from "react";
import { getFirestore, collection, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import app from "../../FireBase/firebaseConfig";
import Header from "../../components/common/Header";
import { useLocation, useNavigate } from "react-router-dom";


const UpdateProfile = () => {
    const location = useLocation();
    console.log("in update profile",location);
    const navigate = useNavigate();
    
  const [profileData, setProfileData] = useState({
    name: location.state.name,
    specialization: location.state.specialization,
    mobileNumber: location.state.mobileNumber,
    email: location.state.email,
    address: location.state.address,
    hospital: location.state.hospital,
    licenseNumber: location.state.licenseNumber,
    licenseExpiry: location.state.licenseExpiry,
    twitter: location.state.twitter,
    instagram: location.state.instagram,
    facebook: location.state.facebook,
  });

  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;



  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // Submit form to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user) {
      const profileRef = doc(db, "users", user.uid, "Profile", "Details");
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

      <form onSubmit={handleSubmit}>
        <div className="absolute top-28 left-2/4 h-11 w-44 mt-1">
          <h1 className="font-sans font-bold text-3xl leading-3">My Profile</h1>
        </div>

        {/* Doctor Image */}
        <div className="absolute top-36 left-40">
          <div className="flex items-center justify-center w-56 h-56 rounded-full overflow-hidden border border-gray-300 bg-blue-400">
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full h-full object-cover p-2"
            />
          </div>
        </div>

        {/* Personal Information */}
        <div className="absolute top-40 left-[477px] bg-white h-56 w-[720px] rounded-lg shadow-md border border-gray-300 p-1">
          <div className="space-y-2">
            <div className="flex items-center justify-between w-full">

            </div>
            <div className="flex items-center">
              <label className="text-lg font-semibold text-gray-700 h-7 w-20 tracking-wider">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className="text-base text-gray-600 tracking-widest border border-gray-300 p-1 rounded"
              />
            </div>
            <div className="flex items-center">
              <label className="text-lg font-semibold text-gray-700 h-7 w-36 tracking-wider">
                Specialization:
              </label>
              <input
                type="text"
                name="specialization"
                value={profileData.specialization}
                onChange={handleChange}
                className="text-base text-gray-600 tracking-widest border border-gray-300 p-1 rounded"
              />
            </div>
            <div className="flex items-center">
              <label className="text-lg font-semibold text-gray-700 h-7 w-40 tracking-wider">
                Mobile Number:
              </label>
              <input
                type="text"
                name="mobileNumber"
                value={profileData.mobileNumber}
                onChange={handleChange}
                className="text-base text-gray-600 tracking-widest border border-gray-300 p-1 rounded"
              />
            </div>
            <div className="flex items-center">
              <label className="text-lg font-semibold text-gray-700 h-7 w-16 tracking-wider">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                className="text-base text-gray-600 tracking-widest border border-gray-300 p-1 rounded"
              />
            </div>
            <div className="flex items-center">
              <label className="text-lg font-semibold text-gray-700 h-7 w-24 tracking-wider">
                Address:
              </label>
              <input
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleChange}
                className="text-base text-gray-600 tracking-widest border border-gray-300 p-1 rounded"
              />
            </div>
          </div>
        </div>

        {/* Professional Details */}
        <div className="absolute top-[400px] left-[100px] bg-white w-[500px] h-[180px] rounded-lg border border-gray-300 shadow-md space-y-3 p-4">
          <div className="flex items-center">
            <label className="text-lg font-semibold text-gray-700 w-24 tracking-wider">
              Hospital:
            </label>
            <input
              type="text"
              name="hospital"
              value={profileData.hospital}
              onChange={handleChange}
              className="text-base text-gray-600 tracking-widest border border-gray-300 p-1 rounded"
            />
          </div>
          <div className="flex items-center">
            <label className="text-lg font-semibold text-gray-700 w-42 tracking-wider">
              License Number:
            </label>
            <input
              type="text"
              name="licenseNumber"
              value={profileData.licenseNumber}
              onChange={handleChange}
              className="text-base text-gray-600 tracking-widest border border-gray-300 p-1 rounded"
            />
          </div>
          <div className="flex items-center">
            <label className="text-lg font-semibold text-gray-700 w-40 tracking-wider">
              License Expiry:
            </label>
            <input
              type="date"
              name="licenseExpiry"
              value={profileData.licenseExpiry}
              onChange={handleChange}
              className="text-base text-gray-600 tracking-widest border border-gray-300 p-1 rounded"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="absolute top-[400px] left-[700px] bg-white w-[500px] h-[180px] rounded-lg border border-gray-300 shadow-md p-4 space-y-3">
          <div className="flex items-center">
            <label className="text-lg font-semibold text-gray-700 w-20 tracking-wider">
              Twitter:
            </label>
            <input
              type="url"
              name="twitter"
              value={profileData.twitter}
              onChange={handleChange}
              className="text-base text-gray-600 tracking-widest border border-gray-300 p-1 rounded"
            />
          </div>
          <div className="flex items-center">
            <label className="text-lg font-semibold text-gray-700 w-28 tracking-wider">
              Instagram:
            </label>
            <input
              type="url"
              name="instagram"
              value={profileData.instagram}
              onChange={handleChange}
              className="text-base text-gray-600 tracking-widest border border-gray-300 p-1 rounded"
            />
          </div>
          <div className="flex items-center">
            <label className="text-lg font-semibold text-gray-700 w-28 tracking-wider">
              Facebook:
            </label>
            <input
              type="url"
              name="facebook"
              value={profileData.facebook}
              onChange={handleChange}
              className="text-base text-gray-600 tracking-widest border border-gray-300 p-1 rounded"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="absolute top-[600px] left-[50%] transform -translate-x-1/2">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
