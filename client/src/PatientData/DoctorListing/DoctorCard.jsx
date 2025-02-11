import React from "react";

const DoctorCard = ({ doctor, onBookAppointment }) => {
  return (
    <div className="border border-gray-300 shadow-md rounded-md p-4 m-4 w-64">
      <h2 className="text-lg font-semibold">{doctor.name}</h2>
      <p className="text-sm text-gray-700">Specialization: {doctor.specialization}</p>
      <p className="text-sm text-gray-700">Hospital: {doctor.hospital}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => onBookAppointment(doctor)} // Trigger booking with selected doctor
      >
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorCard;
