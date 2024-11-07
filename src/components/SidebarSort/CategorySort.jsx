import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { CloudinaryConfig } from "../../../Cloudinary";
import { ScrollArea } from "@mantine/core";
import { useParams } from "react-router-dom";
import Sort from "./Sort";
import Navbar from "../Navbar/Navbar";
import ChatBox from "../Chat/ChatBox";
import Footer from "../Footer/Footer";
import { Axios } from "../../../api";

const getAllProduct = async () => {
  const res = await Axios({
    url: "/product/allproduct",
    method: "GET",
  });
  return res.data.products;
};

const CategorySort = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categorysort"],
    queryFn: getAllProduct,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  //filter
  const productDetails = products?.filter(
    (product) => product.category._id === categoryId
  );
  // console.log("gg", productDetails);

  const handleNavigate = (productId) => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/product/${productId}`);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
      <Navbar />
      <div className="pt-16 ">
        <div className="overflow-hidden min-h-[550px] sm:min-h-[650px] hero-bg-color pb-5 gap-10 flex justify-start">
          <div className="mr-[30px] sm:p-2 pl-8 mt-4">
            <div className="lg:grid grid-cols-[250px,1fr] gap-3">
              {/* Left */}
              <Sort />

              {/* Right */}
              <ScrollArea h={580} type="never">
                <div>
                  {(productDetails || []).length === 0 ? (
                    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
                      <div className="flex flex-col items-center bg-white border border-gray-300 rounded-lg p-6 sm:p-8 shadow-lg w-full max-w-sm sm:max-w-md text-center">
                        <img
                          src="/Product-is-Empty.png"
                          alt="No products found"
                          className="w-20 h-20 sm:w-24 sm:h-24 mb-4"
                        />
                        <p className="text-gray-800 font-semibold text-lg sm:text-xl mb-2">
                          No Products Available
                        </p>
                        <p className="text-gray-500 text-sm sm:text-base mb-4">
                          We're sorry, but there are no products to display
                          here. Try searching with different products.
                        </p>
                        <Link
                          to="/"
                          className="mt-4 px-4 py-2 bg-red-400 text-white text-sm font-medium rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                          Browse Categories
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:pl-4 mt-2">
                      {productDetails?.map((p) => (
                        <div className="group" key={p._id}>
                          <div className="relative">
                            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                            <div
                              onClick={() => handleNavigate(p._id)}
                              className="cursor-pointer"
                            >
                              <img
                                src={`${
                                  CloudinaryConfig.CLOUDINARY_URL
                                }/image/upload/${p?.image_id[0]?.replace(
                                  /"/g,
                                  ""
                                )}`}
                                alt=""
                                className="sm:h-[190px] sm:w-[250px] w-[150px] h-[170px] object-fit rounded-md"
                              />
                              {loading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                                  <span className="loader"></span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-between leading-6">
                            <div>
                              <h2 className="sm:font-semibold text-[15px]">
                                {p.name}
                              </h2>
                              <h3 className="gap-3">
                                <span className="ml-1 text-red-600 text-[12px] sm:text-[15px]">
                                  ₹{p.discountedPrice}
                                </span>
                                <span className="pl-2 line-through sm:text-[15px] text-[12px]">
                                  ₹{p.price}
                                </span>
                              </h3>
                              <span className="text-gray-500 text-[10px] sm:text-[14px] ml-1">
                                ({p.discount} % OFF)
                              </span>
                            </div>
                            <button type="button" className="relative p-3">
                              <FaHeart
                                className={
                                  p.fav === "Yes"
                                    ? "text-red-600"
                                    : "text-gray-400"
                                }
                                onClick={(e) => handleIsWishlist(e, p)}
                              />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
        <ChatBox />
      </div>
      <Footer />
    </div>
  );
};

export default CategorySort;
