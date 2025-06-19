import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { search, searchByLocation } from "../Apiservice/allApi";

const Navbar = ({ setSearchResult }) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Toggle language dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Check login status on mount and storage update
  useEffect(() => {
    const checkLoginStatus = () => {
      const userData = JSON.parse(localStorage.getItem("userCredential"));
      const token = localStorage.getItem("token") || userData?.token;
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".dropdown")) setIsOpen(false);
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  // Handle title/category/subcategory search
  const handleSearchChange = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim() === '') {
      setSearchResult([]);
      return;
    }

    try {
      const data = await search(searchQuery);
      setSearchResult(data.data.items);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResult([]);
    }
  };

  // Handle location search
  const handleLocationChange = async (e) => {
    const loc = e.target.value;
    setLocation(loc);

    if (loc.trim() === '') {
      setSearchResult([]);
      return;
    }

    try {
      const data = await searchByLocation(loc);
      setSearchResult(data.data.items);
    } catch (error) {
      console.error('Error fetching location results:', error);
      setSearchResult([]);
    }
  };

  // Logout clears both token and userCredential
  const handleLogout = () => {
    localStorage.removeItem('userCredential');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 bg-white text-black p-2 shadow-md z-50 border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between gap-4 flex-wrap">

        {/* Left Section - Logo & Location */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center">
            <img src="olx.jpg" className="w-11 h-11" alt="OLX" />
          </Link>

          {/* Location Search */}
          <div className="hidden md:flex items-center border border-gray-300 rounded-lg overflow-hidden px-3 py-1 bg-gray-50 hover:border-blue-500 transition-colors">
            <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={handleLocationChange}
              className="px-2 py-1 focus:outline-none bg-transparent w-32"
            />
          </div>
        </div>

        {/* Middle Section - Search */}
        <div className="flex-grow max-w-2xl mx-4">
          <div className="relative">
            <div className="flex border border-gray-300 rounded-lg items-center px-3 py-1 bg-gray-50 hover:border-blue-500 transition-colors">
              <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder="Find Cars, Mobile Phones and more..."
                className="w-full px-2 py-1 focus:outline-none bg-transparent"
              />
              <button title="Search" className="p-1 text-gray-700 hover:text-blue-600">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">

          {/* Language Dropdown */}
          <div className="relative dropdown hidden md:block">
            <button onClick={toggleDropdown} className="flex items-center font-medium text-gray-700 hover:text-blue-600 transition-colors">
              <span className="mr-1">ENGLISH</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">English</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Hindi</button>
              </div>
            )}
          </div>

          {/* Wishlist */}
          <Link to="/favorites" className="p-2 text-gray-700 hover:text-blue-600 transition-colors hidden md:block" title="Wishlist">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </Link>

          {/* Profile/Login */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Link to="/profilepage" className="font-medium text-gray-700 hover:text-blue-600 transition-colors">
                My Profile
              </Link>
              <button onClick={handleLogout} className="font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Login
            </Link>
          )}

          {/* Sell Button */}
          <button
            onClick={() => navigate("/ad")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center font-semibold transition-colors shadow-sm"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="hidden sm:inline">SELL</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
