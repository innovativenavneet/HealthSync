import { useNavigate } from "react-router-dom";
import { Button, Card, Typography } from "@mui/material";
import { motion } from "framer-motion";

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
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-purple-700 to-gray-900 p-6">
      <Typography variant="h3" className="text-white font-bold mb-8 drop-shadow-lg" component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        Choose Your Role
      </Typography>
      <Card className="p-10 rounded-2xl shadow-2xl bg-white flex flex-col sm:flex-row gap-6" component={motion.div} initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePatient}
          className="h-56 w-60 text-lg font-bold rounded-xl shadow-lg"
          component={motion.button}
          whileHover={{ scale: 1.05 }}
        >
          Login as Patient
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleDoctor}
          className="h-56 w-60 text-lg font-bold rounded-xl shadow-lg"
          component={motion.button}
          whileHover={{ scale: 1.05 }}
        >
          Login as Doctor
        </Button>
      </Card>
    </div>
  );
};

export default Roles;
