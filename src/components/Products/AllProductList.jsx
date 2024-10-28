import React from "react";
import { CloudinaryConfig } from "../../../Cloudinary";
import { FaHeart } from "react-icons/fa";

export default function AllProductList({ AllProduct }) {
  console.log("allproducts", AllProduct);
  return (
    <div className="mb-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pl-4">
        {AllProduct?.products?.map((p) => (
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
