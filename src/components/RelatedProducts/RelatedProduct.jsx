import React from "react";

import { Link } from "react-router-dom";
import wangkhei1 from "../../assets/images/wangkhei1.jpg";
import wangkhei2 from "../../assets/images/wangkhei2.jpg";
import wangkhei3 from "../../assets/images/wangkhei3.jpg";
import wangkhei4 from "../../assets/images/wangkhei4.jpg";
import wangkhei5 from "../../assets/images/wangkhei5.jpg";

const RelatedProduct = () => {
  return (
    <>
      {/* <div className="mt-3 overflow-hidden rounded-3xl h-[350px] sm:h-[400px] hero-bg-color  "> */}
      <h1 className="text-center text-[20px] pb-2 underline">
        RELATED PRODUCTS
      </h1>
      <div className="container grid grid-cols-1  sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2 items-center ">
        <div className=" bg-gray-300 h-[320px] w-[250px]  rounded-lg flex flex-col items-center justify-center">
          <img src={wangkhei1} alt="" />
          <div className="w-full flex items-center justify-center">
            <h2 className="text-black text-[20px]">Wangkhei phee</h2>
          </div>
        </div>
        <div className=" bg-gray-300 h-[320px] w-[250px]  rounded-lg flex flex-col items-center justify-center">
          <img src={wangkhei2} alt="" />
          <div className="w-full flex items-center justify-center">
            <h2 className="text-black text-[20px]">Wangkhei phee</h2>
          </div>
        </div>

        <div className=" bg-gray-300 h-[320px] w-[250px]  rounded-lg flex flex-col items-center justify-center">
          <img src={wangkhei4} alt="" />
          <div className="w-full flex items-center justify-center">
            <h2 className="text-black text-[20px]">Wangkhei phee</h2>
          </div>
        </div>
        <div className=" bg-gray-300 h-[320px] w-[250px]  rounded-lg flex flex-col items-center justify-center">
          <img src={wangkhei5} alt="" />
          <div className="w-full flex items-center justify-center">
            <h2 className="text-black text-[20px]">Wangkhei phee</h2>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default RelatedProduct;
