import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import ChatBox from "../Chat/ChatBox";
import Footer from "../Footer/Footer";
import { Axios } from "../../../api";
import { FaHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { CloudinaryConfig } from "../../../Cloudinary";
import { ScrollArea } from "@mantine/core";
import { RiArrowDropUpLine } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import PricesSort from "./PricesSort";
const getAllProduct = async () => {
  const res = await Axios({
    url: "/product/allproduct",
    method: "GET",
  });
  return res.data.products;
};

const CategorySort = () => {
  // const queryClient = useQueryClient();
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const [isPricesOpen, setIsPricesOpen] = useState(false);
  const [isSortByOpen, setIsSortByOpen] = useState(false);
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categorysort"],
    queryFn: getAllProduct,
  });

  //   if (isLoading) {
  //     return <div>Loading products...</div>;
  //   }

  //   if (isError) {
  //     return <div>Failed to fetch products. Please try again later.</div>;
  //   }
  // useEffect(() => {
  //   return () => {
  //     queryClient.invalidateQueries(["products"]); // Invalidate cache on component unmount
  //   };
  // }, [queryClient]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden ">
      <Navbar />
      <div className="pt-16 ">
        <div className="overflow-hidden min-h-[550px] sm:min-h-[650px] hero-bg-color pb-5 gap-10 flex justify-start">
          <div className=" mr-[30px] sm:p-2 pl-8 mt-4 ">
            Filter
            <div className="lg:grid grid-cols-[250px,1fr] gap-3">
              {/* left */}
              <div className="bg-white p-2 sm:min-h-[calc(100vh-120px)] ">
                {/* Category Section */}
                <div className="w-full md:w-auto">
                  <div className="flex items-center justify-between md:justify-start">
                    <h3 className="sm:text-lg text-[13px] uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
                      Collection
                    </h3>

                    <button
                      type="button"
                      className="md:hidden text-slate-500"
                      onClick={() => setIsCollectionOpen(!isCollectionOpen)}
                      aria-label="Toggle Collection Dropdown"
                    >
                      {isCollectionOpen ? (
                        <RiArrowDropUpLine />
                      ) : (
                        <RiArrowDropDownLine />
                      )}
                    </button>
                  </div>
                  <form
                    className={`text-sm flex flex-col gap-2 py-2 ${
                      isCollectionOpen ? "block" : "hidden"
                    } md:block`}
                  >
                    {products?.map((product) => (
                      <div
                        key={product._id}
                        className="flex items-center gap-3 p-2 md:p-0"
                      >
                        <input
                          type="checkbox"
                          name="collection"
                          id={product._id}
                          className="w-4 h-4"
                        />
                        <label
                          htmlFor={product._id}
                          className="text-xs md:text-sm"
                        >
                          {product?.collection?.name}
                        </label>
                      </div>
                    ))}
                  </form>
                </div>

                <PricesSort />
                {/* Sort By Section */}
                {/* <div className="w-full md:w-auto mt-4">
                  <div className="flex items-center justify-between md:justify-start">
                    <h3 className="sm:text-lg text-[13px] uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
                      Sort By
                    </h3>

                    <button
                      type="button"
                      className="md:hidden text-slate-500"
                      onClick={() => setIsSortByOpen(!isSortByOpen)}
                      aria-label="Toggle Sort By Dropdown"
                    >
                      {isSortByOpen ? (
                        <RiArrowDropUpLine />
                      ) : (
                        <RiArrowDropDownLine />
                      )}
                    </button>
                  </div>

                  <form
                    className={`text-sm flex flex-col gap-2 py-2 ${
                      isSortByOpen ? "block" : "hidden"
                    } md:block`}
                  >
                    <div className="flex items-center gap-3">
                      <input type="radio" name="sortBy" id="lowToHigh" />
                      <label className="text-xs md:text-sm" htmlFor="lowToHigh">
                        Price - Low to High
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="sortBy" id="highToLow" />
                      <label className="text-xs md:text-sm" htmlFor="highToLow">
                        Price - High to Low
                      </label>
                    </div>
                  </form>
                </div> */}
              </div>

              {/* right */}
              <ScrollArea h={580} type="never">
                <div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:pl-4 mt-2">
                    {products?.map((p) => (
                      <div className="group " key={p._id}>
                        <div className="relative ">
                          <img
                            onClick={() => navigate(`/product/${p._id}`)}
                            src={`${
                              CloudinaryConfig.CLOUDINARY_URL
                            }/image/upload/${p?.image_id[0]?.replace(
                              /"/g,
                              ""
                            )}`}
                            alt=""
                            className="sm:h-[190px] sm:w-[250px] w-[150px] h-[170px] object-fit rounded-md "
                          />
                        </div>
                        <div className="flex justify-between leading-6">
                          <div>
                            <h2 className="sm:font-semibold text-[15px]">
                              {p.name}
                            </h2>
                            <h3 className=" gap-3">
                              <span className="ml-1 text-red-600  text-[12px] sm:text-[15px]">
                                ₹{p.discountedPrice}
                              </span>
                              <span className=" pl-2 line-through sm:text-[15px] text-[12px]">
                                ₹{p.price}
                              </span>
                            </h3>
                            <span className=" text-gray-500 text-[10px] sm:text-[14px] ml-1 ">
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
