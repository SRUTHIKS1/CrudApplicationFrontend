import { useEffect, useState } from "react";
import { getAllAds } from "../Apiservice/allApi"; // make sure this is exported properly

const ProductCard = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await getAllAds();
        if (response.status === 200 && Array.isArray(response.data.data)) {
          setAds(response.data.data);
        } else {
          console.error("Unexpected response:", response);
          setAds([]);
        }
      } catch (error) {
        console.error("Failed to fetch ads:", error);
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 justify-center mt-6">
      {ads.map((product) => (
        <div key={product._id} className="border rounded-md shadow-md p-4 w-72 bg-white">
          <img
            className="w-full h-48 object-cover rounded-md"
            src={`http://localhost:3000/${product.images?.[0]}`}
            alt={product.title}
          />
          <div className="mt-3">
            <span className="text-lg font-bold text-green-500">₹{product.price}</span>
            <h4 className="font-semibold mt-1">{product.title}</h4>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
