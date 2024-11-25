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

import { useWishlist } from "../../hooks/useWistlist";

const SearchResults = () => {
  const navigate = useNavigate();
  const { searchTerm } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const { isInWishlists, toggleWishlist } = useWishlist();

  const fetchProducts = async () => {
    if (!searchTerm) return;

    try {
      setLoading(true);
      const res = await Axios.get("/product/allproduct");

      const normalizedSearchTerm = searchTerm.replace(/\s+/g, "").toLowerCase();

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

  // Helper function to get paginated products
  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return products.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 pt-16">
      <Navbar />
      <div className="flex flex-col sm:flex-row gap-3 p-4 min-h-[550px] sm:min-h-[650px]">
        <div className="w-full sm:w-[280px]">
          <Sort />
        </div>
        <div className="w-full p-2">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:pl-2">
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
            <>
              {products.length > 0 ? (
                <div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:pl-2">
                    {getPaginatedProducts().map((product) => (
                      <div
                        className="group shadow-md hover:shadow-lg border border-gray-400 sm:p-3 p-2 rounded-md"
                        key={product._id}
                      >
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
                            className="sm:h-[190px] sm:w-[250px] w-[150px] h-[170px] object-fit rounded-md"
                          />
                          <button
                            onClick={(e) => {
                              toggleWishlist(product._id);
                            }}
                            type="button"
                            className="absolute top-2 right-2 bg-slate-50 p-[5px] sm:p-[8px] rounded-full"
                          >
                            <FaHeart
                              className={
                                isInWishlists(product._id)
                                  ? "text-red-600"
                                  : "text-gray-400"
                              }
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
                            <div className="flex items-center gap-1">
                              <p className="text-[13px] sm:text-[15px] line-through opacity-65">
                                ₹{product.price}
                              </p>
                              <p className="text-red-500 sm:text-[15px] text-[14px]">
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
                  <div className="flex justify-center mt-32 gap-2 items-center">
                    {/* Pagination Component */}
                    <button
                      type="button"
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === 1
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      &laquo;
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === 1
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      &lt;
                    </button>

                    {Array.from(
                      { length: Math.min(3, totalPages) },
                      (_, index) => {
                        const startPage = Math.max(
                          Math.min(currentPage - 2, totalPages - 3 + 1),
                          1
                        );
                        const page = startPage + index;

                        return (
                          page <= totalPages && (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`px-3 py-1 rounded-md ${
                                currentPage === page
                                  ? "bg-red-400 text-white"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              {page}
                            </button>
                          )
                        );
                      }
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === totalPages
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      &gt;
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === totalPages
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      &raquo;
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  No Products found for &apos;{searchTerm}&apos;
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;
