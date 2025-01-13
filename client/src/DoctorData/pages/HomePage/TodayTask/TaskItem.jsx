import Button from "../../../../components/Button";
const TaskItem = ({ task, onShowDetails, onDelete }) => {
  return (
    <div
      className="h-10 flex flex-col justify-start items-start p-1 mb-2 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-[7px] border border-gray-300"
    >
      <div className="flex justify-between items-center w-full ">
        <span className="font-medium text-gray-950 ">{task.heading}</span>
        <div className="flex gap-2">
          <Button
          variant="primary"
          size="small"

            // className="text-blue-500 text-sm underline"
            onClick={onShowDetails}
          >
            Show More
          </Button>
          <Button
          variant="danger"
          size="small"
            // className="text-red-500 text-sm underline"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
