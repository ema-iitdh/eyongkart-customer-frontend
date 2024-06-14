import React, { useContext } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

import { Radio, Group } from "@mantine/core";
const Checkout = () => {
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
                className="rounded-md h-[40px] text-black indent-2 border-none outline-none  "
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
                        <p className="p-2 text-[18px]">Rs {buyProduct.price}</p>
                      </div>

                      <div>
                        <div className=" flex justify-between pt[-15px]">
                          <p>Subtotals</p>
                          <p>Rs {buyProduct?.price}</p>
                        </div>
                        <hr className="h-[1px] bg-white border-none" />
                        <div className="flex justify-between">
                          <p>Shipping Fee</p>
                          <p>Free</p>
                        </div>
                        <hr className="h-[1px] bg-white border-none" />
                        <div className="flex justify-between pt[-15px]">
                          <h3>Totals</h3>
                          <h3>Rs {buyProduct?.price}</h3>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  <Radio.Group>
                    <Group mt="xl ">
                      <Radio value="razorpay" label="Razorpay" />
                      <Radio value="cash" label="Cash on Delivery" />
                    </Group>
                  </Radio.Group>
                  <button
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
