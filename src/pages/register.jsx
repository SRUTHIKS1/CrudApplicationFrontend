import { useState } from "react"
import { register } from "../Apiservice/allApi"
import { toast, ToastContainer } from "react-toastify"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const navigate = useNavigate()
  const [studentDetails, setStudentDetails] = useState(
    {

      name: "",
      email: "",
      password: "",

    }
  )
  const successNotification = () => toast("Successfully Registered!", {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",

  });
  const errorNotification = () => toast("Registration was failed!");

  const handleSubmit = async (e) => {
    e.preventDefault()
    // if(studentDetails.name=== ''||studentDetails.email=== ''||studentDetails.password==='')
    // {
    //   alert("fill out the field")
    //   return
    // }
    try {
      const result = await register(studentDetails)
      console.log(result.status)
      if (result.status === 201) {
        successNotification()
        navigate("/login")
      } else {
        errorNotification()
      }

    } catch (error) {
      return error

    }
    alert(`name:${studentDetails.name}\n email:${studentDetails.email}\n password:${studentDetails.password}`)
  }
  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <form className="bg-white p-6 rounded-lg shadow-lg w-96" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Name</label>
            <input onChange={(e) => setStudentDetails({ ...studentDetails, name: e.target.value })}
              type="text"
              name="name"

              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Email</label>
            <input onChange={(e) => setStudentDetails({ ...studentDetails, email: e.target.value })}
              type="email"
              name="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Password</label>
            <input onChange={(e) => setStudentDetails({ ...studentDetails, password: e.target.value })}
              type="password"
              name="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>



          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />

    </div>
  )
}
export default Register