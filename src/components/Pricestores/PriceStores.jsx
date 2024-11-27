import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CloudinaryConfig } from "../../../Cloudinary";
import { fetchProducts } from "../../BaseURL/Product";
import { Link, useNavigate } from "react-router-dom";

const PriceStores = () => {
  const navigate = useNavigate();
  const [filterItems, setFilterItems] = useState([]);

  const {
    data: productData = {},
    isLoading: isLoadingProducts,
    isError: isProductError,
    error: productError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const productLists = productData.products || [];

  const filteredProducts = () => {
    return productLists.filter((product) => product.discountedPrice <= 2000);
  };

  useEffect(() => {
    const filtered = filteredProducts();
    // Sort products by discountedPrice in ascending order
    const sorted = filtered.sort(
      (a, b) => a.discountedPrice - b.discountedPrice
    );
    setFilterItems(sorted);
  }, [productLists]);

  return (
    <div className="p-2 drop-shadow-md">
      <div className="overflow-hidden rounded-xl sm:h-[450px] h-[330px] ">
        <h1 className="gap-4 flex justify-start items-start text-base sm:text-xl font-semibold text-black  p-2">
          Product price below
          <p className="text-[20px] sm:text-[25px] text-red-500">₹2000 </p>
        </h1>
        <div className="overflow-x-scroll scrollbar-hide flex space-x-4 pb-3 scroll-smooth">
          <div className="flex sm:gap-5 gap-4 p-2">
            {filterItems?.map((item) => {
              return (
                <div
                  key={item._id}
                  className="bg-gray-100 drop-shadow-md sm:h-[340px] sm:w-[250px] h-[240px] w-[180px] rounded-lg flex flex-col items-center "
                >
                  <div className="">
                    {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                    <img
                      onClick={() => navigate(`/product/${item._id}`)}
                      className="sm:w-52 sm:h-56 w-[150px] h-[160px] object-fit m-auto p-3"
                      src={`${
                        CloudinaryConfig.CLOUDINARY_URL
                      }/image/upload/${item?.image_id[0]?.replace(/"/g, "")}`}
                      alt=""
                    />
                  </div>
                  <div className="flex justify-between sm:p-1 p-1 gap-1 sm:gap-2 sm:pl-4 pl-3 sm:pr-3 w-full">
                    <div className="sm:text-[16px] text-[11px] text-black">
                      <p className="">{item.name}</p>
                      <div className="flex items-center">
                        <p className="text-[13px] sm:text-[15px] pr-2 line-through opacity-65">
                          ₹{item.price}
                        </p>
                        <p className="text-red-500 pr-1 sm:text-[16px] text-[14px]">
                          ₹{item.discountedPrice}
                        </p>
                      </div>
                      <p className="text-emerald-500 sm:text-[13px] text-[11px]">
                        ({item.discount} % OFF)
                      </p>
                    </div>
                    <button
                      onClick={() => navigate(`/product/${item._id}`)}
                      type="button"
                      className="bg-red-600 hover:bg-red-500 sm:text-[16px] text-[10px] text-center pt-[3px] sm:w-[80px] sm:h-[38px] w-[45px] h-6 text-white rounded-md"
                    >
                      View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceStores;
