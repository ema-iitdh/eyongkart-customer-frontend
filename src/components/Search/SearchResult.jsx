import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../../api";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { CloudinaryConfig } from "../../../Cloudinary";
import { FaHeart } from "react-icons/fa";
const SearchResults = () => {
  const { searchTerm } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    if (!searchTerm) return;

    try {
      setLoading(true);
      const res = await Axios({
        url: "/product/allproduct",
        method: "GET",
      });

      // Filter products based on the search term
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
        setWishlistUpdate((prev) => !prev);
      }
    } catch (error) {
      toast.error("Something Happened");
    }
  };
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden pt-16">
      <Navbar />
      <div className=" text-2xl overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex  flex-col pt-8 gap-y-3.5 ">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 pl-5 ">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            // <div className="">
            <>
              {products.length > 0 ? (
                products.map((product) => (
                  <div className="group " key={product._id}>
                    <div className="relative ">
                      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                      <img
                        onClick={() => navigate(`/product/${p._id}`)}
                        src={`${
                          CloudinaryConfig.CLOUDINARY_URL
                        }/image/upload/${product?.image_id[0]?.replace(
                          /"/g,
                          ""
                        )}`}
                        alt=""
                        className="sm:h-[200px] sm:w-[250px] w-[150px] h-[170px] object-fit rounded-md "
                      />
                    </div>
                    <div className="flex justify-between leading-6">
                      <div>
                        <h2 className="sm:font-semibold text-[15px]">
                          {product?.name}
                        </h2>
                        <h3 className="gap-2">
                          <span className="ml-1 text-red-600 text-[12px] sm:text-[15px] ">
                            ₹{product.discountedPrice}
                          </span>
                          <span className="pl-2 line-through sm:text-[15px] text-[12px]">
                            ₹{product.price}
                          </span>
                        </h3>
                        <span className=" text-gray-500 text-[10px] sm:text-[14px] ml-1 ">
                          ({product.discount} % OFF)
                        </span>
                      </div>
                      <button type="button" className="relative p-3">
                        <FaHeart
                          size={20}
                          className={
                            product.fav === "Yes"
                              ? "text-red-600"
                              : "text-gray-400"
                          }
                          onClick={(e) => handleIsWishlist(e, product)}
                        />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No products found for "{searchTerm}".</p>
              )}
              {/* </div> */}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;
