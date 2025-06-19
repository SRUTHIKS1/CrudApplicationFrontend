import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { editUserDetails } from "../Apiservice/allApi"
import Navbar from "../component/navbar"
import { Footer } from "flowbite-react"

const EditProfile = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const user = location.state?.user
    const [isLoading, setIsLoading] = useState(false)
    const [img, setImg] = useState(null)
      const [previewImg, setPreviewImg] = useState(
    user?.Image ? `http://localhost:3000${user.Image}` : null
  );

  const [userData, setUserData] = useState({
    userId: "",
    name: "",
    email: "",
    password: "",
    address: "",
    contact: "",
    location: "",
  })
    useEffect(() => {
        if (user) {
            setUserData({
                userId: user.userId,
            name: user.name || "",
                
                email: user.email || "",
                password: user.password || "",
                address: user.address || "",
                contact: user.contact || "",
                location: user.location || ""
            })
        }
    }, [user])

    const handleImage = (e) => {
        const selectedImg = e.target.files[0]
        if (selectedImg) {
            setImg(selectedImg)
            setPreviewImg(URL.createObjectURL(selectedImg))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const formData = new FormData()
            if (img) formData.append("img", img)
            formData.append("name", userData.name)
           
            formData.append("address", userData.address)
            formData.append("contact", userData.contact)
            formData.append("location", userData.location)
            
            const token = localStorage.getItem("token");
            const headers = {
                "Content-Type": "multipart/form-data",
                "authorization":`Bearer ${token}`
            }

            const response = await editUserDetails(userData.userId, formData, headers)
            if (response.status === 200) {
                // Show success message
                const successMessage = document.getElementById("success-message")
                successMessage.classList.remove("hidden")
                
                // Navigate after delay
                setTimeout(() => {
                    navigate("/profilepage")
                }, 1500)
            } else {
                alert("Failed to update profile. Please try again.")
            }
        } catch (error) {
            console.error("Error updating profile:", error)
            alert("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <><Navbar/>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex items-center">
                    <button 
                        onClick={() => navigate(-1)}
                        className="mr-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
                    >
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>
                </div>
                
                {/* Success Message */}
                <div id="success-message" className="hidden mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm">Profile updated successfully! Redirecting...</p>
                        </div>
                    </div>
                </div>
                
                {/* Form Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-500 to-gray-60 p-6 text-white">
                        <h2 className="text-xl font-semibold">Your Profile Information</h2>
                        <p className="text-blue-100">Update your personal details and preferences</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="flex flex-col md:flex-row gap-8 mb-8">
                            {/* Profile Photo Section */}
                            <div className="flex flex-col items-center">
                                <div className="relative mb-4">
                                    <div className="h-40 w-40 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">
                                        {previewImg ? (
                                            <img
                                                src={previewImg}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                                                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-blue-600 transition">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImage}
                                        />
                                    </label>
                                </div>
                                <p className="text-sm text-gray-500 text-center">Click the camera icon to upload a new photo</p>
                            </div>
                            
                            {/* Contact Information */}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                         Name
                                    </label>
                                    <input 
                                        type="text" 
                                        value={userData.name} 
                                        onChange={(e) => setUserData({ ...userData, name: e.target.value })} 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                        required 
                                    />
                                </div>
                                
                                
                                
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input 
                                        type="email" 
                                        value={userData.email} 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" 
                                        disabled 
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                                </div>
                                
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <input 
                                        type="password" 
                                        value={userData.password} 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" 
                                        disabled 
                                    />
                                    <p className="text-xs text-gray-500 mt-1">To change password, use reset option</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Additional Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address
                                </label>
                                <textarea 
                                    value={userData.address} 
                                    onChange={(e) => setUserData({ ...userData, address: e.target.value })} 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                    rows="3"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Contact Number
                                </label>
                                <input 
                                    type="text" 
                                    maxLength="10" 
                                    value={userData.contact} 
                                    onChange={(e) => setUserData({ ...userData, contact: e.target.value })} 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Location
                                </label>
                                <input 
                                    type="text" 
                                    value={userData.location} 
                                    onChange={(e) => setUserData({ ...userData, location: e.target.value })} 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                />
                            </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-4 justify-end pt-4 border-t border-gray-200">
                            <button 
                                type="button" 
                                onClick={() => navigate("/profilepage")}
                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving...
                                    </>
                                ) : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <Footer/>
        </>
        
    )
}

export default EditProfile