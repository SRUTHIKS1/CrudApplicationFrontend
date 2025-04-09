import { useLocation, useNavigate } from "react-router-dom";

const ProductDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product;

    if (!product) {
        return <div className="text-center text-red-500 text-xl mt-10">Product not found!</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
            <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-md">

                <div className="flex flex-col md:flex-row">
                    <img
                        className="w-full md:w-1/2 h-80 object-cover rounded-lg"
                        src={product.image}
                        alt={product.title}
                    />


                    <div className="md:ml-6 flex flex-col justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
                            <p className="text-green-600 text-xl font-semibold mt-2">{product.price}</p>
                            <p className="text-gray-500 text-sm mt-1">{product.location} • {product.date}</p>
                            <p className="mt-4 text-gray-600">{product.description}</p>
                        </div>
                        <div className="mt-4 p-3 bg-gray-100 rounded-md">
                            <h3 className="font-semibold text-gray-700">Warranty Details</h3>
                            <p className="text-gray-600 text-sm">1-Year Warranty on Structure</p>
                            <p className="text-gray-600 text-sm">6-Months Warranty on Interiors</p>

                        </div>


                        <button
                            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full md:w-48"

                        >
                            Contact Seller
                        </button>
                    </div>
                </div>


                <button
                    className="mt-6 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md"
                    // onClick={() => navigate("/")}  // ← This navigates to home
                >


                    Go Back
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;
