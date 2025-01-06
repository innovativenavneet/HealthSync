const TaskItem = ({ task, onShowDetails }) => {
    return (
      <div
        className="flex flex-col justify-start items-start p-2 mb-2 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-[7px] border border-gray-300"
      >
        <div className="flex justify-between items-center w-full">
          <span className="font-medium text-gray-800">{task.heading}</span>
          <button
            className="text-blue-500 text-sm underline"
            onClick={onShowDetails}
          >
            Show More
          </button>
        </div>
      </div>
    );
  };
  
  export default TaskItem;
  