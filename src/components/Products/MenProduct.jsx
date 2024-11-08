import React from "react";
import { FaHeart } from "react-icons/fa";
import { CloudinaryConfig } from "../../../Cloudinary";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mantine/core";
import { handleIsWishlist } from "../WishlistFunction/WishlistFunction";

export default function MenProduct({ filteredMenProductList }) {
  // console.log(filteredMenProductList);
  const navigate = useNavigate();

  return (
    <div className="mb-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pl-4">
        {filteredMenProductList?.map((p) => (
          <div className="group " key={p._id}>
            <div className="relative ">
              {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
              <img
                onClick={() => navigate(`/product/${p._id}`)}
                src={`${
                  CloudinaryConfig.CLOUDINARY_URL
                }/image/upload/${p?.image_id[0]?.replace(/"/g, "")}`}
                alt=""
                className="sm:h-[190px] sm:w-[250px] w-[150px] h-[170px] object-fit rounded-md "
              />
            </div>
            <div className="flex justify-between leading-6">
              <div>
                <h2 className="sm:font-semibold text-[15px]">{p?.name}</h2>
                <div className="flex items-center gap-2 py-2">
                  <Rating value={p?.averageRating} fractions={2} />{" "}
                  <span className="text-orange-500 text-sm">
                    ({p?.totalReviews})
                  </span>
                </div>
                <h3 className="gap-2">
                  <span className="ml-1 text-red-600 text-[12px] sm:text-[15px] ">
                    ₹{p.discountedPrice}
                  </span>
                  <span className="pl-2 line-through sm:text-[15px] text-[12px]">
                    ₹{p.price}
                  </span>
                </h3>
                <span className=" text-gray-500 text-[10px] sm:text-[14px] ml-1 ">
                  ({p.discount} % OFF)
                </span>
              </div>
              <button type="button" className="relative p-3">
                <FaHeart
                  className={p.fav === "Yes" ? "text-red-600" : "text-gray-400"}
                  onClick={(e) => handleIsWishlist(e, p)}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
