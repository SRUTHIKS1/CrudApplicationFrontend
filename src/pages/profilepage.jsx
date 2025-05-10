import { useEffect, useState } from "react"
import { getUserAds, getUserDetails } from "../Apiservice/allApi"
import { useNavigate } from "react-router-dom"
import ProductCard from "../component/ProductCard"

const Profile = () => {
    const [adds, setAdds] = useState([])
    const [user, setUser] = useState()
    const [img, setImg] = useState()
    const [previwimg, setPreviwimg] = useState()
    const navigate = useNavigate();

    const adData = async () => {
        console.log("adData function called");
        const userData = JSON.parse(localStorage.getItem("userCredential"));
        if (userData && userData.userId) {
            const result = await getUserAds(userData.userId);
            setAdds(result.data?.data)
            console.log(result)
        }
    }


    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userCredential"))
        const userid = userData.userId
        // console.log(userData.userId)
        const get = async () => {
            const usrD = await getUserDetails(userid)
            console.log(usrD?.data?.data)
            setUser(usrD?.data?.data)
            setImg(usrD?.data?.data?.Image)


        }
        get()
        adData()


    }, [])
    useEffect(() => {
        console.log(typeof adds)
        console.log(adds)
    }, [adds])



    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-200 to-indigo-300 p-6">
          {/* Profile Section */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-center md:items-start">
              <div className="flex flex-col items-center md:items-start md:w-1/3">
                <div className="relative h-32 w-32 mb-4">
                  <img
                    src={img ? `http://localhost:3000${img}` : ""}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover"
                  />
                </div>
                <div className="text-center md:text-left">
                  <p className="text-2xl font-bold text-gray-800">{user?.name || "User Name"}</p>
                  <p className="text-gray-600">{user?.email || "Email"}</p>
    
                  <button
                    className="mt-4 w-full bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition"
                    onClick={() => navigate("/editprofile", { state: { user } })}
                  >
                    Edit Profile
                  </button>
    
                  <button
                    className="mt-3 w-full bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-teal-600 transition"
                    onClick={() => navigate("/category")}
                  >
                    Start Selling 🚀
                  </button>
                </div>
              </div>
    
              {/* Ads Section */}
              <div className="mt-8 md:mt-0 md:ml-8 flex-1">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">My Ads</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {adds?.length > 0 ? (
                    adds.map((ad, index) => (
                      <ProductCard key={index} adds={ad} />
                    ))
                  ) : (
                    <p className="text-gray-500">You have no ads yet. Start selling!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default Profile;