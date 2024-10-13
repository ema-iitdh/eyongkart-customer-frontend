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
      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 p-4  items-center ">
        <div className=" bg-gray-300 sm:h-[300px] sm:w-[230px] h-[240px] w-[180px] p-2 gap-2 rounded-lg flex flex-col items-center justify-center">
          <img
            className="sm:w-[220px] sm:h-[220px] w-[150px] h-[170px] p-3 object-fit "
            src={wangkhei1}
            alt=""
          />
          <div className="w-full flex flex-col justify-center items-center p-2">
            <h2 className="text-black sm:text-[18px] text-[15px]">
              Wangkhei Phee
            </h2>
            {/* <h2 className="text-black sm:text-[20px] text-[15px] hover:text-red-500">
              Shop Now
            </h2> */}
          </div>
        </div>
        <div className=" bg-gray-300  sm:h-[300px] sm:w-[230px] h-[240px] w-[180px] p-2 rounded-lg flex flex-col items-center justify-center">
          <img
            className="sm:w-[220px] sm:h-[220px] w-[150px] h-[170px] p-3 object-fit "
            src={wangkhei2}
            alt=""
          />
          <div className="w-full flex flex-col justify-center items-center p-2">
            <h2 className="text-black sm:text-[18px] text-[15px]">
              Wangkhei Phee
            </h2>
            {/* <h2 className="text-black sm:text-[20px] text-[15px] hover:text-red-500">
              Shop Now
            </h2> */}
          </div>
        </div>
        <div className=" bg-gray-300  sm:h-[300px] sm:w-[230px] h-[240px] w-[180px] p-2 rounded-lg flex flex-col items-center justify-center">
          <img
            className="sm:w-[220px] sm:h-[220px] w-[150px] h-[170px] p-3 object-fit "
            src={wangkhei3}
            alt=""
          />
          <div className="w-full flex flex-col justify-center items-center p-2">
            <h2 className="text-black sm:text-[18px] text-[15px]">
              Wangkhei Phee
            </h2>
            {/* <h2 className="text-black sm:text-[20px] text-[15px] hover:text-red-500">
              Shop Now
            </h2> */}
          </div>
        </div>
        <div className=" bg-gray-300  sm:h-[300px] sm:w-[230px] h-[240px] w-[180px] p-2 rounded-lg flex flex-col items-center justify-center">
          <img
            className="sm:w-[220px] sm:h-[220px] w-[150px] h-[170px] p-3 object-fit "
            src={wangkhei4}
            alt=""
          />
          <div className="w-full flex flex-col justify-center items-center p-2">
            <h2 className="text-black sm:text-[18px] text-[15px]">
              Wangkhei Phee
            </h2>
            {/* <h2 className="text-black sm:text-[20px] text-[15px] hover:text-red-500">
              Shop Now
            </h2> */}
          </div>
        </div>
        <div className=" bg-gray-300  sm:h-[300px] sm:w-[230px] h-[240px] w-[180px] p-2 rounded-lg flex flex-col items-center justify-center">
          <img
            className="sm:w-[220px] sm:h-[220px] w-[150px] h-[170px] p-3 object-fit "
            src={wangkhei5}
            alt=""
          />
          <div className="w-full flex flex-col justify-center items-center p-2">
            <h2 className="text-black sm:text-[18px] text-[15px]">
              Wangkhei Phee
            </h2>
            {/* <h2 className="text-black sm:text-[20px] text-[15px] hover:text-red-500">
              Shop Now
            </h2> */}
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default RelatedProduct;
