import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Login from './pages/login';
import Home from './pages/home';
import ProductDetails from './pages/productDetails';
import Register from './pages/register';
import ProtectedRoute from './provider/protectedroute';
import { Provider } from 'react-redux';
import { store } from './reduxtoolkit/store';
import Profile from './pages/profilepage';
import EditProfile from './pages/editprofile';
import Ads from './pages/ad';
import Category from './pages/category';
import EditProduct from './pages/editProduct';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';
import AllAd from './pages/alladds';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>

          {/* Redirect root to /login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/productDetails" element={<ProductDetails />} />

          {/* Protected Routes */}
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />

          <Route path="/profilepage" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          <Route path="/editprofile" element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          } />

          <Route path="/category" element={
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          } />

          <Route path="/ad" element={
            <ProtectedRoute>
              <Ads />
            </ProtectedRoute>
          } />

          <Route path="/editProduct/:adId" element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          } />

          <Route path="/alladds" element={
            <ProtectedRoute>
              <AllAd />
            </ProtectedRoute>
          } />

        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
