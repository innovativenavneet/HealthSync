import { Link } from 'react-router-dom'; 
import { useState } from 'react';
import logo from '/src/assets/images/logo.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // State to handle menu toggle

  return (
    <header className="bg-[var(--light-blue)] shadow-md mx-auto p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center ml-7">
        <img
          src={logo}
          alt="Logo"
          className="h-12 w-30 mr-2 ml-4"
        />
      </div>

      {/* Desktop Navigation */}
      <nav className="bg-[var(--blue)] shadow-md w-[40%] rounded-lg container mr-40 ml-52 p-4 justify-center items-center hidden md:flex"> {/* Hidden on mobile (md:hidden) */}
        {/* Navigation Links */}
        <ul className="flex space-x-10 text-white font-semibold">
          <li>
            <Link to="/" className="relative hover:underline transition-colors underline-offset-4">
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="relative hover:underline transition-colors underline-offset-4">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/appointments" className="relative hover:underline transition-colors underline-offset-4">
              Appointments
            </Link>
          </li>
          <li>
            <Link to="/profile" className="relative hover:underline transition-colors underline-offset-4">
              Profiles
            </Link>
          </li>
        </ul>
      </nav>

      {/* SignUp Button */}
      <Link to="/SignUp" className="hidden md:inline-block"> {/* Hidden on mobile */}
        <button className="ml-40 mr-auto text-black font-bold rounded-full">
          Sign Up
        </button>
      </Link>

      {/* Log In Button */}
      <Link to="/login" className="hidden md:inline-block"> {/* Hidden on mobile */}
        <button className="ml-3 mr-10 bg-[var(--blue)] border font-bold border-white text-white px-4 py-2 rounded-[10px] hover:bg-[#174a77] transition-colors">
          Log In
        </button>
      </Link>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-[var(--blue)] focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[var(--light-blue)] shadow-md md:hidden"> {/* Visible only on mobile */}
          <ul className="flex flex-col items-center space-y-4 p-4 text-[var(--blue)] font-semibold">
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)} className="block">
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/appointments" onClick={() => setMenuOpen(false)} className="block">
                Appointments
              </Link>
            </li>
            <li>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="block">
                Profiles
              </Link>
            </li>
            <li>
              <Link to="/SignUp" onClick={() => setMenuOpen(false)} className="block">
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block">
                Log In
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
