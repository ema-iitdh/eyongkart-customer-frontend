import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
const AboutUs = () => {
  return (
    <>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden pt-16">
        <Navbar />
        <div className="container text-2xl overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex  items-center flex-col pt-8 gap-y-3.5">
          <h1 className=" flex justify-center pt-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white">
            About Us
          </h1>
          <div className=" container flex flex-col  gap-3 mt-5 ">
            <p>LS Handloom shopping - Imphal,Manipur</p>
            <p>
              Manipur online handloom shopping,delivering Manipur products
              across the cities.
            </p>
            <p>
              LS Handloom is an online shopping platform offering a variety of
              manipur products.Handloom products like rani phi, wangkhei phi,
              phanek mayek naibi,pheichom kurta ,muka phi,khudei etc.
            </p>
          </div>
        </div>
      </div>
      <Footer />
      {/* </div> */}
    </>
  );
};

export default AboutUs;
