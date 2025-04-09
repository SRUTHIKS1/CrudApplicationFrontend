import { useState } from "react";
import { useNavigate } from "react-router-dom";

 export const categoryOptions = {
    Electronics: ["Mobiles", "Laptops", "Cameras", "Accessories"],
    Vehicles: ["Cars", "Bikes", "Trucks", "Scooters"],
    "Real Estate": ["Apartments", "Houses", "Land", "Commercial"],
    Jobs: ["IT", "Sales", "Marketing", "Customer Support"],
    Services: ["Cleaning", "Tutoring", "Repair", "Catering"],
};

const PostAd = () => {
    const [adDetails, setAdDetails] = useState({
        category: "",
        subcategory: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "category") {
            setAdDetails({ category: value, subcategory: "" }); // reset subcategory when category changes
        } else {
            setAdDetails({ ...adDetails, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Ad Posted:", adDetails);
        navigate("/ad");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Post Your Ad</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium">Category:</label>
                        <select
                            name="category"
                            className="w-full px-3 py-2 border rounded-md"
                            value={adDetails.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a category</option>
                            {Object.keys(categoryOptions).map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {adDetails.category && (
                        <div className="mb-4">
                            <label className="block text-gray-600 font-medium">Subcategory:</label>
                            <select
                                name="subcategory"
                                className="w-full px-3 py-2 border rounded-md"
                                value={adDetails.subcategory}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a subcategory</option>
                                {categoryOptions[adDetails.category].map((sub) => (
                                    <option key={sub} value={sub}>
                                        {sub}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Submit Ad
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostAd;
