import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const TodaysTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [showNotePopup, setShowNotePopup] = useState(false);
  const [noteText, setNoteText] = useState("");

  // Generic function to save notes
  const saveNoteToServer = async (taskId, note) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note }),
      });
      if (!response.ok) throw new Error("Failed to save note on server");
      return true;
    } catch (error) {
      console.error("Error saving note to server:", error);
      return false;
    }
  };

  // Add note handler
  const handleSaveNote = async () => {
    if (noteText.trim() === "") return;

    const noteSaved = selectedTaskId
      ? await saveNoteToServer(selectedTaskId, noteText)
      : false;

    // Save locally if server fails or no task ID
    if (!noteSaved || !selectedTaskId) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === selectedTaskId
            ? { ...task, notes: [...task.notes, noteText] }
            : task
        )
      );
    }

    // Reset state
    setNoteText("");
    setShowNotePopup(false);
  };


  return (
    <div className="relative bg-white p-4 rounded-[7px] shadow-lg w-[686px] h-[250px] mt-4 border border-gray-300 left-[30px]">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-blue-900">Today's Tasks</h2>
        <div className="flex items-center space-x-2">
          <span className="bg-blue-100 text-blue-900 px-2 py-1 rounded-full text-sm font-medium">
            {tasks.length}
          </span>
          <AiOutlinePlus
            className="text-blue-900 cursor-pointer"
            size={30}
            onClick={() => setShowNotePopup(true)} // Open popup to add generic note
          />
        </div>
      </header>

      <div className="overflow-y-auto h-[200px]">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col justify-start items-start p-2 mb-2 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-[7px] border border-gray-300"
            >
              <div className="flex justify-between items-center w-full">
                <span className="font-medium text-blue-800">{task.title}</span>
                <AiOutlinePlus
                  className="text-blue-500 cursor-pointer"
                  size={16}
                  onClick={() => {
                    setSelectedTaskId(task.id);
                    setShowNotePopup(true);
                  }}
                />
              </div>
              {task.notes.length > 0 && (
                <ul className="text-sm text-gray-700 mt-2">
                  {task.notes.map((note, index) => (
                    <li key={index} className="list-disc ml-4">
                      {note}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No tasks available for today.</p>
        )}
      </div>

      {/* Add Note Popup */}
      {showNotePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Add a Note</h3>
            <textarea
              className="w-full p-2 border rounded h-[100px] text-gray-700"
              placeholder="Write your note here..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setShowNotePopup(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleSaveNote}
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodaysTasks;
