import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateAd } from "../Apiservice/allApi";

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.productToEdit;

  const [formData, setFormData] = useState({
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
    category: '',
    subcategory: '',
    userId: '',
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userCredential"));
    if (user?.userId && product) {
      setFormData({
        ...product,
        userId: user.userId,
        images: [], // clear for new uploads only
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images" && value.length > 0) {
        Array.from(value).forEach((file) => updatedData.append("images", file));
      } else {
        updatedData.append(key, value);
      }
    });

    try {
      const headers = { "Content-Type": "multipart/form-data" };
      const res = await updateAd(product._id, updatedData, headers);

      if (res.status === 200) {
        alert("Ad updated successfully!");
        navigate("/home");
      } else {
        alert("Update failed.");
      }
    } catch (err) {
      console.error("Error updating ad:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center p-6 bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-center mb-4">EDIT YOUR AD</h1>

          <label className="block font-medium">BRAND</label>
          <select
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          >
            <option>TATA</option>
            <option>MARUTI</option>
            <option>TOYOTA</option>
          </select>

          <label className="block font-medium">YEAR</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          />

          <label className="block font-medium">FUEL</label>
          <select
            name="fuel"
            value={formData.fuel}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          >
            <option>DIESEL</option>
            <option>PETROL</option>
            <option>ELECTRIC</option>
            <option>CNG & HYBRID</option>
          </select>

          <label className="block font-medium">TRANSMISSION</label>
          <select
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          >
            <option>AUTOMATIC</option>
            <option>MANUAL</option>
          </select>

          <label className="block font-medium">KM DRIVEN</label>
          <input
            type="text"
            name="kmDriven"
            value={formData.kmDriven}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          />

          <label className="block font-medium">NO. OF OWNERS</label>
          <select
            name="owners"
            value={formData.owners}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          >
            <option>1st</option>
            <option>2nd</option>
            <option>3rd</option>
          </select>

          <label className="block font-medium">ADD TITLE</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          />

          <label className="block font-medium">DESCRIPTION</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          ></textarea>

          <label className="block font-medium">SET PRICE</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          />

          <label className="block font-medium">UPLOAD NEW IMAGES</label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="mb-4"
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-md font-bold hover:bg-green-600"
          >
            Update Ad
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditProduct;
