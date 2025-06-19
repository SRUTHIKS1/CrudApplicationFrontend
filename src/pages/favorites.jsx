import { useState, useEffect } from "react";
import { getAllAds, getUserFavorites } from "../Apiservice/allApi";
import ProductCard from "../component/productCard";

const Favorites = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const userCredentials = localStorage.getItem("userCredential");
      if (!userCredentials) {
        alert("User not logged in");
        return;
      }

      const parsedCredentials = JSON.parse(userCredentials);
      const userId = parsedCredentials.userId;
      console.log(userId);

      try {
        const result= await getUserFavorites(userId);
        // const { ads } = await getAllAds(); 
       


        // const filtered = ads.filter(ad => favorites.includes(ad.adId));
         console.log(result);


         setFavoriteProducts(result.data.favorites);

      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h1>Your Favorite Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {favoriteProducts?.map(product => (
          <ProductCard key={product.adId} adds={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites