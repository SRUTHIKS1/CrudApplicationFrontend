import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { search } from "../Apiservice/allApi";

const Navbar = ({setSearchResult}) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Toggle language dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Check login status on component mount
  useEffect(() => {
    const userToken = localStorage.getItem('token');
    setIsLoggedIn(!!userToken);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".dropdown")) setIsOpen(false);
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  // Handle search input change
  const handleSearchChange = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim() === '') {
      setResults([]);
      return;
    }

    try {
      const data = await search(searchQuery);
      console.log(data.data.items)
      setSearchResult(data.data.items);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]);
    }
  };
  // Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".dropdown")) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };
  
  return(
    <nav className="sticky top-0 bg-gray-100 text-black p-2 shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between gap-x-4 flex-wrap">

        {/* Logo */}
         {/* OLX Logo */}
         <div>
          <img src="olx.jpg" className="w-11 h-11" alt="OLX" />
        </div>

        {/* Location Search Input (non-functional placeholder) */}
        <div className="flex items-center border rounded-lg overflow-hidden px-2">
          <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 21l-5.197-5.197A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input
            type="text"
            placeholder="Search locations..."
            className="px-2 py-1 focus:outline-none"
          />
        </div>

        {/* Product Search */}
        <div className="relative w-1/3 min-w-[250px]">
          <div className="flex border rounded-lg items-center px-2">
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              placeholder="Search for items"
              className="w-full px-2 py-1 focus:outline-none"
            />
            <button title="Search">
              <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 21l-5.197-5.197A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Language Dropdown */}
        <div className="relative dropdown">
          <button onClick={toggleDropdown} className="flex items-center font-medium">
            <span className="mr-1">ENGLISH</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute mt-2 w-40 bg-white shadow-lg rounded-lg">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">English</button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Hindi</button>
            </div>
          )}
        </div>

        {/* Wishlist Icon */}
        <button title="Wishlist">
          <svg className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 8.25c0-2.5-2.1-4.5-4.7-4.5-1.9 0-3.6 1.1-4.3 2.7-0.7-1.6-2.4-2.7-4.3-2.7-2.6 0-4.7 2-4.7 4.5 0 7.2 9 12 9 12s9-4.8 9-12z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Profile / Login */}
        <div className="underline font-semibold">
          <Link to="/profilepage">Profile</Link>
        </div>
        
        {/* Login/Logout Button */}
        <div className="underline font-semibold">
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>

        {/* Sell Button */}
        <div>
          <button
            onClick={() => navigate("/ad")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 flex items-center font-semibold"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 4.5v15m7.5-7.5h-15" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            SELL
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;