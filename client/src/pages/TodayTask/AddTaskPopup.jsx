import { useState } from "react";

const AddTaskPopup = ({ onClose, onSave }) => {
  const [heading, setHeading] = useState("");
  const [details, setDetails] = useState("");

  const handleSave = () => {
    if (heading.trim() && details.trim()) {
      onSave(heading, details);
      setHeading("");
      setDetails("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[var(--light-blue)] p-6 rounded shadow-lg w-[400px]">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Add a Task</h3>
        <input
          type="text"
          className="w-full p-2 mb-2 border rounded text-gray-700"
          placeholder="Task Heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded h-[100px] text-gray-700"
          placeholder="Task Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></textarea>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSave}
          >
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskPopup;
