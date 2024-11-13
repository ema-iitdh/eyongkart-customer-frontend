import React, { useContext } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { TiDeleteOutline } from "react-icons/ti";
import { ShopContext } from "../Context/ShopContext";
import { CloudinaryConfig } from "../../../Cloudinary";
import { useNavigate } from "react-router-dom";
import ChatBox from "../Chat/ChatBox";

const MyOrder = () => {
  const { cartItems, removeFromCart } = useContext(ShopContext);

  const getTotal = () => {
    let total = 0;
    if (cartItems?.length) {
      cartItems.forEach((item) => {
        total += item.discountedPrice * item.quantity;
      });
    }
    return total;
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 py-14">
        <h1 className="pt-6 sm:text-2xl font-semibold text-center mb-8">
          My Orders
        </h1>

        <div className="space-y-6 ">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="bg-white border hover:bg-gray-100 border-gray-400 shadow-lg rounded-lg sm:gap-5 overflow-hidden flex flex-col sm:flex-row"
            >
              {/* Product Image */}
              <div className="flex-shrink-0 w-full sm:w-48 h-48 sm:h-56 flex justify-center items-center">
                <img
                  className="sm:h-[190px] sm:w-[250px] w-[150px] h-[170px]  p-3 object-fit"
                  src={`${
                    CloudinaryConfig.CLOUDINARY_URL
                  }/image/upload/${item?.image_id[0]?.replace(/"/g, "")}`}
                  alt={item.name}
                />
              </div>

              <div className="p-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 ">
                    {item.name}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xl font-semibold text-gray-800 dark:text-white">
                      ₹ {item.discountedPrice}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                    Subtotal: ₹ {item.discountedPrice * item.quantity}
                  </p>
                </div>

                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="mt-4 text-red-500 hover:text-red-700 transition duration-200 flex items-center justify-center w-full sm:w-[100px] py-2 rounded-lg border border-red-500"
                >
                  <TiDeleteOutline size={20} className="mr-2" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ChatBox />
      <Footer />
    </div>
  );
};

export default MyOrder;
