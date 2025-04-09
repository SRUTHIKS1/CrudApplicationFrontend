import Footer from "../component/footer";
import Navbar from "../component/navbar";
import ProductCard from "../component/product";

const Home=(props)=>{
    return(
        <div>
          <Navbar/> 
          <ProductCard/>
          <Footer/>  
        </div>
    )
}
export default Home;