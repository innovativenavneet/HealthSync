import React, { useState } from "react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import axios from "axios";
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
    profileImage: initialState.profileImage || "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const uploadImageToCloudinary = async () => {
    if (!selectedImage) return alert("Please select an image first!");

    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", "healthsync_preset"); // Use your actual preset
    formData.append("cloud_name", "dfr9rujtd"); // Use your actual Cloudinary cloud name

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dfr9rujtd/image/upload`, // Correct Cloudinary API URL
        formData
      );

      const imageUrl = res.data.secure_url;
      console.log("Image uploaded:", imageUrl);

      setProfileData((prev) => ({ ...prev, profileImage: imageUrl }));
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user) {
      const profileRef = doc(
        db,
        "Users",
        user.uid,
        profileData.specialization ? "Doctor Profile" : "Profile",
        "Details"
      );

      try {
        await setDoc(profileRef, profileData, { merge: true });
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
    <div className="relative bg-gray-100 min-h-screen p-6">
      <Header />
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Image Upload Section */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 border rounded-full overflow-hidden bg-gray-200">
              {profileData.profileImage ? (
                <img
                  src={profileData.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-gray-500 text-center p-4">No Image</p>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-4"
            />

            <button
              type="button"
              onClick={uploadImageToCloudinary}
              className="mt-2 bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
          </div>

          {/* Profile Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(profileData).map(([field, value]) =>
              field !== "profileImage" ? (
                <div key={field} className="flex flex-col">
                  <label className="text-gray-700 font-semibold">
                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                  </label>
                  <input
                    name={field}
                    value={value}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder={`Enter your ${field}`}
                  />
                </div>
              ) : null
            )}
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-500 p-3 rounded text-white w-full hover:bg-blue-600 transition duration-300"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
