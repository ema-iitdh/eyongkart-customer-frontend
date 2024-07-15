import React from "react";
import { Carousel } from "@mantine/carousel";
import rani from "../../assets/images/rani3.jpg";
import wangkhei from "../../assets/images/wangkhei6.jpg";
import pheijom from "../../assets/images/pheijom2.jpg";
// import blouse from "../../assets/images/top3.jpg";
import phanek from "../../assets/images/phanek4.jpg";
import top from "../../assets/images/top.jpg";
import muka from "../../assets/images/muka2.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const data = [
  {
    id: 1,
    img: rani,
    name: "Rani phee",
    new_price: "12000",
  },
  {
    id: 2,
    img: wangkhei,
    name: "Wangkhei phee",
    new_price: "12000",
  },
  {
    id: 3,
    img: phanek,
    name: "Phanek phee",
    new_price: "12000",
  },
  {
    id: 4,
    img: pheijom,
    name: "Pheijom phee",
    new_price: "12000",
  },
  {
    id: 5,
    img: top,
    name: "Top phee",
    new_price: "12000",
  },
  {
    id: 6,
    img: muka,
    name: "Muka phee",
    new_price: "12000",
  },
];
const TopSales = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 2,
  };
  return (
    <>
      <div className="pt-2">
        <div className="overflow-hidden rounded-3xl h-[350px] sm:h-[400px] hero-bg-color  ">
          <div className="container pb-2 ml-0 pr-0  sm:pb-0">
            <h1 className=" flex justify-start items-start text-2xl font-semibold text-black hover:text-red-500 dark:text-white p-2 ">
              Top sales
            </h1>
            <div className="  m-auto ">
              <Slider {...settings}>
                {data.map((item, index) => {
                  return (
                    <div key={index} className="bg-gray-300">
                      <div>
                        <img
                          className="w-60 h-60 p-2  block m-auto"
                          src={item.img}
                          alt=""
                        />
                      </div>
                      <div className="p-2 bg-white flex justify-between ">
                        <div>
                          <p className="font-semibold text-black">
                            {item.name}
                          </p>
                          <p className="font-semibold text-black">
                            ₹ {item.new_price}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="bg-red-600 hover:bg-red-500  text-white p-3 m-2 rounded-full "
                        >
                          Buy now
                        </button>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopSales;
