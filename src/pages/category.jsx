import { useState } from 'react';
import { useNavigate } from 'react-router';

const Category = () => {
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (!category || !subcategory) {
            alert('Please select both category and subcategory');
            return;
        }
        
        navigate('/ad', {
            state: { category, subcategory }
        });
    };

    const categoryOptions = [
        { value: 'Vehicles', label: 'Vehicles' },
        { value: 'Electronics', label: 'Electronics' },
        { value: 'Property', label: 'Property' },
        { value: 'Furniture', label: 'Furniture' },
    ];

    const subcategoryOptions = {
        Vehicles: [
            { value: 'Cars', label: 'Cars' },
            { value: 'Bikes', label: 'Bikes' },
            { value: 'Trucks', label: 'Trucks' },
            { value: 'Boats', label: 'Boats' },
        ],
        Electronics: [
            { value: 'Phones', label: 'Phones' },
            { value: 'Laptops', label: 'Laptops' },
            { value: 'TVs', label: 'TVs' },
            { value: 'Cameras', label: 'Cameras' },
        ],
        Property: [
            { value: 'Apartments', label: 'Apartments' },
            { value: 'Houses', label: 'Houses' },
            { value: 'Land', label: 'Land' },
            { value: 'Commercial', label: 'Commercial' },
        ],
        Furniture: [
            { value: 'Sofas', label: 'Sofas' },
            { value: 'Beds', label: 'Beds' },
            { value: 'Tables', label: 'Tables' },
            { value: 'Wardrobes', label: 'Wardrobes' },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Post Your Ad</h2>
                
                <div className="space-y-6">
                    {/* Category Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setSubcategory(''); // Reset subcategory when category changes
                            }}
                        >
                            <option value="">Select a category</option>
                            {categoryOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Subcategory Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subcategory
                        </label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:opacity-50"
                            value={subcategory}
                            onChange={(e) => setSubcategory(e.target.value)}
                            disabled={!category}
                        >
                            <option value="">Select a subcategory</option>
                            {category && subcategoryOptions[category]?.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Selection Preview */}
                    {category && subcategory && (
                        <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
                            <p className="text-sm text-blue-800">
                                <span className="font-medium">Selected:</span> {category} / {subcategory}
                            </p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={!category || !subcategory}
                        className={`w-full py-3 px-4 rounded-md font-medium text-white transition 
                            ${(!category || !subcategory) 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'}`}
                    >
                        Continue to Ad Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Category;