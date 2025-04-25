import { useState } from "react";
import { useLocation } from "react-router";
import Carousel from 'react-bootstrap/Carousel';

const ProductDetails = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  const location = useLocation();
  const { adds } = location.state || {};

  if (!adds) return <p className="text-center text-red-500 mt-10">Product not found.</p>;

  return (
    <div className="mx-3 my-4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Carousel */}
        <div className="relative w-full">
          <Carousel>
            {adds?.images?.map((item, index) => (
              <Carousel.Item key={index}>
                <img
                  src={`http://localhost:3000${item}`}
                  className="w-full h-80 object-cover rounded"
                  alt={`Slide ${index + 1}`}
                  onError={(e) => (e.target.src = "/fallback.jpg")}
                />
              </Carousel.Item>
            ))}
          </Carousel>

          {showOverlay && (
            <div className="absolute bottom-2 left-2 bg-yellow-500 text-white px-3 py-1 rounded shadow">
              Featured
            </div>
          )}

          <div className="absolute top-2 right-2">
            <button onClick={() => setShowOverlay(!showOverlay)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 
                     0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 
                     3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="bg-gray-50 p-4 rounded shadow">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{adds?.title}</h1>
          <p className="text-gray-600 mb-4">{adds?.description}</p>

          <div className="text-xl text-green-700 font-semibold mb-2">₹ {adds?.price}</div>

          <div className="grid grid-cols-2 gap-2 mt-4 text-gray-700">
            <div><strong>Brand:</strong> {adds?.brand}</div>
            <div><strong>Year:</strong> {adds?.year}</div>
            <div><strong>Fuel:</strong> {adds?.fuel}</div>
            <div><strong>Transmission:</strong> {adds?.transmission}</div>
            <div><strong>KM Driven:</strong> {adds?.kmDriven}</div>
            <div><strong>Owners:</strong> {adds?.owners}</div>
            <div><strong>Category:</strong> {adds?.category}</div>
            <div><strong>Subcategory:</strong> {adds?.subcategory}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
