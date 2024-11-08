import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { CloudinaryConfig } from "../../../Cloudinary";
import { fetchProducts } from "../../BaseURL/Product";
import { Rating } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { handleIsWishlist } from "../WishlistFunction/WishlistFunction";
import { FaHeart } from "react-icons/fa";
import { ScrollArea, Box } from "@mantine/core";

const RelatedProduct = ({ productId }) => {
  const [currentProductId, setCurrentProductId] = useState(productId);
  const navigate = useNavigate();

  const {
    data: relatedproducts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["relatedproduct"],
    queryFn: fetchProducts,
  });

  // Find the current product by its ID
  const currentProduct = relatedproducts?.products?.find(
    (product) => product._id === currentProductId
  );

  let relatedProducts = [];
  if (currentProduct) {
    relatedProducts = relatedproducts?.products?.filter((product) => {
      const subcategoryMatch =
        product.subcategory.category === currentProduct.subcategory.category;
      const isDifferentProduct = product._id !== currentProduct._id;

      return subcategoryMatch && isDifferentProduct;
    });
  }

  useEffect(() => {
    // Scroll to top smoothly when currentProductId changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentProductId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[200px]">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-4 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-700">Loading, Please wait...</p>
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching products</div>;
  }

  return (
    <>
      <h1 className="text-center sm:text-[24px] font-semibold underline text-gray-800">
        Related Products
      </h1>
      <ScrollArea type="never">
        <Box>
          <div className="flex flex-grow gap-2 p-3 sm:pl-4 mt-2 pb-5">
            {relatedProducts?.length > 0 ? (
              relatedProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white sm:h-[330px] sm:w-[250px] h-[270px] w-[180px] shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden p-3 flex flex-col items-center"
                  onClick={() => {
                    setCurrentProductId(product._id);
                    navigate(`/product/${product._id}`);
                    setTimeout(() => window.location.reload(), 0);
                  }}
                >
                  <img
                    className="sm:h-[190px] sm:w-[220px] w-[150px] h-[170px] p-2 object-fit rounded-md"
                    src={`${
                      CloudinaryConfig.CLOUDINARY_URL
                    }/image/upload/${product?.image_id[0]?.replace(/"/g, "")}`}
                    alt={product.name}
                  />
                  <div className="w-full flex justify-between sm:p-2">
                    <div className="sm:text-[16px] text-[11px] text-black">
                      <p className="">{product.name}</p>
                      <div className="flex items-center gap-3 py-2">
                        <Rating value={product?.averageRating} fractions={2} />
                        <span className="text-orange-500 sm:text-sm text-[10px]">
                          ({product?.totalReviews})
                        </span>
                      </div>
                      <div className="flex w-[130px] sm:w-[160px]">
                        <p className="text-black pr-1 line-through">
                          ₹{product.price}
                        </p>
                        <p className="text-red-500 pr-1">
                          ₹{product.discountedPrice}
                        </p>
                        <p className="text-gray-400 text-[10px]">
                          ({product.discount} % OFF)
                        </p>
                      </div>
                    </div>
                    <div className="pl-4">
                      <button
                        type="button"
                        className="relative sm:p-3 pr-3 pt-2"
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
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center text-center text-gray-700 bg-gray-50 border border-gray-200 rounded-lg shadow-md col-span-full w-full py-8">
                <div className="flex flex-col items-center">
                  <p className="text-lg font-semibold mb-2">
                    No Related Products Found
                  </p>
                  <p className="text-sm text-gray-500">
                    Please try searching for any products or check back later.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Box>
      </ScrollArea>
    </>
  );
};

export default RelatedProduct;
