import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import Carousel from 'react-bootstrap/Carousel';
import { deleteAd } from "../Apiservice/allApi";

const ProductDetails = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { adds } = location.state || {};
  const { adId } = useParams();
  if (!adds) {
    return <p className="text-center text-xl mt-10 text-red-600">Product not found.</p>;
  }
  const handleDelete = async () => {


    try {

      const response = await deleteAd(adds.adId);


      if (response.status === 200) {
        alert("Ad deleted successfully");
      }

      navigate("/profilepage");
    } catch (error) {
      console.error("Error deleting ad:", error);
      alert(error.response?.data?.message || "Failed to delete ad");

    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-6">

        <div>

          <div className="relative">
            <Carousel interval={null}>
              {adds.images.map((item, index) => (
                <Carousel.Item key={index}>
                  <img
                    src={`http://localhost:3000${item}`} // ✅ Corrected string interpolation
                    alt={`Slide ${index + 1}`}            // ✅ Corrected string interpolation
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </Carousel.Item>
              ))}
            </Carousel>



            {showOverlay && (
              <div className="absolute bottom-2 left-2 bg-yellow-500 text-white px-3 py-1 text-xs font-bold rounded-md shadow-lg">
                Featured
              </div>
            )}


            <button className="absolute top-2 right-2 bg-white bg-opacity-75 p-2 rounded-full shadow">
              <svg xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24"
                strokeWidth={1.5} stroke="currentColor"
                className="w-6 h-6 text-red-600">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 
                                    0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 
                                    3.75 3 5.765 3 8.25c0 7.22 9 12 9 
                                    12s9-4.78 9-12Z" />
              </svg>
            </button>
          </div>


          <div className="bg-slate-100 mt-4 p-5 rounded-xl shadow-md">
            <p className="text-gray-600 text-base mb-4">{adds.description}</p>
            <span className="text-lg font-semibold text-green-600">Price: ₹{adds.price}</span>
          </div>
        </div>


        <div className="bg-slate-100 p-6 rounded-xl shadow-md space-y-4 h-fit">
          <h2 className="text-2xl font-bold text-gray-800">{adds.title}</h2>
          <p className="text-gray-600">Brand: <span className="font-medium">{adds.brand}</span></p>
          <p className="text-gray-600">Year: <span className="font-medium">{adds.year}</span></p>
          <p className="text-gray-600">Fuel: <span className="font-medium">{adds.fuel}</span></p>
          <p className="text-gray-600">Kilometers Driven: <span className="font-medium">{adds.kmDriven}</span></p>
          <p className="text-gray-600">Owner: <span className="font-medium">{adds.owners}</span></p>
          <p className="text-gray-600">Transmission: <span className="font-medium">{adds.transmission}</span></p>

          <div className="pt-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
              onClick={() => navigate(`/editProduct/${adds.adId}`)}

            >
              Edit Ad
            </button>
          </div>
          <div className="pt-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
              onClick={handleDelete}
            >
              Delete Ad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;