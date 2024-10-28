import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Banner from "../components/Banner/Banner";
import Products from "../components/Products/Products";
import Footer from "../components/Footer/Footer";

import raniphi from "../assets/Category/rani.png";

import CarouselTraditional from "../components/Hero/CarouselTraditional";

import Productcomponents from "../components/Productscomponents/Productcomponents";
import PriceStores from "../components/Pricestores/PriceStores";
import TopSales from "../components/Topsales/TopSales";
import ChatBox from "../components/Chat/ChatBox";
import Category from "../components/Category/Category";

// const BannerData = {
//   discount: "50% OFF",
//   title: "Beauty",
//   date: "1st July to 30th July",
//   image: raniphi,
//   title2: "Manipur Traditional",
//   title3: "Attire Sales",
//   title4: "Rani phi full most rare design ",
//   bgColor: "#f42c37",
// };

const HomePage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
        <Navbar />
        <Category />
        <CarouselTraditional />
        {/* <Productcomponents /> */}
        <TopSales />

        <PriceStores />
        <Banner />
        <Products />
        <ChatBox />

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
