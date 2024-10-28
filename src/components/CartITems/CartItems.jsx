import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { TiDeleteOutline } from "react-icons/ti";
import { ShopContext } from "../Context/ShopContext";
import { Radio, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { CloudinaryConfig } from "../../../Cloudinary";

const CartsItems = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const {
    getTotalCartAmount,
    data,
    cartItems,
    substractQuantity,
    addToCart,
    removeFromCart,
    buyFromCart,
  } = useContext(ShopContext);
  const navigate = useNavigate();

  const [razorpaytick, setrazorpaytick] = useState(false);
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const getTotal = () => {
    let total = 0;
    if (cartItems?.length) {
      cartItems.map((i) => {
        total = total + i.discountedPrice * i.quantity;
      });
    }
    return total;
  };
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden ">
      <Navbar />

      <div className=" text-xl overflow-hidden min-h-[550px] sm:min-h-[650px] hero-bg-color flex flex-col pt-8 gap-y-3.5 ">
        <table className=" min-w-full  text-center dark:text-white text-black text-[13px] sm:text-[20px]">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800 gap-2">
              <th className="p-1 sm:p-2">Products</th>
              <th className="p-1 sm:p-2">Title</th>
              <th className="p-1 pl-4 pr-2 sm:p-2">Price</th>
              <th className="p-1 sm:p-2">Quantity</th>
              <th className="p-1 pl-4 pr-3 sm:p-2">SubTotal</th>
              <th className="p-1 sm:p-2">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr
                key={index}
                className="bg-white border border-black  dark:bg-gray-900"
              >
                <td className="sm:p-2 p-1 ">
                  <img
                    className="h-[50px] sm:h-[120px] w-[50px] sm:w-[200px] object-contain"
                    src={`${
                      CloudinaryConfig.CLOUDINARY_URL
                    }/image/upload/${item?.image_id[0]?.replace(/"/g, "")}`}
                    alt="image1"
                  />
                </td>
                <td className="sm:p-2 p-1 text-[14px] sm:text-[16px] ">
                  {item.name}
                </td>
                <td className="sm:p-2 p-1 text-[14px] sm:text-[16px]">
                  ₹ {item.discountedPrice}
                </td>
                <td className="sm:p-2 p-1 text-[16px]  text-center   ">
                  <div className="flex gap-0 sm:gap-4 justify-center items-center">
                    <button
                      type="button"
                      onClick={() => substractQuantity(item._id)}
                      className="hover:bg-gray-200 px-2 sm:px-4 "
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      type="button"
                      onClick={() => addToCart(item._id)}
                      className="hover:bg-gray-200 px-2 sm:px-4"
                    >
                      +
                    </button>
                  </div>
                </td>

                <td className="p-2 text-[14px] sm:text-[16px] ">
                  ₹ {item.discountedPrice * item.quantity}
                </td>
                <td className="p-2 text-[16px]">
                  <button type="button" className="text-red-500">
                    <TiDeleteOutline
                      size={26}
                      onClick={() => {
                        removeFromCart(item._id);
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr className="h-[1px] bg-white border-none" />
      </div>

      <div className="sm:flex mt-[50px] text-[18px] pl-32 gap-8 items-start sm:justify-center ">
        <div className="flex w-4/5 sm:w-2/4 flex-col border border-black dark:border-white rounded-3xl p-4 justify-between  gap-10 mb-[100px]">
          <h1> Cart Totals</h1>
          <div>
            <div className=" flex justify-between pt[-15px]">
              <p>Subtotals</p>
              <p>₹ {getTotal()}</p>
            </div>
            <hr className="h-[1px] bg-white border-none" />
            <div className="flex justify-between">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr className="h-[1px] bg-white border-none" />
            <div className="flex justify-between pt[-15px]">
              <h3>Totals</h3>
              <h3>₹ {getTotal()}</h3>
            </div>
          </div>
          <div className="w-full h-fit flex justify-center">
            <button
              type="button"
              className="w-[250px] h-[50px] outline-none border-none px-3 bg-red-500 text-white text-[16px]
            cursor-pointer rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                navigate("/checkout");
              }}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
        {/* <div className="flex flex-1 flex-col text-[16px] ">
          <p className="text-gray-400">If you have promocode,Enter here</p>
          <div className=" flex w-[300px] mt-3 pl-5 h-[50px] bg-gray-200 dark:bg-gray-200 ">
            <input
              className="border-none outline-none bg-transparent text-[16px] w-[330px] h-[50px] text-black"
              type="text"
              name=""
              placeholder="promocode"
            />
            <button
              type="button"
              className="w-[150px] h-[50px] text-[16px] bg-red-500 text-white cursor-pointer"
            >
              SUBMIT
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CartsItems;
