import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const Category = () => {
    const [category, setCategory] = useState('')
    const [subcategory, setSubcategory] = useState('')
    const navigate= useNavigate()
    const location = useLocation();

    const handleSubmit = () => {
       
        navigate('/ad', {
            state: { category , subcategory  }
        });
        
    };


    return (
        <div>
            <div className="p-6 bg-white rounded-lg shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Post Your Ad</h2>

                <select
                    className="w-full p-2 border rounded-md"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Select Category</option>
                    <option value="Vehicles">Vehicles</option>
                    
                </select>

                <select
                    className="w-full p-2 border rounded-md mt-2"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                >
                    <option value="">Select Subcategory</option>
                    {category === "Vehicles" && (
                        <>
                            <option value="Cars">Cars</option>
                            <option value="Bikes">Bikes</option>
                        </>
                    )}
                    
                </select>

                <div className="mt-4">
                    <p className="text-gray-700">Selected: {category} / {subcategory}</p>
                </div>

                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md" onClick={handleSubmit}>
                    Submit Ad
                </button>
            </div>
        </div>
    );
};

export default Category;