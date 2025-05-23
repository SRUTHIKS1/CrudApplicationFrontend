import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { editUserDetails } from "../Apiservice/allApi";

const EditProfile = () => {
    const [img, setImg] = useState();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        userId: "",
        name: "",
        email: "",
        address: "",
        contact: "",
        location: ""
    });

    const location = useLocation();
    const user = location.state?.user;

    useEffect(() => {
        if (user) {
            setUserData(user);
        }
    }, [user]);

    const handleImage = (e) => {
        const img = e.target.files[0];
        setImg(img);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            if (img) formData.append("img", img);
            formData.append("name", userData.name);
            formData.append("address", userData.address);
            formData.append("contact", userData.contact);
            formData.append("location", userData.location);

            const token = localStorage.getItem("token");
            const headers = {
                "Content-Type": "multipart/form-data",
                "authorization": `Bearer ${token}`
            };
            
            const response = await editUserDetails(userData?.userId, formData, headers);
            if (response.status === 200) {
                alert("Profile updated successfully!");
                navigate("/profilepage");
            } else {
                alert("Failed to update profile. Please try again.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="p-8">
                    <div className="flex justify-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">
                            Edit Your Profile
                        </h2>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Profile Picture */}
                        <div className="flex flex-col items-center">
                            <div className="relative h-40 w-40 mb-4">
                                <img
                                    src={img ? URL.createObjectURL(img) : `http://localhost:3000${user?.Image}`}
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover border-4 border-gray-200"
                                />
                                <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition">
                                    <svg className="w-6 h-6 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
                                        <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImage}
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={userData?.name || ""}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userData?.email || ""}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                                    disabled
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address
                                </label>
                                <textarea
                                    name="address"
                                    value={userData?.address || ""}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Contact Number
                                </label>
                                <input
                                    type="tel"
                                    name="contact"
                                    value={userData?.contact || ""}
                                    onChange={handleChange}
                                    maxLength="10"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={userData?.location || ""}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;