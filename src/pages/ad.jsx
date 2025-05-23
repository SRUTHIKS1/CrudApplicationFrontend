import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { createAd } from "../Apiservice/allApi";

const Ads = () => {
  const location = useLocation();
  const { category, subcategory } = location.state || {};
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    adId: '',
    location: "",
    brand: '',
    year: '',
    fuel: '',
    transmission: '',
    kmDriven: '',
    owners: '',
    title: '',
    description: '',
    price: '',
    images: [],
    category: category,
    subcategory: subcategory,
    userId: '',
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userCredential"));
    if (userData && userData.userId) {
      setFormData((prev) => ({
        ...prev,
        userId: userData.userId,
      }));
    }
  }, []);

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: files
    }));
  };

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        value.forEach((img) => adData.append("images", img));
      } else {
        adData.append(key, value);
      }
    });

    try {
      const headers = { "Content-Type": "multipart/form-data" };
      const res = await createAd(adData, headers);
      if (res.status === 201) {
        alert("Ad posted successfully!");
        navigate('/home');
      } else {
        alert("Failed to add ad");
      }
    } catch (err) {
      console.error("Error posting ad:", err);
      alert("Failed to post ad. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Post Your Ad</h1>
            <p className="text-gray-600 mt-1">Fill in the details below to create your listing</p>
          </div>

          <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
            {/* Vehicle Details Section */}
            <div className="px-6 py-4">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Vehicle Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand*</label>
                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="">Select Brand</option>
                    <option value="TATA">TATA</option>
                    <option value="MARUTI">MARUTI</option>
                    <option value="TOYOTA">TOYOTA</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year*</label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="e.g. 2020"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type*</label>
                  <select
                    name="fuel"
                    value={formData.fuel}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="">Select Fuel Type</option>
                    <option value="DIESEL">Diesel</option>
                    <option value="PETROL">Petrol</option>
                    <option value="ELECTRIC">Electric</option>
                    <option value="CNG & HYBRID">CNG & Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transmission*</label>
                  <select
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="">Select Transmission</option>
                    <option value="AUTOMATIC">Automatic</option>
                    <option value="MANUAL">Manual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kilometers Driven*</label>
                  <input
                    type="text"
                    name="kmDriven"
                    value={formData.kmDriven}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="e.g. 15000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Owners*</label>
                  <select
                    name="owners"
                    value={formData.owners}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="">Select Owners</option>
                    <option value="1st">1st Owner</option>
                    <option value="2nd">2nd Owner</option>
                    <option value="3rd">3rd Owner</option>
                  </select>
                </div>

                {/* ✅ Added Location Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="e.g. Delhi, Mumbai"
                  />
                </div>
              </div>
            </div>

            {/* Listing Details */}
            <div className="px-6 py-4">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Listing Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="e.g. Well-maintained Toyota Fortuner"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="Provide detailed information about the vehicle..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="px-6 py-4">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Pricing</h2>
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)*</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">₹</span>
                  </div>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="px-6 py-4">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Photos</h2>
              <p className="text-sm text-gray-500 mb-4">Upload high-quality photos of your vehicle (up to 10 images)</p>
              <div className="flex flex-wrap gap-4 mb-4">
                {formData.images.map((img, i) => (
                  <div key={i} className="relative h-32 w-32 rounded-md overflow-hidden border border-gray-200">
                    <img 
                      src={URL.createObjectURL(img)} 
                      className="h-full w-full object-cover" 
                      alt={`Preview ${i + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          images: prev.images.filter((_, index) => index !== i)
                        }));
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <label className="flex items-center justify-center h-32 w-32 rounded-md border-2 border-dashed border-gray-300 cursor-pointer">
                  <div className="text-center">
                    <p className="mt-1 text-sm text-gray-600">Add photos</p>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleImage}
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="px-6 py-4 bg-gray-50">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
              >
                Post Ad
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Ads;
