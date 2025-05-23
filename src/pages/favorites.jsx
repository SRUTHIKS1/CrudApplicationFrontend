import { useEffect, useState } from "react";
import { getAdById } from "../Apiservice/allApi";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favoriteAds, setFavoriteAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      const userCredential = localStorage.getItem("userCredential");

      if (!userCredential) {
        setFavoriteAds([]);
        setLoading(false);
        return;
      }

      const { favorites = [] } = JSON.parse(userCredential);
      const adPromises = favorites.map(adId => getAdById(adId));
      try {
        const responses = await Promise.all(adPromises);
        const adsData = responses
          .map(res => res?.data?.data)
          .filter(adds => adds !== undefined);
        setFavoriteAds(adsData);
      } catch (err) {
        console.error("Error fetching favorite ads:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleViewAd = (adds) => {
    navigate(`/product/${adds.adId}`, { state: { adds: adds } });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">My Favorite Ads</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full" />
          </div>
        ) : favoriteAds.length === 0 ? (
          <div className="text-center text-gray-600 mt-20">
            <p className="text-xl">You have no favorite ads yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteAds.map(adds => (
              <div
                key={adds.adId}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition duration-300"
                onClick={() => handleViewAd(ad)}
              >
                <img
                  src={`http://localhost:3000${adds.images[0]}`}
                  alt={adds.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{adds.title}</h2>
                  <p className="text-green-600 font-bold mt-2">₹{adds.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-1">{adds.brand} | {adds.year}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
