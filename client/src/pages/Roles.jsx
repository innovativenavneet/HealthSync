import { useNavigate } from "react-router-dom";

const Roles = () => {
  const navigate = useNavigate();

  function handlePatient() {
    navigate("/login?role=PATIENT");
    console.log("Going for patient");
  }

  function handleDoctor() {
    navigate("/login?role=DOCTOR");
    console.log("Going for doctor");
  }

  return (
    <div className="flex flex-col justify-center items-center bg-gray-700 h-[100vh]">
      <h1 className="text-3xl font-bold text-white mb-6">Choose Your Role</h1>
      <div className="flex justify-between bg-slate-500 p-8 rounded-lg shadow-lg">
        <button
          onClick={handlePatient}
          className="h-52 w-56 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login as Patient
        </button>
        <button
          onClick={handleDoctor}
          className="h-52 w-56 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-300"
        >
          Login as Doctor
        </button>
      </div>
    </div>
  );
};

export default Roles;
