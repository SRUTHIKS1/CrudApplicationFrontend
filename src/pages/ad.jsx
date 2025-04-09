import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAd } from "../Apiservice/allApi";
import { categoryOptions } from "./category";

const Ads = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    userId: '',
    category: '',
    subcategory: '',
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
    setImages(files);
    setFormData((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setFormData((prev) => ({
        ...prev,
        category: value,
        subcategory: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userId) {
      alert("User not logged in.");
      return;
    }

    try {
      const form = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((img) => form.append("images", img)); // Append multiple images
        } else {
          form.append(key, value);
        }
      });

      const headers = { "Content-Type": "multipart/form-data" };
      const response = await createAd(form, headers);

      if (response.status === 201) {
        alert("Ad posted successfully!");
        navigate("/home");
      } else {
        alert("Failed to post ad.");
      }
    } catch (error) {
      console.error("Error submitting ad:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-4">POST YOUR ADS</h1>
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-4">INCLUDE SOME DETAILS</h2>

          {/* Category */}
          <label className="block font-medium">CATEGORY</label>
          <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded-md mb-4" required>
            <option value="">Select Category</option>
            {Object.keys(categoryOptions).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Subcategory */}
          {formData.category && (
            <>
              <label className="block font-medium">SUBCATEGORY</label>
              <select name="subcategory" value={formData.subcategory} onChange={handleChange} className="w-full p-2 border rounded-md mb-4" required>
                <option value="">Select Subcategory</option>
                {categoryOptions[formData.category].map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </>
          )}

          {/* Brand */}
          <label className="block font-medium">BRAND</label>
          <select name="brand" value={formData.brand} onChange={handleChange} className="w-full p-2 border rounded-md mb-4" required>
            <option value="">ALL BRANDS</option>
            <option value="TATA">TATA</option>
            <option value="MARUTI">MARUTI</option>
            <option value="TOYOTA">TOYOTA</option>
          </select>

          {/* Year */}
          <label className="block font-medium">YEAR</label>
          <input type="number" name="year" value={formData.year} onChange={handleChange} className="w-full p-2 border rounded-md mb-4" required />

          {/* Fuel */}
          <label className="block font-medium">FUEL</label>
          <select name="fuel" value={formData.fuel} onChange={handleChange} className="w-full p-2 border rounded-md mb-4" required>
            <option value="">Select</option>
            <option value="DIESEL">DIESEL</option>
            <option value="PETROL">PETROL</option>
            <option value="ELECTRIC">ELECTRIC</option>
            <option value="CNG & HYBRID">CNG & HYBRID</option>
          </select>

          {/* Transmission */}
          <label className="block font-medium">TRANSMISSION</label>
          <select name="transmission" value={formData.transmission} onChange={handleChange} className="w-full p-2 border rounded-md mb-4" required>
            <option value="">Select</option>
            <option value="AUTOMATIC">AUTOMATIC</option>
            <option value="MANUAL">MANUAL</option>
          </select>

          {/* KM Driven */}
          <label className="block font-medium">KM DRIVEN</label>
          <input type="number" name="kmDriven" value={formData.kmDriven} onChange={handleChange} className="w-full p-2 border rounded-md mb-4" required />

          {/* Owners */}
          <label className="block font-medium">NO. OF OWNERS</label>
          <select name="owners" value={formData.owners} onChange={handleChange} className="w-full p-2 border rounded-md mb-4" required>
            <option value="">Select</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
          </select>

          {/* Title */}
          <label className="block font-medium">TITLE</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded-md mb-4" required />

          {/* Description */}
          <label className="block font-medium">DESCRIPTION</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded-md mb-4" required />

          {/* Price */}
          <label className="block font-medium">PRICE</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded-md mb-4" required />

          {/* Images */}
          <label className="block font-medium">UPLOAD IMAGES</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImage}
            className="w-full p-2 border rounded-md mb-4"
            required
          />
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-4">
              {images.map((img, i) => (
                <img key={i} src={URL.createObjectURL(img)} alt="preview" className="w-full h-32 object-cover rounded" />
              ))}
            </div>
          )}

          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md font-bold hover:bg-blue-600">
            Submit Ad
          </button>
        </form>
      </div>
    </div>
  );
};

export default Ads;
