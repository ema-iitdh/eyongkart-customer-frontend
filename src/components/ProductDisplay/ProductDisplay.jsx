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
import { Rating } from "@mantine/core";
import { Select } from "@mantine/core";
import { ShopContext } from "../Context/ShopContext";
import RelatedProduct from "../RelatedProducts/RelatedProduct";
import { CloudinaryConfig } from "../../../Cloudinary";
import { Axios } from "../../../api";

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
      const res = await Axios({
        url: `/product/getOneProduct/${productId}`,
        method: "GET",
      });
      console.log(res);
      setproductData(res.data.product);
      setImgData1(
        `${
          CloudinaryConfig.CLOUDINARY_URL
        }/image/upload/${res.data.product?.image_id[0]?.replace(/"/g, "")}`
      );
      setImgData2(
        `${
          CloudinaryConfig.CLOUDINARY_URL
        }/image/upload/${res.data.product?.image_id[1]?.replace(/"/g, "")}`
      );
      setImgData3(
        `${
          CloudinaryConfig.CLOUDINARY_URL
        }/image/upload/${res.data.product?.image_id[2]?.replace(/"/g, "")}`
      );
      setImgData4(
        `${
          CloudinaryConfig.CLOUDINARY_URL
        }/image/upload/${res.data.product?.image_id[3]?.replace(/"/g, "")}`
      );
      setImgData5(
        `${
          CloudinaryConfig.CLOUDINARY_URL
        }/image/upload/${res.data.product?.image_id[4]?.replace(/"/g, "")}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  console.log("product", productData, product);
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
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  // const { product } = props;
  return (
    <>
      {productData && (
        <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden ">
          <Navbar />
          <div className="pt-20 ">
            <div className="overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color pb-5">
              <div className="container pb-8 pr-0 sm:pb-0">
                <div className=" sm:flex ml-2 pt-5 pb-5">
                  <div className="flex gap-3">
                    <div className="flex flex-col gap-2">
                      <img
                        className="sm:w-[180px] sm:h-[150px] w-[170px] h-[120px] "
                        src={imgData1}
                        alt="image1"
                        onClick={() => setMainImg(imgData1)}
                      />
                      <img
                        className="sm:w-[180px] sm:h-[150px] w-[170px] h-[120px] "
                        src={imgData2}
                        alt="image2"
                        onClick={() => setMainImg(imgData2)}
                      />
                      <img
                        className="sm:w-[180px] sm:h-[150px] w-[170px] h-[120px] "
                        src={imgData3}
                        alt="image3"
                        onClick={() => setMainImg(imgData3)}
                      />
                      <img
                        className="sm:w-[180px] sm:h-[150px] w-[170px] h-[120px]"
                        src={imgData4}
                        alt="image4"
                        onClick={() => setMainImg(imgData4)}
                      />
                    </div>
                    <div className="productdisplay-img">
                      {mainImg ? (
                        <img
                          className="sm:w-[520px] sm:h-[620px] w-[320px] h-[502px] pr-4"
                          src={mainImg}
                          alt="imag1"
                        />
                      ) : (
                        <img
                          className="sm:w-[520px] sm:h-[620px] w-[330px] h-[502px] pr-4 "
                          src={`${
                            CloudinaryConfig.CLOUDINARY_URL
                          }/image/upload/${productData?.image_id[0]?.replace(
                            /"/g,
                            ""
                          )}`}
                          alt="imag5"
                        />
                      )}
                    </div>
                  </div>
                  <div className="productdisplay-right mt-2 sm:mt-0 ">
                    <h1 className=" sm:text-[20px] ">{productData.name}</h1>
                    <Rating value={3.5} fractions={2} size="lg" />

                    <div className="productdisplay-right-prices">
                      <div className="mt-[-20px] ">
                        <span className=" text-red-500 ">
                          ₹{productData.discountedPrice}
                        </span>
                        <span className="line-through">
                          ₹{productData.price}
                        </span>

                        <span className=" text-gray-500 text-[14px] ml-2 ">
                          ({productData.discount} % OFF)
                        </span>
                        {/* <span className="line-through text-black">
                          {" "}
                          ₹ {productData.old_price}
                        </span> */}
                      </div>
                    </div>
                    <div className="productdisplay-right-description mt-[-15px]">
                      {productData.description}
                    </div>
                    <div className="pt-8 flex sm:text-xl text-[15px] gap-2 font-semibold">
                      Quantity
                      <input
                        className="w-[100px] h-[30px] dark:text-black border border-black "
                        min={1}
                        max={6}
                        type="number"
                        placeholder="Quantity"
                      />
                    </div>
                    <div className="productdisplay-right-size pb-8">
                      <h1>Size </h1>
                      <p>Length : {productData.sizelength} </p>
                      <p>Width : {productData.sizewidth}</p>
                    </div>
                    <div className=" flex gap-2 ">
                      <button
                        onClick={() => {
                          buyNow(productData._id);
                          navigate("/checkout");
                        }}
                        type="button"
                        className=" sm:w-[100px] sm:h-[58px] h-[50px] p-2 outline-none border-none bg-red-500 text-white  text-center rounded-full cursor-pointer"
                      >
                        Buy now
                      </button>

                      <button
                        onClick={() => {
                          addToCart(productData._id);
                        }}
                        type="button"
                        className=" sm:w-[100px] sm:h-[58px] h-[50px] outline-none border-none bg-red-500 text-white text-[13px] text-center rounded-full cursor-pointer"
                      >
                        Add to cart
                      </button>
                    </div>
                    <p className="mt-3 text-[16px]">
                      <span className="text-[18px]">Category: </span>
                      Women, Rani phi and traditional design.
                    </p>
                    <p className="mt-3 text-[16px]">
                      <span className="text-[18px]">Tags: </span>
                      Modern Latest.
                    </p>
                  </div>
                </div>
              </div>
              <RelatedProduct />
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      )}
    </>
  );
};

export default ProductDisplay;
