import React, { useEffect, useState } from "react";
import PatientHeader from "../PatientHeader";
import DoctorCard from "./DoctorCard"; // Import the DoctorCard component
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../FireBase/firebaseConfig"; // Adjust the path to your Firebase config file
import AppointmentForm from "../AppointmentForm"; // Import the AppointmentForm component

const DoctorList = () => {
  const [profiles, setProfiles] = useState([]); // Stores doctor profiles
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Tracks the currently selected doctor for booking

  // Fetch the doctor profiles from Firestore
  const fetchDoctorProfiles = async () => {
    try {
      const usersRef = collection(db, "Users"); // Reference to Users collection
      const usersSnapshot = await getDocs(usersRef); // Fetch all user documents

      // Fetch doctor profiles from Firestore subcollections
      const doctorProfilesData = await Promise.all(
        usersSnapshot.docs.map(async (userDoc) => {
          const doctorProfileRef = doc(db, "Users", userDoc.id, "Doctor Profile", "Details");
          const doctorProfileSnapshot = await getDoc(doctorProfileRef);

          if (doctorProfileSnapshot.exists()) {
            return { id: userDoc.id, ...doctorProfileSnapshot.data() };
          } else {
            console.log(`No Doctor Profile found for user: ${userDoc.id}`);
            return null;
          }
        })
      );

      setProfiles(doctorProfilesData.filter((profile) => profile !== null)); // Filter out null profiles
    } catch (error) {
      console.error("Error fetching doctor profiles:", error);
    } finally {
      setLoading(false); // Stop the loading state
    }
  };

  // Handler for booking an appointment
  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor); // Set the selected doctor for booking
  };

  // Close the appointment form
  const handleCancelBooking = () => {
    setSelectedDoctor(null); // Reset the selected doctor
  };

  // Fetch doctor profiles on component mount
  useEffect(() => {
    fetchDoctorProfiles();
  }, []);

  if (loading) {
    return <p>Loading doctor profiles...</p>; // Show loading message
  }

  return (
    <div>
      <PatientHeader />
      <h1 className="text-center text-2xl font-bold mt-4">Doctor List</h1>
      <div className="flex flex-wrap justify-center">
        {profiles.length === 0 ? (
          <p>No doctor profiles found.</p> // Show if no profiles are available
        ) : (
          profiles.map((profile) => (
            <DoctorCard
              key={profile.id}
              doctor={profile}
              onBookAppointment={handleBookAppointment} // Pass booking handler to DoctorCard
            />
          ))
        )}
      </div>

      {/* Render the AppointmentForm if a doctor is selected */}
      {selectedDoctor && (
        <AppointmentForm
          doctor={selectedDoctor}
          onCancel={handleCancelBooking} // Pass cancel handler
        />
      )}
    </div>
  );
};

export default DoctorList;
