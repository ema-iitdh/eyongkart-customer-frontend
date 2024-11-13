import React, { useEffect, useState } from "react";
import PricesSort from "./PricesSort";
import { RiArrowDropUpLine } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Axios } from "../../../api";
import { useQuery } from "@tanstack/react-query";
const getAllProduct = async () => {
  const res = await Axios({
    url: "/product/allproduct",
    method: "GET",
  });

  return res.data.products;
};
const Sort = () => {
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
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
  return (
    <>
      <div className="bg-white p-2 sm:min-h-[calc(100vh-120px)] border border-black ">
        {/* Category Section */}
        <div className="w-full md:w-auto  ">
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
                <label htmlFor={product._id} className="text-xs md:text-sm">
                  {product?.collection?.name}
                </label>
              </div>
            ))}
          </form>
        </div>

        <PricesSort />
      </div>
    </>
  );
};

export default Sort;
