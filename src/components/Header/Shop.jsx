import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ShopCategory from "../../Pages/ShopCategory";
import { FaSearch } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import { Axios } from "../../../api";

const Shop = () => {
  const [products, setproducts] = useState();
  const [newproducts, setNewproducts] = useState();
  const [searchProduct, setSearchProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        url: "/product/allproduct",
        method: "GET",
      });
      // console.log(res.data.products);
      setproducts(res.data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    setSearchProduct(e.target.value);
    let searchProductnew = products.filter((i) =>
      i.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setNewproducts(searchProductnew);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  console.log(searchProduct);
  console.log(newproducts);
  return (
    <>
      <div className="bg-white  dark:bg-gray-900 dark:text-white duration-200 overflow-hidden pt-24">
        <Navbar />
        {/* <div className=" mt-4 mb-1 text-2xl overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex  items-center flex-col pt-8 gap-y-3.5"> */}

        <div className="flex justify-end items-center">
          {/* Search bar section */}
          <div className="relative group hidden sm:block">
            <input
              type="text"
              placeholder="Search"
              className="search-bar text-xl"
              onChange={handleOnChange}
            />
            <FaSearch className="text-xl text-gray-600 group-hover:text-primary dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 duration-200" />
          </div>
        </div>
        {searchProduct ? (
          <ShopCategory
            products={newproducts}
            isSearch={searchProduct}
            isLoading={loading}
          />
        ) : (
          <ShopCategory
            products={products}
            isSearch={searchProduct}
            isLoading={loading}
          />
        )}
      </div>
      {/* </div> */}
      {/* <Footer /> */}
      {/* </div> */}
    </>
  );
};

export default Shop;
