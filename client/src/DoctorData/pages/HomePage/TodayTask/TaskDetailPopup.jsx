const TaskDetailPopup = ({ task, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-[400px]">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">{task.heading}</h3>
          <p className="text-gray-700 mb-4">{task.details}</p>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default TaskDetailPopup;
  