import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import app from "../FireBase/firebaseConfig";
import { useUserAuth } from "../../context/UserAuthContext";
import TaskList from "./TaskList";
import AddTaskPopup from "./AddTaskPopup";
import TaskDetailPopup from "./TaskDetailPopup";

const TodaysTasks = () => {
  const { user, uid } = useUserAuth(); // Access user and uid from context
  const [tasks, setTasks] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    try {
      if (!uid) return; // Ensure UID is available
      const db = getFirestore(app);
      const tasksRef = collection(db, "users", uid, "Tasks");
      const querySnapshot = await getDocs(tasksRef);

      const fetchedTasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        heading: doc.data().Heading || "Untitled Task",
        details: doc.data().Details || "No details provided.",
        timestamp: doc.data().Timestamp?.toDate() || new Date(),
      }));

      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (heading, details) => {
    try {
      if (!uid) return; // Ensure UID is available
      const db = getFirestore(app);
      const taskRef = collection(db, "users", uid, "Tasks");

      await addDoc(taskRef, {
        Heading: heading,
        Details: details,
        Timestamp: new Date(),
      });

      fetchTasks(); // Refresh tasks after adding
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  useEffect(() => {
    if (uid) {
      fetchTasks(); // Fetch tasks when UID is available
    }
  }, [uid]);

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
            onClick={() => setShowAddPopup(true)}
          />
        </div>
      </header>

      <TaskList tasks={tasks} onShowDetails={setSelectedTask} />

      {showAddPopup && (
        <AddTaskPopup
          onClose={() => setShowAddPopup(false)}
          onSave={addTask}
        />
      )}

      {selectedTask && (
        <TaskDetailPopup
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default TodaysTasks;
