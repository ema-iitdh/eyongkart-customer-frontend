import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./ProductDisplay.css";
import { useParams } from "react-router-dom";
import { Rating, ScrollArea } from "@mantine/core";
import { Select } from "@mantine/core";
import { ShopContext } from "../Context/ShopContext";
// import RelatedProduct from "../RelatedProducts/RelatedProduct";
import { CloudinaryConfig } from "../../../Cloudinary";
import { Axios } from "../../../api";
import { fetchProductWithComments } from "../../BaseURL/Product.js";
import Reviews from "../Reviews/Reviews";

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
  const { data } = fetchProductWithComments(productId);

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
  useEffect(() => {
    fetchProductData();
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      {productData && (
        <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden ">
          <Navbar />
          <div className="pt-20 ">
            <div className="overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] pb-5">
              <div className="container pb-8 pr-0 sm:pb-0">
                <div className=" sm:flex ml-2 pt-5 pb-5">
                  <div className="flex gap-3">
                    <div className="flex flex-col gap-2">
                      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                      <img
                        className="sm:w-[170px] sm:h-[150px] w-[170px] h-[120px] "
                        src={imgData1}
                        alt="image1"
                        onClick={() => setMainImg(imgData1)}
                      />
                      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                      <img
                        className="sm:w-[180px] sm:h-[150px] w-[170px] h-[120px] "
                        src={imgData2}
                        alt="image2"
                        onClick={() => setMainImg(imgData2)}
                      />
                      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                      <img
                        className="sm:w-[180px] sm:h-[150px] w-[170px] h-[120px] "
                        src={imgData3}
                        alt="image3"
                        onClick={() => setMainImg(imgData3)}
                      />
                      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
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
                    <h1 className=" sm:text-[20px] text-[15px] ">
                      {productData.name}
                    </h1>
                    <div className="flex items-center gap-2 py-2">
                      <Rating
                        value={productData?.averageRating}
                        fractions={2}
                      />{" "}
                      <span className="text-orange-500 sm:text-[16px] text-[12px] gap-2">
                        ({productData?.totalReviews})
                      </span>
                      <span>Reviews</span>
                    </div>

                    <div className="productdisplay-right-prices">
                      <div className="mt-[-20px] ">
                        <span className=" text-red-500 ">
                          ₹{productData.discountedPrice}
                        </span>
                        <span className="pl-3 line-through">
                          ₹{productData.price}
                        </span>

                        <span className=" text-gray-500 text-[14px] ml-2 ">
                          ({productData.discount} % OFF)
                        </span>
                      </div>
                    </div>
                    <div className="sm:text-[16px] text-[13px] mt-[-15px]">
                      {productData.description}
                    </div>
                    <div className="pt-8 flex sm:text-xl text-[13px] gap-2 font-semibold">
                      Quantity
                      <input
                        className="w-[100px] h-[25px] dark:text-black border border-black "
                        min={1}
                        max={6}
                        type="number"
                        placeholder="Quantity"
                      />
                    </div>
                    <div className="productdisplay-right-size pb-8">
                      <h4>Size </h4>
                      <p className="sm:text-[16px] text-[13px]">
                        Length : {productData.sizelength}{" "}
                      </p>
                      <p className="sm:text-[16px] text-[13px]">
                        Width : {productData.sizewidth}
                      </p>
                    </div>
                    <div className="flex gap-3 pr-3">
                      <button
                        onClick={() => {
                          buyNow(productData._id);
                          navigate("/checkout");
                        }}
                        type="button"
                        className="flex items-center justify-center sm:w-[120px] sm:h-[60px] h-[40px] mb-8 outline-none border-none bg-red-400 hover:bg-red-500 transition duration-200 text-white text-center rounded-full cursor-pointer shadow-md"
                      >
                        <span className="sm:font-semibold sm:text-[16px] text-[13px]">
                          Buy Now
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          addToCart(productData._id);
                        }}
                        type="button"
                        className="flex items-center justify-center sm:w-[120px] sm:h-[60px] h-[40px] outline-none border-none bg-red-400 hover:bg-red-500 transition duration-200 text-white text-[13px] text-center rounded-full cursor-pointer shadow-md"
                      >
                        <span className="sm:font-semibold sm:text-[16px] text-[13px]">
                          Add to Cart
                        </span>
                      </button>
                    </div>

                    <p className="mt-3 sm:text-[16px] text-[13px]">
                      <span>Category: </span>
                      Women, {productData.name} and traditional design.
                    </p>
                    <p className="mt-3 sm:text-[16px] text-[13px]">
                      <span>Tags: </span>
                      Modern Latest.
                    </p>
                  </div>
                </div>
              </div>
              {/* <RelatedProduct currentProduct={productData} /> */}

              <Reviews />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDisplay;
