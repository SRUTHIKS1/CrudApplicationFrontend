import { useEffect, useState } from "react";
import { getAllAds } from "../Apiservice/allApi";
import ProductCard from "../component/productCard";

const AllAd = ({ searchResult }) => {
  const [adds, setAdds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await getAllAds();
        setAdds(res.data);
      } catch (err) {
        console.error("Error fetching ads:", err);
      }
    };

    if (searchResult?.length > 0) {
      setAdds(searchResult);
    } else {
      fetchAds();
    }
  }, [searchResult]);

  return (
    <>
      {adds.length === 0 ? (
        <div className="text-center text-gray-500 mt-12">No ads found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {adds.map((ad, index) => (
            <ProductCard key={index} adds={ad} />
          ))}
        </div>
      )}
    </>
  );
};

export default AllAd;
