import React, { useContext } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Radio, Group } from "@mantine/core";
import { Checkbox } from "@mantine/core";
import ChatBox from "../Chat/ChatBox";
import { Axios } from "../../../api";
import { CloudinaryConfig } from "../../../Cloudinary";
const Checkout = () => {
  const [razorpaytick, setrazorpaytick] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [fullname, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("Manipur");
  const [checkoutItem, setCheckoutItem] = useState([]);
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

  const { buyProduct, getTotalCartAmount, getInitialCartItems } =
    useContext(ShopContext);
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
      // alert("Proceeding with Razorpay payment");
      // navigate("/myorder");
      return;
    }
    if (paymentMethod === "cash") {
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
    const result = await Axios.post("/order", {
      buyProduct: getTotal(),
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
        console.log(body);
        const { data } = await Axios.post("/order/validate", {
          razorpay_order_id: body.razorpay_order_id,
          razorpay_payment_id: body.razorpay_payment_id,
          razorpay_signature: body.razorpay_signature,
        });
        if (data.msg === "success") {
          toast.success(`Payment Success with Payment ID: ${data.paymentId}`);
          localStorage.removeItem("cartItems");
          getInitialCartItems();
          navigate("/myorder");
        }
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

  const getTotal = () => {
    let total = 0;
    if (checkoutItem && checkoutItem?.length) {
      checkoutItem.map((i) => {
        total = total + i.discountedPrice;
      });
    }
    return total;
  };

  useEffect(() => {
    let isData = localStorage.getItem("checkoutItem");
    if (isData) {
      isData = JSON.parse(isData);
      setCheckoutItem(isData);
    }
  }, []);

  const alertOk = () => {
    Swal.fire({
      title: "Good job!",
      text: "Thank you for order",
      icon: "success",
    });
    // navigate("/myorder");
  };
  const saveInfo = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your information has been saved",
      showConfirmButton: true,
      timer: 1500,
    });
  };

  // console.log("one", buyProduct, "two", checkoutItem);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden pt-16">
      <Navbar />
      <div className=" text-2xl overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex  flex-col pt-8 gap-y-3.5 ">
        <div className="container ">
          <h4 className="text-[18px]">Address information</h4>
        </div>
        <div className="sm:flex   gap-2 ">
          <div className="container border border-black dark:border-white w-[95%] sm:w-[50%]">
            <div className=" flex flex-col mb-3 w-[100%] sm:text-[18px] text-[15px] ">
              <label>Full Name</label>
              <input
                className="rounded-md w-full h-[30px] sm:h-[40px] text-black indent-2 border-none outline-none  "
                type="text"
                name="fullname"
                placeholder="Enter full name"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className=" flex flex-col mb-3 w-[100%] sm:text-[18px] text-[15px] ">
              <label> Full Address</label>
              <input
                className="rounded-md sm:h-[40px] h-[30px] text-black indent-2 border-none outline-none "
                type="address"
                name="address"
                placeholder="Enter full address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className=" flex flex-col mb-3 w-[100%] sm:text-[18px] text-[15px] ">
              <label>Phone Number</label>
              <input
                className="rounded-md sm:h-[40px] h-[30px] text-black indent-2 border-none outline-none "
                type="text"
                name="phone number"
                placeholder="Enter phone number"
                value={phonenumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className=" flex flex-col mb-3 w-[100%] sm:text-[18px] text-[15px] ">
              <label>Email Address</label>
              <input
                className="rounded-md sm:h-[40px] h-[30px] text-black indent-2 border-none outline-none "
                type="email"
                name="email address"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex gap-3 ">
              <div className="flex flex-wrap sm:h-[40px] h-[30px]">
                <label
                  className="w-[95%] text-[15px]  mt-1 mb-1"
                  htmlFor="services"
                >
                  District
                </label>

                <select
                  onChange={(e) => setDistrict(e.target.value)}
                  id="district"
                  className=" sm:h-[40px] h-[30px] w-[200px] text-black text-[15px] rounded-md border-solid border-[1px] outline-none "
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
                  className="w-[95%] text-[16px] mt-1 mb-1"
                  htmlFor="pincode"
                >
                  Pincode
                </label>
                <input
                  className="sm:h-[40px] h-[30px] w-[100%] text-black text-[15px] rounded-md border-solid border-[1px] indent-1 outline-none "
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

            <div className=" flex flex-col mb-3 w-[200px] text-[15px] sm:text-[18px] ">
              <label>State</label>
              <input
                className="rounded-lg h-[30px] sm:h-[40px] text-black indent-2 border-none outline-none "
                type="state"
                name="state"
                placeholder="Enter state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>

            <div className="text-[18px] gap-2">
              <button onClick={saveInfo}>
                {/* <input
                  className="bg-red-400 checked:bg-red-500 border-2 border-gray-300 rounded-sm"
                  name="info"
                  id="info"
                  type="checkbox"
                /> */}
                <Checkbox size="xs" defaultChecked color="red" />
              </button>
              <label htmlFor="info" className="text-[15px]">
                {" "}
                Save the information
              </label>
            </div>
          </div>

          <div className="container mb-4 w-[100%] sm:w-[50%]">
            <div className="flex  mt-[40px] text-[18px]  gap-4 items-start justify-center ">
              <div className="flex flex-1 flex-col border border-black dark:border-white rounded-3xl p-4 justify-between ">
                <h1 className="sm:text-[18px] text-[15px]"> Cart Totals</h1>
                <div>
                  {checkoutItem ? (
                    <>
                      {checkoutItem.map((p, i) => (
                        <div
                          key={i}
                          className="bg-white dark:bg-gray-900 flex items-center gap-2 mb-3"
                        >
                          <p className="p-1">
                            <img
                              className="sm:h-[100px] sm:w-[100px] h-[100px] w-[80px] object-fit"
                              src={`${
                                CloudinaryConfig.CLOUDINARY_URL
                              }/image/upload/${p?.image_id[0]?.replace(
                                /"/g,
                                ""
                              )}`}
                              alt="image1"
                            />
                          </p>
                          <p className="p-2 sm:text-[18px] text-[15px] ">
                            {p.name}
                          </p>
                          <p className="p-2 sm:text-[18px] text-[15px]">
                            {/* ₹ {p.discountedPrice}* {p.quantity} */}₹{" "}
                            {p.discountedPrice}
                          </p>
                        </div>
                      ))}
                      <div>
                        <div className=" flex justify-between text-[15px] sm:text-[18px] pt-[-15px]">
                          <p>Subtotals</p>
                          <p>₹ {getTotal()}</p>
                        </div>
                        <hr className="h-[1px] bg-white border-none" />
                        <div className="flex justify-between text-[15px] sm:text-[18px] ">
                          <p>Shipping Fee</p>
                          <p>Free</p>
                        </div>
                        <hr className="h-[1px] bg-white border-none" />
                        <div className="flex justify-between pt-[-15px] text-[15px] sm:text-[18px] ">
                          <h3>Totals</h3>
                          <h3>₹ {getTotal()}</h3>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <Radio.Group>
                    <Group mt="xl">
                      <Radio
                        color="red"
                        value="razorpay"
                        label="Online Payment /UPI"
                        checked={razorpaytick}
                        onChange={(event) =>
                          setrazorpaytick(event.currentTarget.checked)
                        }
                      />

                      <Radio
                        value="cash"
                        color="red"
                        label="Cash on Delivery"
                        onClick={alertOk}
                        onChange={() => {
                          setPaymentMethod("cash");
                        }}
                      />
                    </Group>
                  </Radio.Group>
                  <button
                    onClick={paymentHandler}
                    type="button"
                    className="w-[120px] sm:h-[50px] mt-4 outline-none border-none bg-red-500 text-white sm:text-[16px] text-[15px] text-center cursor-pointer rounded-md"
                  >
                    PAY NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatBox />
      <Footer />
    </div>
  );
};

export default Checkout;
