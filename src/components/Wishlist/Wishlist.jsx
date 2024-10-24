import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { TiDeleteOutline } from "react-icons/ti";
import { ShopContext } from "../Context/ShopContext";
import Footer from "../Footer/Footer";
import { FaHeart } from "react-icons/fa6";
import ChatBox from "../Chat/ChatBox";
import { Axios } from "../../../api";
import { CloudinaryConfig } from "../../../Cloudinary";
const Wishlist = () => {
  const { cartItems, removeFromCart } = useContext(ShopContext);

  const [products, setProducts] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const getAllProduct = async () => {
    try {
      const { data } = await Axios({
        url: "/product/allproduct",
        method: "GET",
      });
      setProducts(data.products.filter((i) => i.fav === "Yes"));
    } catch (error) {
      console.log(error);
    }
  };

  const handleIsWistlist = async (e, p) => {
    e.preventDefault();
    try {
      const { data } = await Axios.put(`/product/updatefav/${p._id}`, {
        fav: "No",
      });
      if (data) {
        getAllProduct();
      }
    } catch (error) {
      toast.error("Something Happen");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllProduct();
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    getAllProduct();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden ">
      <Navbar />

      <div className=" text-xl overflow-hidden min-h-[550px] sm:min-h-[650px] hero-bg-color flex flex-col pt-8 gap-y-3.5 ">
        <div className="overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex  items-center flex-col pt-16 gap-y-3.5">
          <div className="">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 pl-5 gap-2">
              {products.map((p) => (
                <div className="group" key={p._id}>
                  <div className="relative">
                    {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                    <img
                      onClick={() => {
                        // navigate("/shop")
                        navigate(`/product/${p._id}`);
                      }}
                      src={`${
                        CloudinaryConfig.CLOUDINARY_URL
                      }/image/upload/${p?.image_id[0]?.replace(/"/g, "")}`}
                      alt=""
                      className="sm:h-[190px] sm:w-[220px] w-[150px] h-[170px]  object-fit rounded-md"
                    />
                  </div>
                  <div className="flex justify-between ">
                    <div>
                      <h2 className="sm:font-semibold text-[15px]">{p.name}</h2>
                      <h2 className="sm:font-bold ">
                        <span className="line-through  sm:text-[16px] text-[12px]">
                          ₹{p.price}
                        </span>
                        <span className="ml-1 text-red-600 text-[12px] sm:text-[16px]">
                          ₹ {p.discountedPrice}
                        </span>
                        <span className=" text-gray-500 text-[10px] sm:text-[14px] ml-1 ">
                          ({p.discount} % OFF)
                        </span>
                      </h2>
                    </div>

                    <button type="button" className="relative p-3">
                      {/* <GrFavorite className="text-xl text-gray-600 dark:text-gray-400" /> */}
                      <FaHeart
                        size={17}
                        className={
                          p.fav === "Yes" ? "text-red-600" : "text-gray-400 "
                        }
                        onClick={(e) => handleIsWistlist(e, p)}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ChatBox />
      <Footer />
    </div>
  );
};

export default Wishlist;
