import React from "react";
import Navbar from "../Navbar/Navbar";
import image from "../../assets/images/rani1.jpg";
import { TiDeleteOutline } from "react-icons/ti";
const Myorder = () => {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden ">
      <Navbar />

      <div className="container text-2xl overflow-hidden min-h-[550px] sm:min-h-[650px] hero-bg-color flex flex-col pt-8 gap-y-3.5 ">
        <table className=" min-w-full text-center dark:text-white text-black text-[20px] mt-16">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800 gap-2">
              <th className="p-2">Products</th>
              <th className="p-2">Title</th>
              <th className="p-2">Price</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">SubTotal</th>
              <th className="p-2">Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border border-black  dark:bg-gray-900">
              <td className="p-2  ">
                <img
                  className="h-[120px] w-[200px] object-contain"
                  src={image}
                  alt="image1"
                />
              </td>
              <td className="p-2 text-[16px] ">Rani phee</td>
              <td className="p-2 text-[16px]">₹ 1200</td>
              <td className="p-2 text-[16px]  text-center ">1</td>

              <td className="p-2 text-[16px] ">₹ 1200</td>
              <td className="p-2 text-[16px] pl-16 ">
                <TiDeleteOutline size={26} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Myorder;
