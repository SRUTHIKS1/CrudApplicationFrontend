import { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Navbar from "../component/navbar";
import AllAd from "./alladds";

const Home = () => {
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    console.log("Search Result updated:", searchResult);
  }, [searchResult]);

  return (
    <>
      <Navbar setSearchResult={setSearchResult} />

      <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-16">
        

        <AllAd searchResult={searchResult} />
      </div>

      <Footer />
    </>
  );
};

export default Home;
