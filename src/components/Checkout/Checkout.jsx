import React, { useContext } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    if (paymentMethod === "razorpay") {
      // console.log("Proceed with Razorpay payment");
      // navigate("/razorpay-payment");
    }
    if (paymentMethod === "cash") {
      // setTimeout(() => {
      alertOk();
      // navigate("/myorder");
      // }, 1000);
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

  const handlePayment = () => {
    navigate("/orderconfirm");
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

  return (
    <div className="bg-white dark:bg-gray-900 duration-200 overflow-hidden pt-16">
      <Navbar />
      <div className="text-2xl overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] flex flex-col pt-5 gap-y-4">
        <div className="container  mx-auto px-4">
          <h4 className="text-[18px] underline">Address Information</h4>
        </div>

        <div className="sm:flex gap-4 sm:px-4 px-2 flex-col   sm:flex-row">
          <div className="container sm:mb-4 sm:mt-2 border  drop-shadow-lg border-gray-300 w-full sm:w-[48%] p-4 rounded-lg">
            <div className="flex flex-col mb-4">
              <label className="text-sm sm:text-[16px]">Full Name</label>
              <input
                className="rounded-md w-full h-[40px] text-black indent-2 border border-gray-300 outline-none sm:text-[16px] text-[14px]"
                type="text"
                name="fullname"
                placeholder="Enter full name"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm sm:text-[16px]">Full Address</label>
              <input
                className="rounded-md w-full h-[40px] text-black indent-2 border border-gray-300 outline-none sm:text-[16px] text-[14px]"
                type="text"
                name="address"
                placeholder="Enter full address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm sm:text-[16px]">Phone Number</label>
              <input
                className="rounded-md w-full h-[40px] text-black indent-2 border border-gray-300 outline-none sm:text-[16px] text-[14px]"
                type="text"
                name="phone number"
                placeholder="Enter phone number"
                value={phonenumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm sm:text-[16px]">Email Address</label>
              <input
                className="rounded-md w-full h-[40px] text-black indent-2 border border-gray-300 outline-none sm:text-[16px] text-[14px]"
                type="email"
                name="email address"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm sm:text-[16px]">District</label>
              <select
                onChange={(e) => setDistrict(e.target.value)}
                id="district"
                className="rounded-md w-full h-[40px] border border-gray-300 outline-none sm:text-[16px] text-[14px]"
              >
                <option value="district">Select District</option>
                {districtPincode.map((s, i) => (
                  <option key={i} value={s.district}>
                    {s.district}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm sm:text-[16px]">Pincode</label>
              <input
                className="rounded-md w-full h-[40px] text-black indent-2 border border-gray-300 outline-none sm:text-[16px] text-[14px]"
                type="text"
                placeholder="Enter Pincode"
                value={pincode}
                maxLength={6}
                onChange={(e) => setPincode(e.target.value)}
                name="pincode"
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm sm:text-[16px]">State</label>
              <input
                className="rounded-md w-full h-[40px] text-black indent-2 border border-gray-300 outline-none sm:text-[16px] text-[14px]"
                type="text"
                name="state"
                placeholder="Enter state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center gap-2 text-sm sm:text-[16px]">
              <Checkbox size="xs" defaultChecked color="red" />
              <label htmlFor="info">Save the information</label>
            </div>
          </div>

          <div className="container mb-4 w-full  mt-4 sm:w-[48%]  p-4 border  border-gray-300 drop-shadow-lg rounded-lg">
            <h1 className="text-[16px] sm:text-[18px]">Cart Totals</h1>
            <div>
              {checkoutItem ? (
                <>
                  {checkoutItem.map((p, i) => (
                    <div
                      key={i}
                      className="flex items-center border border-gray-300 rounded-lg gap-2 mb-3"
                    >
                      <p className="p-1">
                        <img
                          className="h-[80px] sm:h-[100px] w-[80px] sm:w-[100px] object-cover"
                          src={`${
                            CloudinaryConfig.CLOUDINARY_URL
                          }/image/upload/${p?.image_id[0]?.replace(/"/g, "")}`}
                          alt="product"
                        />
                      </p>
                      <p className="p-2 sm:text-[16px] text-[14px]">{p.name}</p>
                      <p className="p-2 sm:text-[16px] text-[14px]">
                        ₹ {p.discountedPrice}
                      </p>
                    </div>
                  ))}
                  <div className="flex justify-between sm:text-[16px] text-[14px] pt-[-15px]">
                    <p>Subtotals</p>
                    <p>₹ {getTotal()}</p>
                  </div>
                  <hr className="h-[1px] bg-gray-300 border-none" />
                  <div className="flex justify-between sm:text-[16px] text-[14px]">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                  </div>
                  <hr className="h-[1px] bg-gray-300 border-none" />
                  <div className="flex justify-between sm:text-[16px] text-[14px] pt-[-15px]">
                    <h3>Totals</h3>
                    <h3>₹ {getTotal()}</h3>
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
                    label="Online Payment / UPI"
                    checked={razorpaytick}
                    onChange={(event) => {
                      setrazorpaytick(event.currentTarget.checked);
                      setPaymentMethod("razorpay");
                    }}
                  />
                  <Radio
                    color="red"
                    value="cash"
                    label="Cash on Delivery"
                    onChange={() => {
                      setrazorpaytick(false);
                      setPaymentMethod("cash");
                    }}
                  />
                </Group>
              </Radio.Group>
              {paymentMethod === "razorpay" && (
                <button
                  onClick={paymentHandler}
                  type="button"
                  className="w-[120px] sm:h-[50px] mt-4 outline-none border-none bg-red-500 text-white sm:text-[16px] text-[14px] text-center cursor-pointer rounded-md"
                >
                  PAY NOW
                </button>
              )}
              {paymentMethod === "cash" && (
                <button
                  onClick={handlePayment}
                  type="button"
                  className="w-[120px] sm:h-[50px] mt-4 outline-none border-none bg-red-500 text-white sm:text-[16px] text-[14px] text-center cursor-pointer rounded-md"
                >
                  PAY NOW
                </button>
              )}
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
