import React, { useEffect, useState } from "react";
import Header from "../../../components/common/Header";
import SearchBar from "./SearchBar";
import Table from "./Table";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../../FireBase/firebaseConfig"; // Adjust Firebase import paths
import { useUserAuth } from "../../../context/UserAuthContext";

const Appointments = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const { uid } = useUserAuth();

  // Fetch patients associated with the logged-in doctor
  const fetchPatients = async () => {
    try {
      if (!uid) {
        throw new Error("Doctor is not logged in.");
      }

      const appointmentsRef = collection(db, "Users", uid, "Appointments");
      console.log("appointmentsref",appointmentsRef);

      const querySnapshot = await getDocs(appointmentsRef);
      const patientsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("patient data",patientsData);


      setPatients(patientsData);
      console.log("patient ",patients);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  if (loading) {
    return <p>Loading patient data...</p>;
  }

  return (
    <div className="bg-blue-50 min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-xl font-bold mb-4">PATIENT LIST</h2>
        <SearchBar />
        <div className="mt-4">
          <Table patients={patients} />
        </div>
      </div>
    </div>
  );
};

export default Appointments;
