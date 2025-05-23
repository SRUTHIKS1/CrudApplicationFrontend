import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import Carousel from 'react-bootstrap/Carousel';
import {
  addToFavorites,
  deleteAd,
  getUserDetails,
  removeFromFavorites
} from "../Apiservice/allApi";
import Navbar from "../component/navbar";

const ProductDetails = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { adds } = location.state || {};
  const { adId } = useParams();

  if (!adds) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center p-8 bg-red-50 rounded-xl shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-xl font-semibold text-red-700">Product not found</p>
          <p className="mt-2 text-gray-600">The requested product details could not be loaded.</p>
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (adds && adds.userId) {
          const response = await getUserDetails(adds.userId);
          if (response?.data?.data) {
            setUserDetails(response.data.data);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
      }
    };

    const checkFavoriteStatus = () => {
      const userCredential = localStorage.getItem("userCredential");
      if (userCredential) {
        const parsedCredentials = JSON.parse(userCredential);
        const favorites = parsedCredentials.favorites || [];
        if (favorites.includes(adds.adId)) {
          setIsFavorited(true);
        }
      }
    };

    fetchUserDetails();
    checkFavoriteStatus();
  }, [adds]);

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    try {
      if (!adds?.adId) {
        alert("Cannot delete: Ad ID is missing");
        return;
      }

      setLoading(true);
      const response = await deleteAd(adds.adId);

      if (response.status === 200) {
        setLoading(false);
        navigate("/profile", { state: { message: "Ad deleted successfully" } });
      }
    } catch (error) {
      console.error("Error deleting ad:", error);
      alert(error.response?.data?.message || "Failed to delete ad");
      setLoading(false);
      setConfirmDelete(false);
    }
  };

  const handleFavorite = async () => {
    try {
      const userCredential = localStorage.getItem("userCredential");

      if (!userCredential) {
        alert("Please login to add to favorites");
        return;
      }

      const parsedCredentials = JSON.parse(userCredential);
      const userId = parsedCredentials.userId;

      if (!userId) {
        alert("User authentication error. Please login again.");
        return;
      }

      setLoading(true);

      if (isFavorited) {
        await removeFromFavorites(userId, adds.adId);
        const updatedCredentials = {
          ...parsedCredentials,
          favorites: (parsedCredentials.favorites || []).filter(id => id !== adds.adId)
        };
        localStorage.setItem("userCredential", JSON.stringify(updatedCredentials));
        setIsFavorited(false);
      } else {
        await addToFavorites(userId, adds.adId);
        const updatedCredentials = {
          ...parsedCredentials,
          favorites: [...(parsedCredentials.favorites || []), adds.adId]
        };
        localStorage.setItem("userCredential", JSON.stringify(updatedCredentials));
        setIsFavorited(true);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error updating favorites:", err);
      alert(err.response?.data?.message || "Failed to update favorites");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-8">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="relative h-96">
                    <Carousel interval={null}>
                      {adds.images.map((item, index) => (
                        <Carousel.Item key={index} className="h-full">
                          <img
                            src={`http://localhost:3000${item}`}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>

                    {showOverlay && (
                      <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 text-sm font-bold rounded-md shadow-lg">
                        Featured
                      </div>
                    )}

                    <button
                      className="absolute top-4 right-4 bg-white bg-opacity-90 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all"
                      onClick={handleFavorite}
                      disabled={isFavorited}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={isFavorited ? "currentColor" : "none"}
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-red-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="md:w-1/2 p-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">{adds.title}</h1>
                      <p className="text-2xl font-semibold text-green-600 mt-2">₹{adds.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                      <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                      <span className="text-sm font-medium text-blue-700">Active</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div><strong>Brand:</strong> {adds.brand}</div>
                    <div><strong>Year:</strong> {adds.year}</div>
                    <div><strong>Fuel:</strong> {adds.fuel}</div>
                    <div><strong>Transmission:</strong> {adds.transmission}</div>
                    <div><strong>KM Driven:</strong> {adds.kmDriven.toLocaleString()} km</div>
                    <div><strong>Owners:</strong> {adds.owners}</div>
                  </div>

                  <div className="mt-8 flex space-x-4">
                    <button
                      className={`${isFavorited ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-600"
                        } text-white font-bold py-3 px-6 rounded-lg flex-1`}
                      onClick={handleFavorite}
                      disabled={isFavorited}
                    >
                      {isFavorited ? "Added to Favorites" : "Add to Favorites"}
                    </button>

                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
                      onClick={() => navigate(`/editProduct/${adds.adId}`)}
                    >
                      Edit Ad
                    </button>

                    <button
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg flex-1"
                      onClick={handleDelete}
                    >
                      {confirmDelete ? "Confirm Delete" : "Delete Ad"}
                    </button>
                  </div>
                </div>
              </div>

              {userDetails && (
                <div className="p-8 border-t mt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Seller Information</h3>
                  <p><strong>Name:</strong> {userDetails.name}</p>
                  <p><strong>Email:</strong> {userDetails.email}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
