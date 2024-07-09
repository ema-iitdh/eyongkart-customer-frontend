import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Category from "../components/Category/Category";
import Category2 from "../components/Category/Category2";
import Banner from "../components/Banner/Banner";
import Products from "../components/Products/Products";
import Footer from "../components/Footer/Footer";

import raniphi from "../assets/Category/rani.png";
import pheichom from "../assets/Category/pheijom5.png";
import CarouselTraditional from "../components/Hero/CarouselTraditional";
import Offers from "../components/Offers/Offers";

const BannerData = {
  discount: "20% OFF",
  title: "Beauty",
  date: "1st May to 30th May",
  image: raniphi,
  title2: "Manipur Traditional",
  title3: "Attire Sales",
  title4: "Rani phi most rare design beauty",
  bgColor: "#f42c37",
};
const BannerData2 = {
  discount: "30% OFF",
  title: "Beauty",
  date: "1st May to 23rd May",
  image: pheichom,
  title2: "Manipur Traditional",
  title3: "Suit Sales",
  title4: "Pheichom Kurta suit most rare design beauty",
  bgColor: "#2dcc6f",
};

const HomePage = () => {
  return (
    <>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
        <Navbar />
        <CarouselTraditional />
        <Offers />
        <Category />
        <Category2 />
        <Banner data={BannerData} />
        <Products />

        <Banner data={BannerData2} />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
