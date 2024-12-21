// AddNote.js
import React, { useState } from "react";

const AddNote = ({ onSave }) => {
  const [note, setNote] = useState("");

  const handleInputChange = (e) => {
    setNote(e.target.value);
  };

  const handleSave = () => {
    if (note.trim() !== "") {
      onSave(note); // Pass the note back to the parent via onSave
      setNote(""); // Clear the input field
    } else {
      alert("Note cannot be empty!");
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[400px] p-4 border rounded-md shadow-lg bg-white">
      <h3 className="text-lg font-bold mb-2 text-gray-800">Add a Note</h3>
      <textarea
        value={note}
        onChange={handleInputChange}
        placeholder="Write your note here..."
        className="w-full h-[100px] border rounded-md p-2 text-gray-800 mb-2"
      />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Save Note
      </button>
    </div>
  );
};

export default AddNote;
