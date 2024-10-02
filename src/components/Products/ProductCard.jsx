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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 place-items-center">
        {products?.map((p) => (
          <div className="group" key={p._id}>
            <div className="relative">
              <img
                onClick={() => navigate(`/product/${p._id}`)}
                src={`http://drive.google.com/thumbnail?id=${p?.image_id[0]?.replace(
                  /"/g,
                  ""
                )}`}
                alt=""
                className="h-[190px] w-[260px] object-cover rounded-md"
              />
            </div>
            <div className="flex justify-between leading-7">
              <div>
                <h2 className="font-semibold">{p.name}</h2>
                <h2 className="font-bold">
                  <span className="line-through text-red-600">
                    ₹ {p.old_price}
                  </span>
                  <span className="ml-3">₹ {p.new_price}</span>
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
