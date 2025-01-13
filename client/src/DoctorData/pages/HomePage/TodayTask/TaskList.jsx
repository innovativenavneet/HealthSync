import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onShowDetails, onDelete }) => {
  return (
    <div className="overflow-y-auto h-[200px]">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onShowDetails={() => onShowDetails(task)}
            onDelete={() => onDelete(task.id)} // Pass the delete handler with the task ID
          />
        ))
      ) : (
        <p className="text-gray-500 text-center">No tasks available for today.</p>
      )}
    </div>
  );
};

export default TaskList;
