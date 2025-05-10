import { useState } from "react";
import { login } from "../Apiservice/allApi";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateIsLoggedIn } from "../reduxtoolkit/slice";

const Login = () => {
  const [formData, setFormData] = useState({ 
    email: "", 
    password: "" 
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email format is invalid";
    }
    
    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Notification function
  const notify = (type, message) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await login({ 
        email: formData.email.trim(), 
        password: formData.password.trim() 
      });
      
      if (result.status === 200) {
        notify("success", "Successfully logged in!");

        // Store user data and token in localStorage
        const { userId, name, email } = result.data.userDetails;
        localStorage.setItem("userCredential", JSON.stringify({ userId, name, email }));
        localStorage.setItem("token", result.data.token);

        // Update Redux store to indicate user is logged in
        dispatch(updateIsLoggedIn(true));

        // Redirect to home page
        navigate("/home");
      } else {
        notify("error", "Login failed. Please check your credentials.");
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Something went wrong. Please try again.";
      notify("error", errorMessage);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transition-all duration-300 hover:shadow-xl">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="text-5xl font-bold text-[#00A49F] transition-transform duration-300 hover:scale-105 cursor-pointer" onClick={() => navigate("/")}>OLX</div>
          <h2 className="mt-2 text-xl font-semibold text-gray-800">
            Sign in to your account
          </h2>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition-colors duration-200`}
              placeholder="example@olx.com"
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition-colors duration-200`}
              placeholder="••••••••"
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <p id="password-error" className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}

            {/* Forgot Password Link */}
            <div className="flex justify-between mt-2">
              <button
                type="button"
                onClick={() => navigate("/forgotPassword")}
                className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-200"
              >
                Forgot password?
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-md font-semibold text-white transition-colors duration-200 ${
              isLoading ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : "Login"}
          </button>

          {/* Sign Up Link */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium transition-colors duration-200"
              >
                Sign up
              </button>
            </p>
          </div>
        </form>
      </div>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Login;