import React, { useContext, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { TiDeleteOutline } from "react-icons/ti";
import { ShopContext } from "../Context/ShopContext";
import { Radio, Group } from "@mantine/core";
import instance from "../../../api";
import { useNavigate } from "react-router-dom";

const CartsItems = () => {
  const {
    getTotalCartAmount,
    data,
    cartItems,
    substractQuantity,
    addToCart,
    removeFromCart,
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
  const paymentHandler = async () => {
    if (!razorpaytick) {
      navigate("/myorder");
      return;
    }
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const receiptId = "qwerty";
    // biome-ignore lint/correctness/noInvalidUseBeforeDeclaration: <explanation>
    const result = await instance.post("/order", {
      buyProduct: getTotalCartAmount(),
      // biome-ignore lint/correctness/noInvalidUseBeforeDeclaration: <explanation>
      currency: "INR",
      receiptId,
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }
    console.log(result.data);
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_JIH6EhvgsXj43w", // Enter the Key ID generated from the Dashboard
      amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "Supriya ch", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async (response) => {
        const body = {
          ...response,
        };

        // const validateRes = await fetch(
        //   "http://192.168.0.167:3000:3000/order/validate",
        //   {
        //     method: "POST",
        //     body: JSON.stringify(body),
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   }
        // );
        const validateRes = await instance.post("/order/validate", {
          body,
        });
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Web Dev Matrix", //your customer's name
        email: "webdevmatrix@example.com",
        contact: "9000000000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", (response) => {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };
  console.log(cartItems);
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden ">
      <Navbar />

      <div className="container text-2xl overflow-hidden min-h-[550px] sm:min-h-[650px] hero-bg-color flex flex-col pt-8 gap-y-3.5 ">
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
                    <button
                      type="button"
                      onClick={() => substractQuantity(item._id)}
                      className="hover:bg-gray-200 px-4 "
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      type="button"
                      onClick={() => addToCart(item._id)}
                      className="hover:bg-gray-200 px-4"
                    >
                      +
                    </button>
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

      <div className="flex  mt-[50px] text-[18px] pl-32 gap-8 items-start justify-center ">
        <div className="flex flex-1 flex-col border border-black rounded-3xl p-4 justify-between  gap-10 mb-[100px]">
          <h1> Cart Totals</h1>
          <div>
            <div className=" flex justify-between pt[-15px]">
              <p>Subtotals</p>
              <p>₹ {getTotalCartAmount()}</p>
            </div>
            <hr className="h-[1px] bg-white border-none" />
            <div className="flex justify-between">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr className="h-[1px] bg-white border-none" />
            <div className="flex justify-between pt[-15px]">
              <h3>Totals</h3>
              <h3>₹ {getTotalCartAmount()}</h3>
            </div>
          </div>
          <Radio.Group>
            <Group mt="xl ">
              <Radio
                value="razorpay"
                label="Razorpay"
                checked={razorpaytick}
                onChange={(event) =>
                  setrazorpaytick(event.currentTarget.checked)
                }
              />
              <Radio
                value="cash"
                label="Cash on Delivery"
                onChange={() => setrazorpaytick(false)}
              />
            </Group>
          </Radio.Group>
          <button
            type="button"
            className="w-[200px] h-[50px] outline-none border-none bg-red-500 text-white text-[16px]
            cursor-pointer"
            onClick={paymentHandler}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="flex flex-1 flex-col text-[16px] ">
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
        </div>
      </div>
    </div>
  );
};

export default CartsItems;
