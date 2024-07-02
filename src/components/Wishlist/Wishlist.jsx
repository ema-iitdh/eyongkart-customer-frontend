import React, { useContext } from "react";
import Navbar from "../Navbar/Navbar";
import { TiDeleteOutline } from "react-icons/ti";
import { ShopContext } from "../Context/ShopContext";
import Footer from "../Footer/Footer";
const Wishlist = () => {
  const { cartItems, removeFromCart } = useContext(ShopContext);
  console.log(cartItems);
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden ">
      <Navbar />

      <div className="container text-2xl overflow-hidden min-h-[550px] sm:min-h-[650px] hero-bg-color flex flex-col pt-24 gap-y-3.5 ">
        <table className=" min-w-full text-center dark:text-white text-black text-[20px]">
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
            {cartItems.map((item, index) => (
              <tr
                key={index}
                className="bg-white border border-black  dark:bg-gray-900"
              >
                <td className="p-2  ">
                  {/* Uncomment and update if you have an image */}
                  {/* <img src={item.img} alt={item.title} className="w-16 h-16 object-cover"/> */}
                  <img
                    className="h-[120px] w-[200px] object-contain"
                    src={`http://drive.google.com/thumbnail?id=${item?.image_id[0]?.replace(
                      /"/g,
                      ""
                    )}`}
                    alt="image1"
                  />
                </td>
                <td className="p-2 text-[16px] ">{item.name}</td>
                <td className="p-2 text-[16px]">₹ {item.price}</td>
                <td className="p-2 text-[16px]  text-center   ">
                  <div className="flex gap-4 justify-center items-center">
                    {/* <button type="button" className="hover:bg-gray-200 px-4 ">
                      -
                    </button> */}
                    {item.quantity}
                    {/* <button type="button" className="hover:bg-gray-200 px-4">
                      +
                    </button> */}
                  </div>
                </td>

                <td className="p-2 text-[16px] ">
                  ₹ {item.price * item.quantity}
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

      <Footer />
    </div>
  );
};

export default Wishlist;
