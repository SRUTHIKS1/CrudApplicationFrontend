import React, { useEffect, useState } from 'react';
import { getUserDetails, getAdById } from '../Apiservice/allApi';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/navbar';

const Favorites = () => {
  const [favoriteAds, setFavoriteAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userCredential"));

        if (!userData || !userData.userId) {
          alert("Please log in to view your favorites.");
          navigate("/login");
          return;
        }

        const headers = {
          Authorization: `Bearer ${userData.token}`,
        };

        const userRes = await getUserDetails(userData.userId, headers);
        const favoriteIds = userRes.data?.data?.favorites || [];

        const adPromises = favoriteIds.map(adId => getAdById(adId));
        const adsData = await Promise.all(adPromises);

        const ads = adsData.map(res => res.data?.ad).filter(Boolean);
        setFavoriteAds(ads);
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [navigate]);

  const handleAdClick = (ad) => {
    navigate(`/productDetails/${ad.adId}`, { state: { adds: ad } });
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">My Favorite Ads</h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading favorites...</p>
          </div>
        ) : favoriteAds.length === 0 ? (
          <p className="text-center text-gray-600">You have no favorite ads yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteAds.map(ad => (
              <div
                key={ad.adId}
                className="bg-white rounded-xl shadow hover:shadow-lg cursor-pointer overflow-hidden"
                onClick={() => handleAdClick(ad)}
              >
                <img
                  src={`http://localhost:3000${ad.images?.[0]}`}
                  alt={ad.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900">{ad.title}</h3>
                  <p className="text-green-600 font-bold mt-2">₹{ad.price?.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-1">{ad.brand} • {ad.year}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites;
