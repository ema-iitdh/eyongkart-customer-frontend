import React from "react";
import { useQuery } from "@tanstack/react-query"; // Import React Query hook
import Axios from "../../api";
import { CloudinaryConfig } from "../../../Cloudinary"; // CloudinaryConfig import

// Fetch related products function
const fetchRelatedProducts = async (subcategory, currentProductId) => {
  try {
    const response = await Axios.get("/product/allproduct");
    const allProducts = response.data;

    return allProducts.filter(
      (product) =>
        product.subcategory === subcategory && product.id !== currentProductId
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Throw error so React Query can handle it
  }
};

const RelatedProduct = ({ currentProduct }) => {
  // Fetch related products using React Query
  const {
    data: relatedProducts,
    isLoading,
    error,
  } = useQuery(
    ["relatedProducts", currentProduct?.subcategory, currentProduct?.id],
    () => fetchRelatedProducts(currentProduct.subcategory, currentProduct.id),
    {
      enabled: !!currentProduct, // Only fetch if currentProduct exists
    }
  );

  if (isLoading) return <div>Loading related products...</div>;
  if (error) return <div>Error fetching related products</div>;

  return (
    <>
      <h1 className="text-center text-[20px] pb-2 underline">
        RELATED PRODUCTS
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 p-4 items-center">
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-gray-300 sm:h-[300px] sm:w-[230px] h-[240px] w-[180px] p-2 rounded-lg flex flex-col items-center justify-center"
          >
            <img
              className="sm:w-[220px] sm:h-[220px] w-[150px] h-[170px] p-3 object-cover"
              src={`${
                CloudinaryConfig.CLOUDINARY_URL
              }/image/upload/${product?.image_id[0]?.replace(/"/g, "")}`}
              alt={product.name} // Use the product name as alt text
            />
            <div className="w-full flex flex-col justify-center items-center p-2">
              <h2 className="text-black sm:text-[18px] text-[15px]">
                {product.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RelatedProduct;
