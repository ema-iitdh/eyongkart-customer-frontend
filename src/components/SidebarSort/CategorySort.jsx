import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { CloudinaryConfig } from "../../../Cloudinary";
import { Rating, ScrollArea, Skeleton } from "@mantine/core";
import { useParams } from "react-router-dom";
import Sort from "./Sort";
import Navbar from "../Navbar/Navbar";
import ChatBox from "../Chat/ChatBox";
import Footer from "../Footer/Footer";

import { fetchProducts } from "../../BaseURL/Product";

const CategorySort = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categoryproductsort"],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const productsArray = products?.products || [];

  const productDetails = productsArray?.filter(
    (product) => product.category._id === categoryId
  );

  const handleNavigate = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
      <Navbar />
      <div className="pt-16">
        <div className="overflow-hidden min-h-[550px] sm:min-h-[650px] pb-5 gap-10 flex justify-start">
          <div className="mr-[30px] sm:p-2 pl-8 mt-4">
            <div className="lg:grid grid-cols-[250px,1fr] gap-3">
              <Sort />

              <ScrollArea h={580} type="never">
                <div>
                  {isLoading ? (
                    <div className="grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:pl-2 pt-3">
                      {[...Array(8)].map((_, index) => (
                        <Skeleton
                          key={index}
                          height={200}
                          width="100%"
                          radius="md"
                          className="sm:h-[230px] sm:w-[250px] w-[160px] h-[170px] bg-gray-200 mb-4"
                        />
                      ))}
                    </div>
                  ) : productDetails && productDetails.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:pl-2 pt-3">
                      {productDetails?.map((p) => (
                        <div
                          className="group shadow-md hover:shadow-lg border border-gray-400 sm:p-3 p-2 rounded-md"
                          key={p._id}
                        >
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
                                alt="Product"
                                className="sm:h-[190px] sm:w-[250px] w-[150px] h-[170px] object-fit rounded-md"
                              />
                              <button
                                type="button"
                                className="absolute top-2 right-2 bg-slate-50 p-[5px] sm:p-[8px] rounded-full"
                              >
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
                          <div className="w-full flex justify-between sm:p-2 mt-2">
                            <div className="sm:text-[16px] text-[12px] text-black">
                              <p>{p.name}</p>
                              <div className="flex items-center gap-3 py-2">
                                <Rating
                                  value={p?.averageRating}
                                  fractions={2}
                                />
                                <span className="text-orange-500 sm:text-sm text-[10px]">
                                  ({p?.totalReviews})
                                </span>
                              </div>
                              <div className="flex w-full  ">
                                <p className="text-[13px] sm:text-[15px]  pr-2 line-through opacity-65">
                                  ₹{p.price}
                                </p>
                                <p className="text-red-500 pr-1 sm:text-[16px] text-[14px]">
                                  ₹{p.discountedPrice}
                                </p>
                                <p className="text-emerald-500 sm:text-[13px] text-[11px]">
                                  ({p.discount} % OFF)
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full min-h-[calc(100vh-200px)] sm:p-36 sm:pt-10 pb-20">
                      <div className="flex flex-col items-center bg-white border border-gray-300 rounded-lg p-6 sm:p-8 shadow-lg w-full max-w-3xl text-center">
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
