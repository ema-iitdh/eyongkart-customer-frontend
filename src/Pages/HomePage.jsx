import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Banner from "../components/Banner/Banner";
import Products from "../components/Products/Products";
import Footer from "../components/Footer/Footer";
import CarouselTraditional from "../components/Hero/CarouselTraditional";
import PriceStores from "../components/Pricestores/PriceStores";
import TopSales from "../components/Topsales/TopSales";
import ChatBox from "../components/Chat/ChatBox";
import Category from "../components/Category/Category";

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
