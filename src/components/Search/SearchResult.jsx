import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../api";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { CloudinaryConfig } from "../../../Cloudinary";
import { FaHeart } from "react-icons/fa";
import { Rating, ScrollArea, Skeleton } from "@mantine/core";
import Sort from "../SidebarSort/Sort";
import ChatBox from "../Chat/ChatBox";
import { handleIsWishlist } from "../WishlistFunction/WishlistFunction";

const SearchResults = () => {
  const navigate = useNavigate();
  const { searchTerm } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    if (!searchTerm) return;

    try {
      setLoading(true);
      const res = await Axios.get("/product/allproduct");

      const normalizedSearchTerm = searchTerm.replace(/\s+/g, "").toLowerCase();

      // Try exact match first
      let filteredProducts = res.data.products.filter((product) => {
        const normalizedName = product.name.replace(/\s+/g, "").toLowerCase();
        const normalizedCategory = product.category?.name
          .replace(/\s+/g, "")
          .toLowerCase();
        const normalizedSubcategory = product.subcategory?.subCategoryName
          .replace(/\s+/g, "")
          .toLowerCase();
        const normalizedCollection = product.collection?.name
          .replace(/\s+/g, "")
          .toLowerCase();

        return (
          normalizedName.includes(normalizedSearchTerm) ||
          normalizedCategory?.includes(normalizedSearchTerm) ||
          normalizedSubcategory?.includes(normalizedSearchTerm) ||
          normalizedCollection?.includes(normalizedSearchTerm)
        );
      });

      if (filteredProducts.length === 0) {
        const partialSearchTerms = [];
        for (let i = 1; i <= normalizedSearchTerm.length; i++) {
          partialSearchTerms.push(normalizedSearchTerm.slice(0, i));
        }

        filteredProducts = res.data.products.filter((product) => {
          const normalizedName = product.name.replace(/\s+/g, "").toLowerCase();
          const normalizedCategory = product.category?.name
            .replace(/\s+/g, "")
            .toLowerCase();
          const normalizedSubcategory = product.subcategory?.subCategoryName
            .replace(/\s+/g, "")
            .toLowerCase();
          const normalizedCollection = product.collection?.name
            .replace(/\s+/g, "")
            .toLowerCase();

          return partialSearchTerms.some(
            (term) =>
              normalizedName.startsWith(term) ||
              normalizedCategory?.startsWith(term) ||
              normalizedSubcategory?.startsWith(term) ||
              normalizedCollection?.startsWith(term)
          );
        });
      }

      // Sort the products in alphabetical order by name
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));

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

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 pt-16">
      <Navbar />
      <div className="flex flex-col sm:flex-row gap-4 p-4 min-h-[550px] sm:min-h-[650px] ">
        <div className="w-full sm:w-[280px]">
          <Sort />
        </div>
        <div className="w-full p-2 ">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:pl-2 pt-3">
              {[...Array(8)].map((_, index) => (
                <Skeleton
                  key={index}
                  height={200}
                  width="100%"
                  radius="md"
                  className="sm:h-[230px] sm:w-[250px] w-[160px] h-[170px] bg-gray-200 mb-4"
                />
              ))}
            </div>
          ) : (
            <ScrollArea h={500} type="never">
              {products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:pl-2">
                  {products.map((product) => (
                    <div
                      className="group shadow-md hover:shadow-lg border border-gray-400 sm:p-3 p-2 rounded-md"
                      key={product._id}
                    >
                      <div className="relative">
                        <img
                          onClick={() => navigate(`/product/${product._id}`)}
                          src={`${
                            CloudinaryConfig.CLOUDINARY_URL
                          }/image/upload/${product.image_id[0]?.replace(
                            /"/g,
                            ""
                          )}`}
                          alt={product.name}
                          className="sm:h-[190px] sm:w-[250px] w-[150px] h-[170px] object-fit rounded-md"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-slate-50 p-[5px] sm:p-[8px] rounded-full"
                        >
                          <FaHeart
                            className={
                              product.fav === "Yes"
                                ? "text-red-600"
                                : "text-gray-400"
                            }
                            onClick={(e) => handleIsWishlist(e, product)}
                          />
                        </button>
                      </div>
                      <div className="w-full flex justify-between sm:p-2 mt-2">
                        <div className="sm:text-[16px] text-[12px] text-black">
                          <p className="">{product.name}</p>
                          <div className="flex items-center gap-3 py-2">
                            <Rating
                              value={product?.averageRating}
                              fractions={2}
                            />
                            <span className="text-orange-500 sm:text-sm text-[10px]">
                              ({product?.totalReviews})
                            </span>
                          </div>
                          <div className="flex w-full  ">
                            <p className="text-[13px] sm:text-[15px]  pr-2 line-through opacity-65">
                              ₹{product.price}
                            </p>
                            <p className="text-red-500 pr-1 sm:text-[16px] text-[14px]">
                              ₹{product.discountedPrice}
                            </p>
                            <p className="text-emerald-500 sm:text-[13px] text-[11px]">
                              ({product.discount} % OFF)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center w-full min-h-[calc(100vh-200px)] sm:p-36 sm:pt-10 pb-20">
                  <div className="flex flex-col items-center bg-white border border-gray-300 rounded-lg p-6 sm:p-8 shadow-lg w-full max-w-3xl text-center">
                    <img
                      src="/Product-is-Empty.png"
                      alt="No products found"
                      className="w-20 h-20 sm:w-24 sm:h-24 mb-4"
                    />
                    <p className="text-gray-800 font-semibold text-lg sm:text-xl mb-2">
                      No Products Available "{searchTerm}"
                    </p>
                    <p className="text-gray-500 text-sm sm:text-base mb-4">
                      We're sorry, but there are no products to display here.
                      Try searching with different products.
                    </p>
                    <Link
                      to="/"
                      className="mt-4 px-4 py-2 bg-red-400 text-white text-sm font-medium rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Browse
                    </Link>
                  </div>
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
