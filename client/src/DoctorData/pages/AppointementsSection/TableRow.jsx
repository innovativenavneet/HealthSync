import React from "react";

const TableRow = ({ patient, index }) => {
  return (
    <tr className="border-t">
      <td className="p-2">{index}</td>
      <td className="p-2">{patient.patientName}</td>
      <td className="p-2">{patient.age}</td>
      <td className="p-2">{patient.lastVisited}</td>
      <td className="p-2">
        <select className="border border-gray-300 rounded-md px-2 py-1" defaultValue={patient.status}>
          <option>Select Status</option>
          <option>Follow-up</option>
          <option>Completed</option>
        </select>
      </td>
      <td className="p-2">{patient.contact}</td>
      <td className="p-2">{patient.history}</td>
      <td className="p-2">{patient.nextAppointment}</td>
      <td className="p-2">
        <button className="bg-blue-500 text-white px-4 py-1 rounded-md">View</button>
      </td>
      <td className="p-2">
        <button className="bg-green-500 text-white px-4 py-1 rounded-md">Start</button>
      </td>
    </tr>
  );
};

export default TableRow;
