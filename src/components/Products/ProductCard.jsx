import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import instance from "../../../api";

const ProductCard = ({ data, type, setWishlistUpdate }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(data);

  const handleIsWishlist = async (e, p) => {
    e.preventDefault();
    try {
      const { data } = await instance.put(`/product/updatefav/${p._id}`, {
        fav: p.fav === "No" ? "Yes" : "No",
      });
      if (data) {
        setWishlistUpdate((prev) => !prev);
      }
    } catch (error) {
      toast.error("Something Happened");
    }
  };

  useEffect(() => {
    setProducts(data);
  }, [data]);

  return (
    <div className="mb-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 ">
        {products?.map((p) => (
          <div className="group" key={p._id}>
            <div className="relative ">
              {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
              <img
                onClick={() => navigate(`/product/${p._id}`)}
                src={`http://drive.google.com/thumbnail?id=${p?.image_id[0]?.replace(
                  /"/g,
                  ""
                )}`}
                alt=""
                className="sm:h-[190px] sm:w-[250px] w-[150px] h-[170px] object-fit rounded-md"
              />
            </div>
            <div className="flex justify-between leading-7">
              <div>
                <h2 className="sm:font-semibold text-[15px]">{p.name}</h2>
                <h2 className="sm:font-bold ">
                  <span className="line-through text-red-600 sm:text-[16px] text-[12px]">
                    ₹{p.price}
                  </span>
                  <span className="ml-1 text-[12px] sm:text-[16px]">
                    ₹ {p.discountedPrice}
                  </span>
                  <span className=" text-gray-500 text-[10px] sm:text-[14px] ml-1 ">
                    ({p.discount} % OFF)
                  </span>
                </h2>
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
};

export default ProductCard;
