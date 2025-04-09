import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userCredential"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userCredential");
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload(); // ensures UI refresh
  };

  return (
    <div className="bg-slate-100 flex flex-col sticky top-0 z-50">
      <nav className="bg-slate shadow-md p-4 flex justify-between items-center">
        {/* OLX Logo */}
        <div>
          <img src="olx.jpg" className="w-11 h-11" alt="OLX" />
        </div>

        {/* Location Search */}
        <div className="flex border rounded-md overflow-hidden">
          <input className="px-2" placeholder="Search city, area or locality" defaultValue="India" />
          <button type="button">
            <svg className="w-6 h-6 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
            </svg>
          </button>
        </div>

        {/* Product Search */}
        <div className="flex border-2 rounded-md overflow-hidden w-1/3">
          <input type="text" placeholder="Search products..." className="px-4 py-2 w-full focus:outline-none" />
          <button className="bg-slate-200 text-white px-4 py-2">
            <svg className="w-6 h-6 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
            </svg>
          </button>
        </div>

        {/* Language Selector */}
        <div className="flex items-center">
          ENGLISH
          <button>
            <svg className="w-7 h-4 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 10 4 4 4-4" />
            </svg>
          </button>
        </div>

        {/* Heart / Wishlist */}
        <div>
          <button>
            <svg className="w-[34px] h-[34px] text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
            </svg>
          </button>
        </div>

        {/* Profile/Login */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative group">
              <button className="text-gray-700 font-semibold">
                {user.name}
              </button>
              <div className="absolute hidden group-hover:block ...">

                <button
                  onClick={() => navigate("/profilepage")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  My Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <a href="/login" className="text-gray-700 font-semibold">
              Login
            </a>
          )}
        </div>

        {/* Sell */}
        <div>
          <a href="/postyourAd" className="text-green-600 font-semibold">Sell</a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
