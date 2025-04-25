import { useNavigate } from "react-router";

const ProductCard = ({ adds }) => {
  const navigate = useNavigate();

  
  return (
    <div
      className="border p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition"
      onClick={()=>{navigate("/productDetails", { state: { adds } })}}
    >
      {adds?.images?.length > 0 && (
        <img
          src={`http://localhost:3000${adds.images[0]}`}
          alt={adds.title || "Ad Image"}
          className="h-40 w-full object-cover rounded mb-2"
          onError={(e) => {
            e.target.src = "/fallback.jpg"; // fallback image if loading fails
          }}
        />
      )}

      <h2 className="text-xl font-bold">{adds?.title}</h2>
      <p className="text-gray-700 truncate">{adds?.description}</p>
      <p className="text-green-600 font-semibold mt-1">₹{adds?.price}</p>
    </div>
  );
};

export default ProductCard;
