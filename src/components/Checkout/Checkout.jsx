import React, { useContext } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import instance from "../../../api";

import { Radio, Group } from "@mantine/core";
const Checkout = () => {
  const [razorpaytick, setrazorpaytick] = useState(false);
  const [fullname, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("Manipur");
  const districtPincode = [
    {
      district: "Imphal East",
      pincode: "795008",
    },
    {
      district: "Imphal West",
      pincode: "795001",
    },
    {
      district: "Thoubal",
      pincode: "795138",
    },
    {
      district: "Bishnupur",
      pincode: "795126",
    },
    {
      district: "Kakching",
      pincode: "795103",
    },
  ];

  const { cartItems } = useContext(ShopContext);

  const { buyProduct, getTotalCartAmount } = useContext(ShopContext);
  console.log(buyProduct);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    console.log(district);
    const pincode = districtPincode.filter(
      (eachDistrict) => eachDistrict.district === district
    );
    // console.log(pincode[0]?.pincode);
    setPincode(pincode[0]?.pincode);
  }, [district]);

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
      buyProduct: buyProduct.price,
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
  // const paymentHandler = async (e) => {
  //   const response = await fetch("http://192.168.0.167:3000/order", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       buyProduct: buyProduct.price,
  //       currency,
  //       receipt: receiptId,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const order = await response.json();
  //   console.log(order);

  //
  //   e.preventDefault();
  // };
  // useEffect(() => {
  //   let data = localStorage.getItem("p");
  //   if (data) {
  //     data = JSON.parse(data);
  //     setP(data);
  //     setAmount(data.rate * 100);
  //   }
  // }, []);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden pt-16">
      <Navbar />
      <div className="container text-2xl overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex  flex-col pt-8 gap-y-3.5">
        <div className="container ">
          <h4>Address information</h4>
        </div>
        <div className="flex gap-2">
          <div className="container border border-black w-[50%]">
            <div className=" flex flex-col mb-3 w-[500px] text-[18px] ">
              <label>Full Name</label>
              <input
                className="rounded-md w-full h-[40px] text-black indent-2 border-none outline-none  "
                type="text"
                name="fullname"
                placeholder="Enter full name"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className=" flex flex-col mb-3 w-[500px] text-[18px] ">
              <label> Full Address</label>
              <input
                className="rounded-md h-[40px] text-black indent-2 border-none outline-none "
                type="address"
                name="address"
                placeholder="Enter full address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className=" flex flex-col mb-3 w-[500px] text-[18px] ">
              <label>Phone Number</label>
              <input
                className="rounded-md h-[40px] text-black indent-2 border-none outline-none "
                type="text"
                name="phone number"
                placeholder="Enter phone number"
                value={phonenumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className=" flex flex-col mb-3 w-[500px] text-[18px] ">
              <label>Email Address</label>
              <input
                className="rounded-md h-[40px] text-black indent-2 border-none outline-none "
                type="email"
                name="email address"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex gap-4 ">
              <div className="flex flex-wrap">
                <label
                  className="w-[95%]  text-[18px] mt-1 mb-1"
                  for="services"
                >
                  District
                </label>

                <select
                  onChange={(e) => setDistrict(e.target.value)}
                  id="district"
                  className="h-[40px] w-[235px] text-black text-[18px] rounded-md border-solid border-[1px] outline-none "
                >
                  <option value="district">Select District</option>
                  {districtPincode.map((s, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <option key={i} value={s.district}>
                      {s.district}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-wrap">
                <label
                  className="w-[95%] text-[18px] mt-1 mb-1"
                  htmlFor="pincode"
                >
                  Pincode
                </label>
                <input
                  className="h-[40px] w-[250px] text-black text-[18px] rounded-md border-solid border-[1px] indent-1 outline-none "
                  type=""
                  placeholder="Enter Pincode"
                  value={pincode}
                  maxLength={6}
                  onChange={(e) => setPincode(e.target.value)}
                  name="pincode"
                  required
                />
              </div>
            </div>

            <div className=" flex flex-col mb-3 w-[235px] text-[18px] ">
              <label>State</label>
              <input
                className="rounded-lg h-[40px] text-black indent-2 border-none outline-none "
                type="state"
                name="state"
                placeholder="Enter state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>

            <div className="text-[18px]">
              <input type="checkbox" />
              Save the information
            </div>
          </div>

          <div className="container border border-black w-[50%]">
            <div className="flex  mt-[40px] text-[18px]  gap-4 items-start justify-center ">
              <div className="flex flex-1 flex-col border border-black rounded-3xl p-4 justify-between ">
                <h1> Cart Totals</h1>

                <div>
                  {buyProduct ? (
                    <>
                      <div className="bg-white dark:bg-gray-900 flex items-center gap-8 mb-6">
                        <p className="p-2  ">
                          <img
                            className="h-[100px] w-[200px] object-contain"
                            src={`http://drive.google.com/thumbnail?id=${buyProduct?.image_id[4]?.replace(
                              /"/g,
                              ""
                            )}`}
                            alt="image1"
                          />
                        </p>
                        <p className="p-2 text-[18px] ">{buyProduct.name}</p>
                        <p className="p-2 text-[18px]">₹ {buyProduct.price}</p>
                      </div>

                      <div>
                        <div className=" flex justify-between pt[-15px]">
                          <p>Subtotals</p>
                          <p>₹ {buyProduct?.price}</p>
                        </div>
                        <hr className="h-[1px] bg-white border-none" />
                        <div className="flex justify-between">
                          <p>Shipping Fee</p>
                          <p>Free</p>
                        </div>
                        <hr className="h-[1px] bg-white border-none" />
                        <div className="flex justify-between pt[-15px]">
                          <h3>Totals</h3>
                          <h3>₹ {buyProduct?.price}</h3>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  <Radio.Group>
                    <Group mt="xl ">
                      <Radio
                        value="razorpay"
                        label="Online Payment"
                        checked={razorpaytick}
                        onChange={(event) =>
                          setrazorpaytick(event.currentTarget.checked)
                        }
                      />
                      <Radio value="cash" label="Cash on Delivery" />
                    </Group>
                  </Radio.Group>
                  <button
                    onClick={paymentHandler}
                    type="button"
                    className="w-[200px] h-[50px] mt-4 outline-none border-none bg-red-500 text-white text-[16px]
            cursor-pointer"
                  >
                    PROCEED TO PAY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
