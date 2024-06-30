import React, { useState, useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import Button from "../Shared/Button";
import { GrFavorite } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ data }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(ShopContext);
  const [productData, setproductData] = useState();
  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
        {/* card section */}
        {data.map((data) => (
          <div className="group" key={data._id}>
            <div className="relative">
              <img
                onClick={() => {
                  // navigate("/shop")
                  navigate(`/product/${data._id}`);
                }}
                src={`http://drive.google.com/thumbnail?id=${data?.image_id[0]?.replace(
                  /"/g,
                  ""
                )}`}
                alt=""
                className="h-[190px] w-[260px] object-cover rounded-md"
              />
              {/* button hover */}
              {/* <div className="hidden gap-2 group-hover:flex flex-col absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-full w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200 rounded-md ">
                <Button
                  text={"Add to Cart"}
                  bgColor={"bg-primary"}
                  textColor={"text-white"}
                />
                <button
                  onClick={() => {
                    addToCart(productData._id);
                  }}
                  type="button"
                  className=" w-[100px] h-[50px] outline-none border-none bg-red-500 text-white text-[13px] text-center rounded-full cursor-pointer"
                >
                  ADD TO CART
                </button>
                <button
                  onClick={() => {
                    addToCart(productData._id);
                  }}
                  type="button"
                  className=" w-[100px] h-[50px] outline-none border-none bg-red-500 text-white text-[13px] text-center rounded-full cursor-pointer"
                >
                  ADD TO WISHLIST
                </button>
              </div> */}
            </div>
            <div className="flex justify-between  leading-7">
              <div>
                <h2 className="font-semibold">{data.name}</h2>
                <h2 className="font-bold">₹ {data.price}</h2>
              </div>

              <button type="button" className="relative p-3">
                <GrFavorite className="text-xl text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
