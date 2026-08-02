
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import SearchBar from './Searchbar';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status when the component loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const tokenExp = decoded.exp;
        const currentTime = Date.now() / 1000;

        // Check if token is expired
        if (tokenExp < currentTime) {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        } else {
          // Token is valid
          setIsLoggedIn(true);
        }
      } catch (error) {
        // Token is invalid/malformed
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        console.error('Invalid token:', error);
      }
    }
  }, []); // Empty array means this runs once on page load

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
    window.location.reload(); // Force a full refresh
  };

  return (
    <div className=" flex justify-between shadow:lg space-x-4 p-1 bg-slate-950/80">
      
     <h1 className="text-3xl p-3 text-blue-700 hover:opacity-80 transition-opacity">
         <span className="font-extrabold ">Binge</span>
         <span>Judge</span>
     </h1>
     
     <div className='space-x-5 pt-2 w-full max-w-md'>
      <SearchBar/>
      </div>


     <div className='flex items-center space-x-5 text-white'>
      <div>
        <Link to="/about" className=" p-2">About</Link>
      </div>

      {isLoggedIn ? (
        // --- Show this if user IS logged in ---
        <div>
          <button
            className="focus:shadow-outline w-full rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-600 focus:outline-none"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        // --- Show this if user IS NOT logged in ---
        <>
          <div>
            <Link
              className="focus:shadow-outline w-full rounded bg-teal-500 py-2 px-4 font-bold text-white hover:bg-teal-600 focus:outline-none"
              to="/signin"
            >
              SignIn
            </Link>
          </div>
          <div>
            <Link
              className="focus:shadow-outline w-full rounded bg-violet-600 py-2 px-4 font-bold text-white hover:bg-violet-700 focus:outline-none"
              to="/login"
            >
              Login
            </Link>
          </div>
        </>
      )}
    </div>
    </div>
  );
}