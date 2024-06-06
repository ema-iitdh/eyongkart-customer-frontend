import React, { useContext } from "react";
import Navbar from "../Navbar/Navbar";

import { ShopContext } from "../Context/ShopContext";
const CartsItems = () => {
  const { all_product, cartItems, removeFromCarts } = useContext(ShopContext);
  return (
    <>
      <div className="bg-gray dark:bg-gray-900 dark:text-white duration-200 overflow-hidden gap-14 ">
        <Navbar />
        <div className="container text-2xl overflow-hidden  min-h-[550px] sm:min-h-[650px] hero-bg-color flex  items-start  pt-8 gap-y-3.5 rounded-xl">
          <div className="dark:text-white grid grid-cols-6 items-center gap-16  text-black text-[20px] w-[100%] rounded-xl ">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>SubTotal</p>
            <p>Remove</p>
          </div>
          <hr className="h-[3px] bg-white border-none" />
        </div>

        {all_product.map((e) => {
          if (cartItems[e.id] > 0) {
            return (
              <div>
                <div className="text-blue-400">
                  <img src={e.img} alt="" />
                  <p>{e.title}</p>
                  <p>{e.price}</p>
                  <button type="button">{cartItems[e.id]}</button>
                  <p>{e.price}</p>
                  <img src={e.img} alt="" />
                </div>
              </div>
            );
          }
        })}
        {/* <hr /> */}
        <div className="flex  mt-[50px] text-[20px] ">
          <div className="flex-1 flex-col justify-between mt-[100px] gap-10 mb-[100px]">
            <h1> Cart Totals</h1>
            <div>
              <div className=" flex justify-between pt[-15px]">
                <p>Subtotals</p>
                <p>Rs {0}</p>
              </div>
              <hr className="h-[1px] bg-white border-none" />
              <div className="">
                <p>Shipping Fee</p>
                <p>Free</p>
              </div>
              <hr className="h-[1px] bg-white border-none" />
              <div className="">
                <h3>Totals</h3>
                <h3>Rs {0}</h3>
              </div>
            </div>
            <button
              type="button"
              className="w-[200px] h-[50px] outline-none border-none bg-red-500 text-white text-[16px]
            cursor-pointer"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
          <div className="flex-1 text-[16px] ">
            <p>If you have promocode,Enter here</p>
            <div>
              <input type="text" name="" placeholder="promocode" />
              <button>SUBMIT</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartsItems;
