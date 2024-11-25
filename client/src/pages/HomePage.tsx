import React, { useState } from "react";
import Header from "../components/common/Header";

interface Task {
  title: string;
  time: string;
}

interface Patient {
  name: string;
  age: number;
  primaryComplaint: string;
}

const HomePage: React.FC = () => {

const Patientname = useState("Jon Doe");
  const tasks: Task[] = [
    { title: 'Online Consultation with Mr. Mill', time: '11 AM' },
    { title: 'Medication Review for Ms. Camila', time: '12:30 PM' },
    { title: 'Reviewing Test Results of Ms. Jane', time: '1:50 PM' },
  ];

  const recentPatients: Patient[] = [
    { name: 'Ms. Olivia Williams', age: 32, primaryComplaint: 'Fever, Cough' },
    { name: 'Ms. Olivia Williams', age: 32, primaryComplaint: 'Fever, Cough' },
    { name: 'Ms. Olivia Williams', age: 32, primaryComplaint: 'Fever, Cough' },
    { name: 'Ms. Olivia Williams', age: 32, primaryComplaint: 'Fever, Cough' },
  ];

  return (
    <>
      <Header/>
    <div className="min-h-screen bg-[var(--light-blue)] p-8">
      {/* Main Content */}
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-blue-900">Good Morning, Dr. (Patientname)</h1>
          </div>
        </div>

        {/* Upcoming Consultations */}
        <section className="mb-12 bg-white p-4 mt-4 rounded shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-900">Upcoming Consultations</h2>
          
        </section>

        {/* Today's Tasks */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-900">Today's Tasks</h2>
          <div className="bg-white p-4 mt-4 rounded shadow-lg">
            {tasks.map((task, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-none">
                <div className="text-lg text-blue-800">{task.title}</div>
                <div className="text-gray-500">{task.time}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Patients */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-900">Recent Patients</h2>
          <div className="bg-white p-4 mt-4 rounded shadow-lg">
            {recentPatients.map((patient, index) => (
              <div key={index} className="flex items-center py-3 border-b last:border-none">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4">
                  {/* Patient avatar (can be an image) */}
                </div>
                <div>
                  <div className="text-lg text-blue-800">{patient.name}</div>
                  <div className="text-sm text-gray-600">Age: {patient.age} | Primary Complaint: {patient.primaryComplaint}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
    
    </>
  
  );
};

export default HomePage;

