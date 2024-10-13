import React, { useContext, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { TiDeleteOutline } from "react-icons/ti";
import { ShopContext } from "../Context/ShopContext";
import { Radio, Group } from "@mantine/core";
import instance from "../../../api";
import { useNavigate } from "react-router-dom";
import ChatBox from "../Chat/ChatBox";

const MyOrder = () => {
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
        total = total + i.new_price * i.quantity;
      });
    }
    return total;
  };
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden ">
      <Navbar />

      <div className=" text-xl overflow-hidden min-h-[550px] sm:min-h-[650px] hero-bg-color flex flex-col pt-24 gap-y-3.5 ">
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
                    src={`http://drive.google.com/thumbnail?id=${item?.image_id[0]?.replace(
                      /"/g,
                      ""
                    )}`}
                    alt="image1"
                  />
                </td>
                <td className="sm:p-2 p-1 text-[14px] sm:text-[16px] ">
                  {item.name}
                </td>
                <td className="sm:p-2 p-1 text-[14px] sm:text-[16px]">
                  ₹ {item.new_price}
                </td>
                <td className="sm:p-2 p-1 text-[16px]  text-center   ">
                  <div className="flex gap-0 sm:gap-4 justify-center items-center">
                    {/* <button
                      type="button"
                      onClick={() => substractQuantity(item._id)}
                      className="hover:bg-gray-200 px-2 sm:px-4 "
                    >
                      -
                    </button> */}
                    {item.quantity}
                    {/* <button
                      type="button"
                      onClick={() => addToCart(item._id)}
                      className="hover:bg-gray-200 px-2 sm:px-4"
                    >
                      +
                    </button> */}
                  </div>
                </td>

                <td className="p-2 text-[14px] sm:text-[16px] ">
                  ₹ {item.new_price * item.quantity}
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
      <ChatBox />
      <Footer />
    </div>
  );
};

export default MyOrder;
