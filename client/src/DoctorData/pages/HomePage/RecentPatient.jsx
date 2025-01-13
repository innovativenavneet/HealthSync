import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../FireBase/firebaseConfig"

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
        const checkAuthAndFetchPatients = async () => {
            setLoading(true);
            setError(null);

            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    // User is logged in, fetch API data
                    try {
                        const response = await fetch("https://jsonplaceholder.typicode.com/users");
                        if (!response.ok) {
                            throw new Error("Failed to load the patient list");
                        }
                        const data = await response.json();
                        const patientData = data.slice(0, 5).map((user, index) => ({
                            id: user.id,
                            name: user.name,
                            age: 20 + index * 5, // Mock age
                            complaint: "General Checkup", // Mock complaint
                        }));
                        setPatients(patientData);
                        setFilteredPatients(patientData);
                    } catch (err) {
                        console.error("Error fetching patient list", err);
                        setError("Could not fetch the data. Showing mock data.");
                        setPatients(mockData);
                        setFilteredPatients(mockData);
                    }
                } else {
                    // User is not logged in, show mock data
                    setPatients(mockData);
                    setFilteredPatients(mockData);
                }
                setLoading(false);
            });
        };

        checkAuthAndFetchPatients();
    }, []);

    const handleSearch = () => {
        const filtered = patients.filter((patient) =>
            patient.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPatients(filtered);
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
        <section className="absolute top-[165px] left-[738px] w-[612px] h-[430px] bg-white rounded-[12px] border border-gray-300 shadow-lg p-4 mr-5">
            {error && <p className="text-yellow-600 mb-4">{error}</p>}

            {/* Search Input, Search Button, and Filter Button */}
            <div className="flex items-center space-x-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by patient name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-md"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Search
                </button>
                <button
                    onClick={handleFilter}
                    className="bg-gray-300 text-black px-4 py-2 rounded-full"
                >
                    Filter
                </button>
            </div>

            {/* Patient List */}
            <div >
                {(showAll ? filteredPatients : filteredPatients.slice(0, 4)).map((patient) => (
                    <div
                        key={patient.id}
                        className="relative overflow-hidden w-[547px] h-[111px] bg-white rounded-[7px] border border-gray-300 mb-4 flex items-center"
                    >
                        <div
                            className="w-[44px] h-[44px] rounded-full bg-gray-200 flex-shrink-0   ml-4"
                        >
                            {/* Placeholder for patient avatar */}
                        </div>
                        <div className="ml-4  ">
                            <p className="text-lg font-semibold text-black">
                                {patient.name}
                            </p>
                            <p className="text-sm text-gray-800">
                                Age: {patient.age} | Complaint: {patient.complaint}
                            </p>
                        </div>
                        <div className="ml-auto mr-4 flex flex-col items-end">
                            <button
                                onClick={() => handleAddNote(patient)}
                                className="w-[74px] h-[20px] border border-gray-300 bg-blue-500 text-white rounded-[4px] mb-2 text-xs"
                            >
                                Add Note
                            </button>
                            <button
                                onClick={() => handleViewMore(patient)}
                                className="w-[74px] h-[20px] top-[411px] text-xs  border border-gray-300 bg-gray-200 text-black rounded-[4px]"
                            >
                                View More
                            </button>
                        </div>
                    </div>
                ))}

                {/* View More Button */}
                {filteredPatients.length > 4 && !showAll && (
                    <button
                        onClick={() => setShowAll(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 absolute left-[280px] "
                    >
                        View More
                    </button>
                )}
            </div>
        </section>
    );
};

export default RecentPatient;
