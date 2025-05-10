import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router";
import { createAd } from "../Apiservice/allApi";

const Ads = () => {
  const location = useLocation();
  const { category, subcategory } = location.state || {};
  console.log("category", category, "sub", subcategory)
  // const user = location.state?.user;
  const [adsList, setAdsList] = useState([]);
  const [userData, setUserData] = useState({
    userId: '',
  })
  const navigate = useNavigate()

  const [images, setImage] = useState()
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userCredential"));
    if (userData && userData.userId) {
      setFormData((prev) => ({
        ...prev,
        userId: userData.userId,
      }));
    }
  }, []);


  useEffect(() => {
    console.log(userData)
  }, [userData])

  const [formData, setFormData] = useState({
    adId: '',
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
    userId: userData.userId,
  });
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
        value.forEach((img) => adData.append("images", img)); // match the backend field name
      }

      else {
        adData.append(key, value);
      }
    });

    try {
      const headers = { "Content-Type": "multipart/form-data" };
      // const res = await addAds(userData?.UserIds,adData, headers);
      const res = await createAd(adData, headers);
      if (res.status === 201) {
        alert("Ad posted successfully!");
        navigate('/home')
      } else {
        alert("failed to add")
      }

    } catch (err) {
      console.error("Error posting ad:", err);
      alert("Failed !!!.");
    }
  };


  return (
    <form onSubmit={handleSubmit}>

      <div className="flex justify-center p-6 bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-center mb-4">POST YOUR ADS</h1>
          <div>
            <h2 className="text-xl font-semibold mb-2">INCLUDE SOME DETAILS</h2>

            <label className="block font-medium">BRAND</label>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mb-4"
            >
              <option value="">ALL BRANDS</option>
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

            <div className="relative h-32 w-32 flex gap-2 mt-2">
              {formData.images && formData.images.map((img, i) => (
                <img key={i} src={URL.createObjectURL(img)} className="h-20 w-20 object-cover square" />
              ))}
              <label className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow ">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
                  <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>

                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImage}

                />
              </label>
            </div>


            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md font-bold hover:bg-blue-600"
            >
              Submit Ad
            </button>
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        {adsList.map((add, index) => (
          <ProductCard key={index} adds={add} />
        ))}
      </div>
    </form>

  )
}

export default Ads