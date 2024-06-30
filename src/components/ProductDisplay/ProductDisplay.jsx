import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./ProductDisplay.css";
import star_icon from "../../assets/images/star_icon.png";
import star_dull_icon from "../../assets/images/star_dull_icon.png";
import productimage from "../../assets/images/rani1.jpg";
import Button from "../Shared/Button";
import { useParams } from "react-router-dom";
import instance from "../../../api";
import { Rating } from "@mantine/core";
import { Select } from "@mantine/core";
import { ShopContext } from "../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const navigate = useNavigate();
  const { addToCart, buyNow } = useContext(ShopContext);
  const [productData, setproductData] = useState();
  const [imgData1, setImgData1] = useState();
  const [imgData2, setImgData2] = useState();
  const [imgData3, setImgData3] = useState();
  const [imgData4, setImgData4] = useState();
  const [mainImg, setMainImg] = useState();
  const { productId } = useParams();
  console.log(productId);
  const fetchProductData = async () => {
    try {
      const res = await instance({
        url: `/product/getOneProduct/${productId}`,
        method: "GET",
      });
      console.log(res);
      setproductData(res.data.product);
      setImgData1(
        `http://drive.google.com/thumbnail?id=${res.data.product?.image_id[0]?.replace(
          /"/g,
          ""
        )}`
      );
      setImgData2(
        `http://drive.google.com/thumbnail?id=${res.data.product?.image_id[1]?.replace(
          /"/g,
          ""
        )}`
      );
      setImgData3(
        `http://drive.google.com/thumbnail?id=${res.data.product?.image_id[2]?.replace(
          /"/g,
          ""
        )}`
      );
      setImgData4(
        `http://drive.google.com/thumbnail?id=${res.data.product?.image_id[3]?.replace(
          /"/g,
          ""
        )}`
      );
      setImgData5(
        `http://drive.google.com/thumbnail?id=${res.data.product?.image_id[4]?.replace(
          /"/g,
          ""
        )}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  // const getfile = async () => {
  //   try {
  //     const res = await instance({
  //       url: `http://drive.google.com/thumbnail?id=${productData?.image_id[0]}`,
  //       method: "GET",
  //     });
  //     setImgData(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    fetchProductData();
  }, []);
  // const { product } = props;
  return (
    <>
      {productData && (
        <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden ">
          <Navbar />
          <div className="container p-20 ">
            <div className="overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex justify-center items-center">
              <div className="container pb-8 pr-0 sm:pb-0">
                <div className=" flex ml-2 pt-5 pb-5">
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-4">
                      <img
                        className="h-[120px] w-[200px]"
                        // src={`http://drive.google.com/thumbnail?id=${productData?.image_id[0]?.replace(
                        //   /"/g,
                        //   ""
                        // )}`}
                        src={imgData1}
                        alt="image1"
                        onClick={() => setMainImg(imgData1)}
                      />
                      <img
                        className="h-[120px] w-[200px]  "
                        src={imgData2}
                        alt="image2"
                        onClick={() => setMainImg(imgData2)}
                      />
                      <img
                        className="h-[120px] w-[200px]"
                        // src={`http://drive.google.com/thumbnail?id=${productData?.image_id[2]?.replace(
                        //   /"/g,
                        //   ""
                        // )}`}
                        src={imgData3}
                        alt="image3"
                        onClick={() => setMainImg(imgData3)}
                      />
                      <img
                        className="h-[120px] w-[200px]"
                        // src={`http://drive.google.com/thumbnail?id=${productData?.image_id[3]?.replace(
                        //   /"/g,
                        //   ""
                        // )}`}
                        src={imgData4}
                        alt="image4"
                        onClick={() => setMainImg(imgData4)}
                      />
                    </div>
                    <div className="productdisplay-img">
                      {mainImg ? (
                        <img
                          className="w-[540px] h-[540px]"
                          src={mainImg}
                          alt="imag5"
                        />
                      ) : (
                        <img
                          className="w-[540px] h-[540px]"
                          src={`http://drive.google.com/thumbnail?id=${productData?.image_id[4]?.replace(
                            /"/g,
                            ""
                          )}`}
                          alt="imag5"
                        />
                      )}
                    </div>
                  </div>
                  <div className="productdisplay-right  ">
                    <h1 className="dark:text-white">{productData.name}</h1>
                    <Rating value={3.5} fractions={2} size="lg" />

                    <div className="productdisplay-right-prices">
                      {/* <div className='productdisplay-right-price-old'>${product.old_price} </div> */}
                      <div className="productdisplay-right-price-new">
                        ₹ {productData.price}{" "}
                      </div>
                    </div>
                    <div className="productdisplay-right-description">
                      A lightweight,usually knitted, close-fitting and a roun
                      neckline and short sleeves,worn as an outer garment.
                    </div>
                    <div className="pt-8 flex gap-4">
                      Quantity
                      <input
                        className="w-[50px] h-[25px] dark:text-black border border-black"
                        min={1}
                        max={6}
                        type="number"
                        placeholder="Quantity"
                      />
                    </div>
                    <div className="productdisplay-right-size pb-14">
                      <h1>Size Length</h1>
                      <p> Length : 2.50 Mtr </p>
                      <p>Width: 0.94 Mtr</p>
                    </div>
                    <div className="flex gap-3  ">
                      {/* <Button
                        text="BUY NOW"
                        bgColor={"bg-primary"}
                        textColor={"text-white"}
                      /> */}

                      <button
                        onClick={() => {
                          buyNow(productData._id);
                          navigate("/checkout");
                        }}
                        type="button"
                        className=" w-[100px] h-[58px] outline-none border-none bg-red-500 text-white text-[16px] text-center rounded-full cursor-pointer"
                      >
                        BUY NOW
                      </button>

                      <button
                        onClick={() => {
                          addToCart(productData._id);
                        }}
                        type="button"
                        className=" w-[100px] h-[58px] outline-none border-none bg-red-500 text-white text-[16px] text-center rounded-full cursor-pointer"
                      >
                        ADD TO CART
                      </button>
                    </div>
                    <p className="mt-3 text-[20px]">
                      <span>Category: </span>
                      Women, Rani phi and traditional design.
                    </p>
                    <p className="mt-3 text-[20px]">
                      <span>Tags: </span>
                      Modern Latest.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      )}
    </>
  );
};

export default ProductDisplay;
