import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../FireBase/firebaseConfig";
import PatientCard from "./PatientCard";
import SearchAndFilter from "./SearchAndFilter";

const mockData = [
  { id: 1, name: "John Doe", age: 30, complaint: "Fever and Cough" },
  { id: 2, name: "Jane Smith", age: 25, complaint: "Headache" },
  { id: 3, name: "Alice Johnson", age: 40, complaint: "Back Pain" },
  { id: 4, name: "Michael Brown", age: 50, complaint: "Diabetes" },
  { id: 5, name: "Emily Davis", age: 35, complaint: "Hypertension" },
];

const RecentPatient = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      setError(null);
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            if (!response.ok) throw new Error("Failed to load the patient list");

            const data = await response.json();
            const patientData = data.slice(0, 5).map((user, index) => ({
              id: user.id,
              name: user.name,
              age: 20 + index * 5,
              complaint: "General Checkup",
            }));
            setPatients(patientData);
            setFilteredPatients(patientData);
          } catch (err) {
            setError("Could not fetch the data. Showing mock data.");
            setPatients(mockData);
            setFilteredPatients(mockData);
          }
        } else {
          setPatients(mockData);
          setFilteredPatients(mockData);
        }
        setLoading(false);
      });
    };
    fetchPatients();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredPatients(patients); // Reset to full list when input is cleared
    } else {
      const filtered = patients.filter((patient) =>
        patient.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPatients(filtered);
    }
  };

  const handleFilter = () => {
    alert("Filter functionality not implemented yet.");
  };

  const handleAddNote = (patient) => {
    alert(`Add note for ${patient.name}`);
  };

  const handleViewMore = (patient) => {
    alert(`View more details for ${patient.name}`);
  };

  if (loading) {
    return <p>Loading patients...</p>;
  }

  return (
    <section className="absolute top-[165px] left-[738px] w-[612px] h-[420px] bg-white rounded-[12px] border border-gray-300 shadow-lg p-4 overflow-auto ">
      {error && <p className="text-yellow-600 mb-4">{error}</p>}
      <SearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        onFilter={handleFilter}
      />
      <div>
        {(showAll ? filteredPatients : filteredPatients.slice(0, 4)).map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onAddNote={handleAddNote}
            onViewMore={handleViewMore}
          />
        ))}
        {filteredPatients.length > 4 && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 absolute left-[280px]"
          >
            View More
          </button>
        )}
      </div>
    </section>
  );
};

export default RecentPatient;
