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
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="pt-2">
        <div className="overflow-hidden rounded-3xl  sm:h-[420px] h-[330px] hero-bg-color  ">
          <div className="container pb-2 ml-0 pr-0  sm:pb-0">
            <h1 className="gap-4 flex justify-start items-start text-2xl font-semibold  text-black hover:text-red-500 dark:text-white p-2 ">
              Top sales
              <p className="text-[16px] text-red-500">70% Above</p>
            </h1>
            <div className="sm:m-auto sm:p-5 sm:w-auto pt-1 pr-8 w-[400px]">
              <Slider {...settings}>
                {data.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-gray-300 sm:w-20 sm:h-[320px] w-[300px] h-[250px]"
                    >
                      <div className="">
                        <img
                          className="sm:w-60 sm:h-60 w-[150px] h-[170px] object-fit block m-auto p-2 "
                          src={item.img}
                          alt=""
                        />
                      </div>
                      <div className=" flex justify-around sm:p-2 p-2">
                        <div className="sm:text-[18px] text-[15px] text-black">
                          <p className="">{item.name}</p>
                          <p className=" ">₹ {item.new_price}</p>
                        </div>
                        <button
                          type="button"
                          className="bg-red-600 hover:bg-red-500 sm:text-[15px] text-[12px] sm:w-[100px]  sm:h-[40px] w-[60px] h-8  text-white rounded-md  "
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
