import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import app from "../../../../FireBase/firebaseConfig";
import { useUserAuth } from "../../../../context/UserAuthContext";
import TaskList from "./TaskList";
import AddTaskPopup from "./AddTaskPopup";
import TaskDetailPopup from "./TaskDetailPopup";

const TodaysTasks = () => {
  const { uid } = useUserAuth(); // Access uid from context
  const [tasks, setTasks] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch tasks from Firestore
  const fetchTasks = async () => {
    try {
      if (!uid) return; // Ensure UID is available
      const db = getFirestore(app);
      const tasksRef = collection(db, "Users", uid, "Tasks");
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

  // Add a new task to Firestore
  const addTask = async (heading, details) => {
    try {
      if (!uid) return; // Ensure UID is available
      const db = getFirestore(app);
      const taskRef = collection(db, "Users", uid, "Tasks");

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

  // Delete a task from Firestore
  const deleteTask = async (taskId) => {
    try {
      if (!uid || !taskId) return;
      const db = getFirestore(app);
      const taskDocRef = doc(db, "Users", uid, "Tasks", taskId); // Correct document reference

      await deleteDoc(taskDocRef); // Delete the task
      fetchTasks(); // Refresh tasks after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Fetch tasks when the component mounts or `uid` changes
  useEffect(() => {
    if (uid) {
      fetchTasks(); // Fetch tasks when UID is available
    }
  }, [uid]);

  return (
    <div className="relative bg-white overflow-auto p-4 rounded-[7px] shadow-lg w-[650px] h-[180px] mt-4 border border-gray-300 ml-4">
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

      {/* Task List */}
      <TaskList tasks={tasks} onShowDetails={setSelectedTask} onDelete={deleteTask} />

      {/* Add Task Popup */}
      {showAddPopup && (
        <AddTaskPopup
          onClose={() => setShowAddPopup(false)}
          onSave={addTask}
        />
      )}

      {/* Task Detail Popup */}
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
