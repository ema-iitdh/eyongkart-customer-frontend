import React, { useEffect, useState } from "react";
import { ScrollArea, Box } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { CloudinaryConfig } from "../../../Cloudinary";
import { fetchProducts } from "../../BaseURL/Product";
import { Link } from "react-router-dom";

const PriceStores = () => {
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
    setFilterItems(filteredProducts());
  }, [productLists]);

  return (
    <div className="p-2 drop-shadow-md">
      <div className="overflow-hidden rounded-xl sm:h-[400px] h-[350px] hero-bg-color">
        <h1 className="gap-4 flex justify-start items-start text-xl font-semibold  text-black hover:text-red-500 dark:text-white p-2 ">
          Product price below
          <p className="text-[16px] text-red-500">₹2000 </p>
        </h1>
        <ScrollArea type="never">
          <Box>
            <div className="flex flex-grow gap-2 p-5">
              {filterItems?.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="bg-gray-100 drop-shadow-md sm:h-[320px] sm:w-[250px] h-[270px] w-[180px] rounded-lg flex flex-col items-center justify-center"
                  >
                    <div className="">
                      <img
                        className="sm:w-52 sm:h-56 w-[150px] h-[150px] object-fit m-auto p-3"
                        src={`${
                          CloudinaryConfig.CLOUDINARY_URL
                        }/image/upload/${item?.image_id[0]?.replace(/"/g, "")}`}
                        alt=""
                      />
                    </div>
                    <div className="flex justify-around sm:p-2 p-2">
                      <div className="sm:text-[16px] text-[11px] text-black">
                        <p className="">{item.name}</p>
                        <div className="flex">
                          <p className="text-black pr-1 line-through ">
                            ₹{item.price}{" "}
                          </p>
                          <p className="text-red-500 pr-1 ">
                            ₹{item.discountedPrice}
                          </p>
                        </div>
                        <p className="text-gray-400 text-[10px] ">
                          ({item.discount} % OFF)
                        </p>
                      </div>
                      <Link
                        to="/checkout"
                        type="button"
                        className="bg-red-600 hover:bg-red-500 sm:text-[14px] text-[8px] text-center pt-[6px] sm:w-[80px] sm:h-[38px] w-[65px] mt-1 h-6 text-white rounded-md"
                      >
                        Buy now
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </Box>
        </ScrollArea>
      </div>
    </div>
  );
};

export default PriceStores;
