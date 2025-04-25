import { useEffect, useState } from "react";
import Footer from "../component/Footer"
import Navbar from "../component/Navbar"
import ProductCard from "../component/productCard"
import { getAllAds } from "../Apiservice/allApi";


const Home=()=>{
     const [adds, setAdds] = useState([]);
    
      useEffect(() => {
        const fetchAds = async () => {
          try {
            const res = await getAllAds();
            setAdds(res.data);
          } catch (err) {
            console.error('Error fetching ads:', err);
          }
        };
        fetchAds();
      }, []);
   
    return(
        <>
        <Navbar />
       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {adds.map((adds, index) => (
        <ProductCard key={index} adds={adds} />
      ))}
    </div>
               
          
        <Footer />
        </>
    )
}
export default Home