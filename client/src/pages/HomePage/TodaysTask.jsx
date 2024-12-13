import { useState, useEffect } from "react";

const TodaysTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Mock data as fallback
  const mockTasks = [
    { id: 1, title: "Follow-up with Patient A", description: "Discuss medication adjustments." },
    { id: 2, title: "Review Lab Results", description: "Analyze test results from yesterday." },
    { id: 3, title: "Team Meeting", description: "Discuss new protocols and case studies." },
  ];

  // Fetch tasks from API or use mock data
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=3");
        const data = await response.json();
        setTasks(data.map((task) => ({
          id: task.id,
          title: task.title,
          description: "No additional details available.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Add time here
        })));
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks(mockTasks.map((task) => ({
          ...task,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Add time to mock tasks
        })));
      }
    };

    fetchTasks();
  }, []);

  // Handle task click to show popup
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowPopup(true);
  };

  // Close the popup
  const closePopup = () => {
    setShowPopup(false);
    setSelectedTask(null);
  };

  // Handle View More button click to navigate to the appointment page
  const handleViewMoreClick = () => {
    window.location.href = "/appointments";  // Redirect to the appointments page
  };

  return (
    <div className="relative bg-white p-4 rounded-[7px] shadow-lg w-[686px] h-[311px] mt-4 border border-gray-300 left-[30px]">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-blue-900 h-[30px] w-[163px]">Today's Tasks</h2>
        <span className="bg-blue-100 text-blue-900 px-2 py-1 rounded-full text-sm font-medium h-[26px] w-[59px]">
          {tasks.length}
        </span>
      </header>

      <div className="overflow-y-auto h-[240px]">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col justify-start items-start p-2 mb-2 bg-gray-100 hover:bg-gray-200 cursor-pointer w-[638px] h-[58px] top-[62px] left-[28px] rounded-[7px] border border-gray-300"
              onClick={() => handleTaskClick(task)}
            >
              <div className="flex justify-between items-center w-full">
                <span className="font-medium text-blue-800">{task.title}</span>
                <button className="bg-blue-500 text-white px-2 py-1 rounded text-sm">View</button>
              </div>
              <span className="text-gray-500 text-xs">{task.time}</span> {/* Display time below task */}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No tasks available for today.</p>
        )}
      </div>

      {/* Popup for task details */}
      {showPopup && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">{selectedTask.title}</h3>
            <p className="text-gray-700 mb-4">{selectedTask.description}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* View More Button */}
      <button
        className="absolute bottom-[30px] right-[44px] w-[79px] h-[26px] left-[575px] top-[268px] bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
        onClick={handleViewMoreClick}
      >
        View More
      </button>
    </div>
  );
};

export default TodaysTasks;
