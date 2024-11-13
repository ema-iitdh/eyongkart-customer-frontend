import React from "react";
import raniphi from "../../assets/Category/rani.png";
import { Link } from "react-router-dom";

const BannerData = {
  discount: "50% OFF",
  title: "Beauty",
  date: "1st July to 30th July",
  image: raniphi,
  title2: "Manipur Traditional",
  title3: "Attire Sales",
  title4: "Rani phi full most rare design",
  bgColor: "#f42c37",
};

const Banner = () => {
  return (
    <div className="p-5 w-full flex items-center">
      <div className="w-full">
        <div
          style={{ backgroundColor: BannerData.bgColor }}
          className="grid grid-cols-2 md:grid-cols-3 lg:h-[330px] h-[300px] items-center text-white rounded-3xl"
        >
          {/* First column */}
          <div className="p-4 sm:p-8">
            <p className="text-sm">{BannerData.discount}</p>
            <h1 className="uppercase text-4xl lg:text-7xl font-bold">
              {BannerData.title}
            </h1>
            <p className="text-sm">{BannerData.date}</p>
            <div className="p-3">
              <Link to="/sorted">
                <button
                  type="button"
                  style={{ color: BannerData.bgColor }}
                  className="bg-white sm:py-2 sm:px-4 p-2 text-[13px] rounded-full flex text-center"
                >
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
          {/* Second column */}
          <div className="h-full flex items-center justify-center">
            <img
              src={BannerData.image}
              alt="Banner"
              className="sm:w-[230px] sm:h-[230px] w-[150px] h-[170px] md:w-[300px] mx-auto drop-shadow-2xl object-fit"
            />
          </div>
          {/* Third column */}
          <div className="flex flex-col justify-center gap-1 px-4 sm:p-8">
            <p className="font-bold text-xl">{BannerData.title2}</p>
            <p className="text-2xl sm:text-5xl font-bold">
              {BannerData.title3}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
