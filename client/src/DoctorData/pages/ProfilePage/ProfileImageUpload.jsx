import { useState } from "react";
import axios from "axios";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import app from "../../../FireBase/firebaseConfig";

const ProfileImageUpload = ({ profileData, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary upload preset

    try {
      // Upload image to Cloudinary
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`,
        formData
      );

      const imageUrl = res.data.secure_url;

      // Store image URL in Firestore
      const db = getFirestore(app);
      const auth = getAuth(app);
      const user = auth.currentUser;

      if (!user) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }

      // Determine profile path based on user role
      const profilePath = profileData.role === "DOCTOR" 
        ? doc(db, "Users", user.uid, "Doctor Profile", "Details") 
        : doc(db, "Users", user.uid, "Profile", "Details");

      await updateDoc(profilePath, { profileImage: imageUrl });

      // Update parent component with new image URL
      onUpdate(imageUrl);

      setLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Upload failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {loading && <p>Uploading...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ProfileImageUpload;
