import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import instance from "../../../api";
import ShopCategory from "../../Pages/ShopCategory";

const Shop = () => {
  const [products, setproducts] = useState();
  const fetchProducts = async () => {
    try {
      const res = await instance({
        url: "/product/allproduct",
        method: "GET",
      });
      console.log(res.data.products);
      setproducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden pt-16">
        <Navbar />
        <div className="container text-2xl overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex  items-center flex-col pt-8 gap-y-3.5">
          <div className="container">
            <ShopCategory products={products} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Shop;
