import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

import { CloudinaryConfig } from "../../../Cloudinary";

import { Rating, ScrollArea } from "@mantine/core";
import { useWishlist } from "../../hooks/useWistlist";

const ProductCard = ({ filteredWomenProductList }) => {
  const navigate = useNavigate();
  console.log("filterewomen product list", filteredWomenProductList);

  return (
    <div className="mb-6 sm:mt-2 p-3">
      <div className="grid grid-cols-2 p-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {filteredWomenProductList?.map((product) => {
          const { isInWishlist, toggleWishlist } = useWishlist(
            product._id,
            product?.fav
          );

          return (
            <div
              className="group shadow-md hover:shadow-lg border border-gray-400 sm:p-3 p-2 rounded-md"
              key={product._id}
            >
              <div className="relative">
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                <img
                  onClick={() => navigate(`/product/${product._id}`)}
                  src={`${
                    CloudinaryConfig.CLOUDINARY_URL
                  }/image/upload/${product?.image_id[0]?.replace(/"/g, "")}`}
                  alt=""
                  className="sm:h-[190px] sm:w-[250px] w-[150px] h-[170px] object-fit rounded-md "
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-slate-50 p-[5px] sm:p-[8px] rounded-full"
                >
                  <FaHeart
                    size={15}
                    className={isInWishlist ? "text-red-600" : "text-gray-400"}
                    onClick={toggleWishlist}
                  />
                </button>
              </div>
              <div className="w-full flex justify-between mt-2">
                <div className="sm:text-[16px] text-[12px] text-black">
                  <p>{product.name}</p>
                  <div className="flex items-center gap-3 py-2">
                    <Rating value={product?.averageRating} fractions={2} />
                    <span className="text-orange-500 sm:text-sm text-[10px]">
                      ({product?.totalReviews})
                    </span>
                  </div>
                  <div className="flex w-[130px] sm:w-[160px]">
                    <p className="text-black pr-1 line-through">
                      ₹{product.price}
                    </p>
                    <p className="text-red-500 pr-1">
                      ₹{product.discountedPrice}
                    </p>
                    <p className="text-emerald-500 text-[10px]">
                      ({product.discount}% OFF)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCard;
