import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../../api";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { CloudinaryConfig } from "../../../Cloudinary";
import { FaHeart } from "react-icons/fa";
import { ScrollArea, Skeleton } from "@mantine/core";
import Sort from "../SidebarSort/Sort";
import ChatBox from "../Chat/ChatBox";

const SearchResults = () => {
  const { searchTerm } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    if (!searchTerm) return;

    try {
      setLoading(true);
      const res = await Axios.get("/product/allproduct");

      const filteredProducts = res.data.products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(filteredProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm]);

  const handleIsWishlist = async (e, product) => {
    e.preventDefault();
    try {
      const { data } = await Axios.put(`/product/updatefav/${product._id}`, {
        fav: product.fav === "No" ? "Yes" : "No",
      });
      if (data) {
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p._id === product._id ? { ...p, fav: data.fav } : p
          )
        );
      }
    } catch (error) {
      console.error("Something happened:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 pt-16">
      <Navbar />
      <div className="flex flex-col sm:flex-row gap-4 p-4 min-h-[550px] sm:min-h-[650px] hero-bg-color">
        <div className=" w-full sm:w-[280px]">
          <Sort />
        </div>
        <div className="w-full p-2 ml-2">
          {loading ? (
            <div className="grid sm:grid-cols-2 grid-rows-2 gap-2">
              <Skeleton height={300} width={250} />
              <Skeleton height={300} width={250} />
              <Skeleton height={300} width={250} />
              <Skeleton height={300} width={250} />
            </div>
          ) : (
            <ScrollArea h={500} type="never">
              {products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                  {products.map((product) => (
                    <div className="group" key={product._id}>
                      <div className="relative">
                        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                        <img
                          onClick={() => navigate(`/product/${product._id}`)}
                          src={`${
                            CloudinaryConfig.CLOUDINARY_URL
                          }/image/upload/${product.image_id[0]?.replace(
                            /"/g,
                            ""
                          )}`}
                          alt={product.name}
                          className="sm:h-[200px] sm:w-[220px] w-[150px] h-[170px] object-fit rounded-md"
                        />
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <div>
                          <h2 className="text-[15px] font-semibold">
                            {product.name}
                          </h2>
                          <div className="flex items-center gap-2">
                            <span className="text-red-600 text-[14px]">
                              ₹{product.discountedPrice}
                            </span>
                            <span className="line-through text-gray-500 text-[12px]">
                              ₹{product.price}
                            </span>
                          </div>
                          <span className="text-gray-500 text-[10px]">
                            ({product.discount} % OFF)
                          </span>
                        </div>
                        <button
                          type="button"
                          className="p-3 sm:mr-4"
                          onClick={(e) => handleIsWishlist(e, product)}
                        >
                          <FaHeart
                            size={20}
                            className={
                              product.fav === "Yes"
                                ? "text-red-600"
                                : "text-gray-400"
                            }
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center bg-white border text-red-600 rounded-lg p-6 max-w-xs md:max-w-md w-full shadow-md">
                  <img
                    src="/Product is Empty.png"
                    alt="No products found"
                    className="mx-auto mb-4 w-24 h-24"
                  />
                  <p className="text-lg font-semibold">
                    No products found for "{searchTerm}"
                  </p>
                  <p className="text-sm text-red-500 mt-2">
                    Try searching with a different products.
                  </p>
                </div>
              )}
            </ScrollArea>
          )}
        </div>
      </div>
      <ChatBox />
      <Footer />
    </div>
  );
};

export default SearchResults;
