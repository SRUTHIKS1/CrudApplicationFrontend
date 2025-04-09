

import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'

import Login from './pages/login'
import Home from './pages/home'
import ProductCard from './component/product'
import ProductDetails from './pages/productDetails'
import Register from './pages/register'
import ProtectedRoute from './provider/protectedroute'
import { Provider } from 'react-redux'
import { store } from './reduxtoolkit/store'
import Profile from './pages/profilepage'
import EditProfile from './pages/editprofile'

import Ads from './pages/ad'
import PostAd from './pages/category'



function App() {

  return (
    <>
   <BrowserRouter>
   <Provider store={store}>
   <Routes>
      <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />

        
        {/* <Route path="/home" element={<Home/>}/> */}
        <Route path="/productDetails" element={<ProductDetails/>}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profilepage" element={<Profile/>}/>
        <Route path="/editprofile" element={<EditProfile/>}/>
        <Route path="/category" element={<PostAd/>}/>
        <Route path="/ad" element={<Ads/>}/>
        

        
      </Routes>
</Provider>
      
    </BrowserRouter>
    </>
  )
}

export default App
