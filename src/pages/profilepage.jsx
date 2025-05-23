import { useEffect, useState } from "react";
import { getUserAds, getUserDetails } from "../Apiservice/allApi";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/navbar";
import ProductCard from "../component/productCard";
import { FiEdit, FiPlusCircle, FiUser } from "react-icons/fi";
import { PulseLoader } from "react-spinners";

const Profile = () => {
  const [ads, setAds] = useState([]);
  const [user, setUser] = useState(null);
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userData = JSON.parse(localStorage.getItem("userCredential"));
      
      if (!userData || !userData.userId) {
        throw new Error("User not authenticated");
      }

      const [userDetails, userAds] = await Promise.all([
        getUserDetails(userData.userId),
        getUserAds(userData.userId)
      ]);

      setUser(userDetails?.data?.data || null);
      setImg(userDetails?.data?.data?.Image || "");
      setAds(userAds.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <PulseLoader color="#6366f1" size={15} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
            <div className="text-red-500 mb-4 text-4xl">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Profile</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
              {/* Profile Picture Section */}
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="relative">
                  {img ? (
                    <img
                      src={`http://localhost:3000${img}`}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                      <FiUser className="text-gray-400 text-5xl" />
                    </div>
                  )}
                </div>
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => navigate("/editprofile", { state: { user } })}
                    className="flex items-center justify-center bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 transition"
                  >
                    <FiEdit className="mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => navigate("/category")}
                    className="flex items-center justify-center bg-gradient-to-r from-green-400 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-green-500 hover:to-teal-600 transition"
                  >
                    <FiPlusCircle className="mr-2" />
                    Sell Item
                  </button>
                </div>
              </div>

              {/* Profile Info Section */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {user?.name || "User Name"}
                </h1>
                <p className="text-gray-600 mb-4">{user?.email || "Email"}</p>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">Total Ads</p>
                    <p className="text-2xl font-bold text-gray-900">{ads.length}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-600 font-medium">Member Since</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ads Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Listings</h2>
              {ads.length > 0 && (
                <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                  {ads.length} {ads.length === 1 ? "item" : "items"}
                </span>
              )}
            </div>

            {ads.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {ads.map((ad, index) => (
                  <ProductCard key={index} adds={ad} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <div className="mx-auto max-w-md">
                  <div className="text-gray-400 mb-4 text-6xl">📦</div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    No listings yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Start selling your items to see them appear here
                  </p>
                  <button
                    onClick={() => navigate("/category")}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    <FiPlusCircle className="mr-2" />
                    Create Your First Listing
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Profile;