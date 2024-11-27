import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../BaseURL/Product";
import { useNavigate } from "react-router-dom";
import { CloudinaryConfig } from "../../../Cloudinary";
import { Rating } from "@mantine/core";

const TopSales = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1200, // For large screens
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024, // For medium-sized screens
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768, // For tablets
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480, // For small mobile screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const [filterItems, setFilterItems] = useState([]);
  const [minDiscount, setMinDiscount] = useState(60);
  const navigate = useNavigate();
  const {
    data: productData = {},
    isLoading: isLoadingProducts,
    isError: isProductError,
    error: productError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const productLists = productData.products || [];

  const filteredProducts = () => {
    return productLists.filter((product) => product.discount >= minDiscount);
  };

  useEffect(() => {
    setFilterItems(filteredProducts());
  }, [productLists, minDiscount]);

  return (
    <div className="mt-2 drop-shadow-md sm:m-3">
      <div className="overflow-hidden rounded-xl sm:h-[440px] h-[320px] ">
        <div className="container pb-2 ml-0 pr-0 sm:pb-0">
          <h1 className="gap-4 flex justify-start items-start text-xl font-semibold text-black   p-2">
            Top sales
            <p className="text-[20px] text-red-500">Above {minDiscount}% </p>
          </h1>
          <div className="sm:m-auto sm:p-3 sm:w-auto pr-8 w-[400px]">
            <Slider {...settings}>
              {filterItems?.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-100 sm:p-2 drop-shadow-md rounded-md sm:w-[500px] sm:h-[330px] w-[300px] h-[240px]"
                >
                  <div>
                    {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                    <img
                      onClick={() => navigate(`/product/${item._id}`)}
                      className="sm:w-52 sm:h-52 w-[150px] h-[150px] object-fit m-auto p-2 cursor-pointer"
                      src={`${
                        CloudinaryConfig.CLOUDINARY_URL
                      }/image/upload/${item?.image_id[0]?.replace(/"/g, "")}`}
                      alt=""
                    />
                  </div>
                  <div className="flex sm:pl-8 pl-4 pr-2 w-full">
                    <div className="sm:text-[16px] text-[11px] text-black">
                      <p>{item.name}</p>
                      <div className="flex items-center gap-2 py-2">
                        <Rating value={item?.averageRating} fractions={2} />
                        <span className="text-orange-500 sm:text-sm text-[10px]">
                          ({item?.totalReviews})
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <p className="text-[13px] sm:text-[14px] line-through opacity-65">
                          ₹{item.price}
                        </p>
                        <p className="text-red-500 sm:text-[15px] text-[13px]">
                          ₹{item.discountedPrice}
                        </p>
                        <p className="text-emerald-500 sm:text-[13px] text-[11px]">
                          ({item.discount} % OFF)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSales;
