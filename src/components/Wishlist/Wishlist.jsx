import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { TiDeleteOutline } from "react-icons/ti";
import { ShopContext } from "../Context/ShopContext";
import Footer from "../Footer/Footer";
import instance from "../../../api";
import { FaHeart } from "react-icons/fa6";
const Wishlist = () => {
  const { cartItems, removeFromCart } = useContext(ShopContext);

  const [products, setProducts] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const getAllProduct = async () => {
    try {
      const { data } = await instance({
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
      const { data } = await instance.put(`/product/updatefav/${p._id}`, {
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

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden ">
      <Navbar />
      <div className="py-14">
        <div className="container  overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex  items-center flex-col pt-12 gap-y-3.5">
          <div className="container">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 place-items-center">
              {products.map((p) => (
                <div className="group" key={p._id}>
                  <div className="relative">
                    {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
