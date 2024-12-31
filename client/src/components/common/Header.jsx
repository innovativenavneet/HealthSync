import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png"; // Ensure the path is correct
import { useUserAuth } from "../../context/UserAuthContext"; // Import the context hook

const Header = () => {
  const { user, logOut } = useUserAuth(); // Access the user and logOut function

  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut(); // Call the logout function
      console.log("User successfully logged out"); // Optional success message
      navigate("/"); // Redirect to the login page
    } catch (error) {
      console.error("Error during logout:", error.message); // Provide a more descriptive error message
    }
  };
  
  return (
    <header className="bg-[var(--light-blue)] shadow-md mx-auto p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center ml-7">
        <img src={logo} alt="Logo" className="h-12 w-auto mr-2 ml-4" />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-[var(--blue)] shadow-md w-[71.5%] rounded-lg justify-center items-center mx-auto">
        <ul className="flex space-x-20 text-white font-semibold px-4 py-2">
          <li className="hover:underline transition-colors underline-offset-4">
            <Link to={"/home"}>HOME</Link>
          </li>
          <li className="hover:underline transition-colors underline-offset-4">
            <Link to={"/appointments"}>APPOINTMENTS</Link>
          </li>
          <li className="hover:underline transition-colors underline-offset-4">
            <Link to={"/dashboard"}>DASHBOARD</Link>
          </li>
          <li className="hover:underline transition-colors underline-offset-4">
            <Link to={"/profile"}>PROFILE</Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Navigation */}
      <button className="block md:hidden text-black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Auth Buttons */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Sign Up Button
        <Link to="/signup">
          <button className="text-black font-bold rounded-full px-4 py-2 hover:bg-gray-200 transition-colors">
            SIGN UP
          </button>
        </Link> */}

        {/* Log In Button */}
        {user ? (
  <button 
    onClick={handleLogOut} // Correct function name
    className="bg-[var(--blue)] border border-white text-white px-4 py-2 rounded-[10px] font-bold hover:bg-[#174a77] transition-colors"
  >
    Logout
  </button>
) : (
  // Sign Up and Log In Buttons
  <div className="flex space-x-4">
    <Link to="/signup">
      <button className="text-black font-bold rounded-full px-4 py-2 hover:bg-gray-200 transition-colors">
        SIGN UP
      </button>
    </Link>
    <Link to="/login">
      <button className="bg-[var(--blue)] border border-white text-white px-4 py-2 rounded-[10px] font-bold hover:bg-[#174a77] transition-colors">
        LOG IN
      </button>
    </Link>
  </div>
)}

      </div>
    </header>
  );
};

export default Header;

