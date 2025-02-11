import React from "react";
import TableRow from "./TableRow";

const Table = ({ patients }) => {
  return (
    <table className="w-full border-collapse bg-white rounded-md shadow-md">
      <thead className="bg-gray-100 border-b">
        <tr>
          <th className="p-2">S No.</th>
          <th className="p-2">Name</th>
          <th className="p-2">Age</th>
          <th className="p-2">Last Visited</th>
          <th className="p-2">Status</th>
          <th className="p-2">Contact</th>
          <th className="p-2">History</th>
          <th className="p-2">Next Appointment</th>
          <th className="p-2">Action</th>
          <th className="p-2">Session</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient, index) => (
          <TableRow key={patient.id} patient={patient} index={index + 1} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
