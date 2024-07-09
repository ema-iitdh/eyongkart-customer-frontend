import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import Button from "../Shared/Button";
import { GrFavorite } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { toast } from "react-toastify";
import instance from "../../../api";
import axios from "axios";

const ProductCard = ({ data, get, type }) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(data);
  const { addToCart } = useContext(ShopContext);
  const [productData, setproductData] = useState();
  const [isWistlist, setIsWistlist] = useState("");

  const filter = async (type) => {
    if (type === "all") {
      // const getAllProduct = async () => {
      try {
        const res = await instance({
          url: "/product/allproduct",
          method: "GET",
        });
        setProduct(res.data.products);
      } catch (error) {
        console.log(error);
      }
    } else if (type === "men") {
      try {
        const res = await instance({
          url: "/product/getproductType/667019bc4e4491b37de49d2d",
          method: "GET",
        });
        // const { data } = await axios.get(
        //   `https://7bjx1c7g-3000.inc1.devtunnels.ms/product/getproductType/667019bc4e4491b37de49d2d`
        // );
        setProduct(res.data.productType);
      } catch (error) {
        console.log(error);
      }
    } else if (type === "women") {
      try {
        const res = await instance({
          url: `/product/getproductType/66704a48ec25cce3b11c92e0`,
          method: "GET",
        });
        // const { data } = await axios.get(
        //   `https://7bjx1c7g-3000.inc1.devtunnels.ms/product/getproductType/664d9c6ad3fbe4146f8e3baa`
        // );
        setProduct(res.data.productType);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleIsWistlist = async (e, p) => {
    e.preventDefault();
    setIsWistlist(p.fav);
    try {
      const { data } = await instance.put(`/product/updatefav/${p._id}`, {
        fav: p.fav === "No" ? "Yes" : "No",
      });
      if (data) {
        get();
      }
    } catch (error) {
      toast.error("Something Happen");
    }
  };
  useEffect(() => {
    filter(type);
  }, []);
  return (
    <div className="mb-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 place-items-center">
        {/* card section */}
        {product.map((p) => (
          <div className="group" key={p._id}>
            <div className="relative">
              <img
                onClick={() => {
                  // navigate("/shop")
                  navigate(`/product/${p._id}`);
                }}
                src={`http://drive.google.com/thumbnail?id=${p?.image_id[0]?.replace(
                  /"/g,
                  ""
                )}`}
                alt=""
                className="h-[190px] w-[260px] object-cover rounded-md"
              />
            </div>
            <div className="flex justify-between  leading-7">
              <div>
                <h2 className="font-semibold">{p.name}</h2>
                <h2 className="font-bold">
                  {" "}
                  <span className="line-through text-red-600">
                    ₹ {p.old_price}
                  </span>
                  <span className="ml-3">₹ {p.new_price}</span>
                </h2>
              </div>

              <button type="button" className="relative p-3">
                {/* <GrFavorite className="text-xl text-gray-600 dark:text-gray-400" /> */}
                <FaHeart
                  className={
                    p.fav === "Yes"
                      ? "text-red-600 dark:text-gray-400"
                      : "text-gray-400 dark:text-gray-300"
                  }
                  onClick={(e) => handleIsWistlist(e, p)}
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
