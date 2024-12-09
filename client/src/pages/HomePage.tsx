import React, { useEffect, useState } from "react";
import Header from "../components/common/Header"; // Assuming Header is a common component

// Define interfaces for Task and Patient data
interface Task {
  id: number;
  title: string;
  time: string;
}

interface Patient {
  id: number;
  name: string;
  age: number;
  primaryComplaint: string;
}

const HomePage: React.FC = () => {
  // State to store tasks and recent patients
  const [tasks, setTasks] = useState<Task[]>([]);
  const [recentPatients, setRecentPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch data from an API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock API for tasks
        const tasksResponse = await fetch("https://jsonplaceholder.typicode.com/todos");
        const tasksData = await tasksResponse.json();
        setTasks(
          tasksData.map((task: any) => ({
            id: task.id,
            title: task.title,
            time: `${Math.floor(Math.random() * 12) + 1}:00 ${
              Math.random() > 0.5 ? "AM" : "PM"
            }`,
          }))
        );

        // Mock API for recent patients
        const patientsResponse = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const patientsData = await patientsResponse.json();
        setRecentPatients(patientsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter patients based on search query
  const filteredPatients = recentPatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header /> {/* Common header component */}
      <div className="min-h-screen bg-[var(--light-blue)] p-8">
        <div className="container mx-auto flex space-x-8">
          {/* Upcoming Consultations Section */}
          <section className="mb-8 bg-white p-4 rounded shadow-lg h-[333px] w-[686px]">
            <h2 className="text-2xl font-semibold text-blue-900">
              Upcoming Consultations
            </h2>
            <div className="h-36 flex items-center justify-center">
              <p className="text-gray-500">No upcoming consultations.</p>
            </div>
          </section>

          {/* Recent Patients Section */}
          <section className="relative mb-8 w-[612px]">
            <div className="bg-white p-4 mt-4 rounded shadow-lg h-[400px] overflow-auto">
              {/* Search bar */}
              <div className="flex items-center space-x-4 mb-4">
                <input
                  type="text"
                  placeholder="Search for Recent Patient"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-md"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Search
                </button>
              </div>

              {/* Patient List */}
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between py-3 border-b last:border-none"
                  >
                    {/* Avatar */}
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-200 flex-shrink-0">
                        {/* Placeholder for patient avatar */}
                      </div>
                      <div className="ml-4">
                        <div className="text-lg font-semibold text-blue-800">
                          {patient.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          Age: {patient.age} | Primary Complaint:{" "}
                          {patient.primaryComplaint}
                        </div>
                      </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex  space-x-2 ">
                      <button className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Add Note
                      </button>
                      <button className="bg-blue-500 text-white px-2 py-1 rounded">
                        View More
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No recent patients found.</p>
              )}
              {/* Show All Button */}
              <button className="w-full mt-4 text-center bg-blue-500 text-white py-2 rounded">
                Show All
              </button>
            </div>
          </section>
        </div>

        {/* Today's Tasks Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-900">Today's Tasks</h2>
          <div className="bg-white p-4 mt-4 rounded shadow-lg max-h-[300px] overflow-y-auto h-[311px] w-[686px]">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex justify-between items-center py-2 border-b last:border-none"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded">
                      📅 {/* Placeholder for task icon */}
                    </div>
                    <div className="text-lg text-blue-800">{task.title}</div>
                  </div>
                  <div className="text-gray-500">{task.time}</div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Loading tasks...</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
