import React from "react";
const Banner = ({ data }) => {
  return (
    <div
      className="p-4 min-h-[150px] sm:min-h-[300px] flex items-center rounded-lg
     "
    >
      <div className="container">
        <div
          style={{ backgroundColor: data.bgColor }}
          className="grid grid-cols-2 md:grid-cols-3 lg:h-[330px] h-[300px] items-center text-white rounded-3xl"
        >
          {/* first col */}
          <div className="p-4 sm:p-8 top-0 gap-2 ">
            <p className="text-sm">{data.discount}</p>
            <h1 className="uppercase text-4xl lg:text-7xl font-bold">
              {" "}
              {data.title}
            </h1>
            <p className="text-sm">{data.date}</p>
            <div className="p-3">
              <button
                type="button"
                style={{ color: data.bgColor }}
                className="bg-white sm:py-2 sm:px-4 p-2  text-[13px]  rounded-full flex text-center"
              >
                Shop Now
              </button>
            </div>
          </div>
          {/* second col */}
          <div className="h-full flex items-center ">
            <img
              src={data.image}
              alt=""
              className="scale-123 sm:w-[230px] sm:h-[230px] w-[150px] h-[170px]md:w-[300px] mx-auto drop-shadow-2xl object-fit  "
            />
          </div>
          {/* third col */}
          <div className="flex flex-col justify-center gap-1 px-4 top-0 sm:p-8">
            <p className="font-bold text-xl">{data.title2}</p>
            <p className="text-2xl sm:text-5xl font-bold">{data.title3}</p>
            {/* <p className="text-sm tracking-wide leading-5">{data.title4}</p> */}
            {/* <div>
              <button
                type="button"
                style={{ color: data.bgColor }}
                className="bg-white sm:py-2 sm:px-4 py-1 px-2 text-[13px] top-0  rounded-full flex text-center"
              >
                Shop Now
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
