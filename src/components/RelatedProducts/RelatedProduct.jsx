import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  // const queryClient = useQueryClient();
  const handleOnclickProduct = (productId) => {
    setCurrentProductId(productId);
    navigate(`/product/${productId}`);
    // queryClient.invalidateQueries(["relatedproduct", productId]);
    // console.log("working");
  };

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
                  className="bg-white sm:h-[330px] sm:w-[250px] h-[270px] w-[180px] shadow-lg transition-shadow duration-300 border border-gray-400 rounded-lg overflow-hidden p-3 flex flex-col items-center"
                >
                  <div className="relative">
                    {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                    <img
                      onClick={() => {
                        handleOnclickProduct(product._id);
                      }}
                      className="sm:h-[190px] sm:w-[250px] w-[150px] h-[170px] object-fit rounded-md"
                      src={`${
                        CloudinaryConfig.CLOUDINARY_URL
                      }/image/upload/${product?.image_id[0]?.replace(
                        /"/g,
                        ""
                      )}`}
                      alt={product.name}
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
                  <div className="w-full flex justify-between sm:p-2">
                    <div className="sm:text-[16px] text-[12px] text-black">
                      <p className="">{product.name}</p>
                      <div className="flex items-center gap-3 py-2">
                        <Rating value={product?.averageRating} fractions={2} />
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
