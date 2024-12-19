import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CloudinaryConfig } from "../../../Cloudinary";
import Heading from "../Shared/Heading";
import { fetchProducts } from "../../BaseURL/Product";
import { fetchSubCategory } from "../../BaseURL/SubCategory";
import { useNavigate } from "react-router-dom";
import { Box, ScrollArea } from "@mantine/core";

const Handicraft = () => {
  const navigate = useNavigate();
  const [filteredHandicraftList, setFilterHandicraftList] = useState([]);
  const [activeSubCategory, setActiveSubCategory] = useState(null);

  //   product fetching
  const { data: handicraftData = {} } = useQuery({
    queryKey: ["handicraft"],
    queryFn: fetchProducts,
  });
  const handicraftLists = handicraftData?.products || [];

  const { data: subCategoryData = {} } = useQuery({
    queryKey: ["subcategorylist"],
    queryFn: fetchSubCategory,
  });
  const subCategoryDataLists = subCategoryData?.subCategory || [];

  const sortedSubCategoryDataLists = [...subCategoryDataLists].sort((a, b) => {
    if (a.subCategoryName && b.subCategoryName) {
      return a.subCategoryName
        .toLowerCase()
        .localeCompare(b.subCategoryName.toLowerCase());
    }
    return 0;
  });

  useEffect(() => {
    let filteredProducts = handicraftLists?.filter(
      (handicraftItem) => handicraftItem?.gender === "Neutral"
    );

    // Filter by active subcategory ID
    if (activeSubCategory) {
      filteredProducts = filteredProducts?.filter(
        (item) => item.subcategory._id === activeSubCategory
      );
    }

    const sortedHandicraftList = filteredProducts?.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setFilterHandicraftList(sortedHandicraftList);
  }, [handicraftLists, activeSubCategory]);

  return (
    <div className="p-4 drop-shadow-md">
      <Heading title="Handicraft Products" subtitle="Explore our products" />

      {/* Subcategory Filter Buttons */}
      <div className="flex space-x-2 mb-4">
        <div className="flex-shrink-0">
          {/* The "All" button stays fixed */}
          <button
            type="button"
            key="all"
            onClick={() => setActiveSubCategory(null)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeSubCategory === null
                ? "bg-red-400 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All
          </button>
        </div>
        <ScrollArea type="never">
          <Box className="flex flex-grow gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full h-9">
            {sortedSubCategoryDataLists?.map((subcategory) => (
              <button
                type="button"
                key={subcategory._id}
                onClick={() => setActiveSubCategory(subcategory._id)}
                className={`sm:px-4 sm:py-2 px-5 rounded-full text-sm transition-colors whitespace-nowrap ${
                  activeSubCategory === subcategory._id
                    ? "bg-red-400 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {subcategory?.subCategoryName}
              </button>
            ))}
          </Box>
        </ScrollArea>
      </div>

      {/* Scrollable Product List */}
      <div className="overflow-x-scroll scrollbar-hide flex space-x-4 pb-6 scroll-smooth">
        <div className="flex sm:gap-5 gap-4 ">
          {filteredHandicraftList?.length > 0 ? (
            filteredHandicraftList.map((item) => (
              <div
                key={item._id}
                className="bg-gray-100 drop-shadow-md sm:h-[350px] sm:w-[250px] h-[250px] w-[180px] rounded-lg flex flex-col items-center"
              >
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                <img
                  onClick={() => navigate(`/product/${item._id}`)}
                  src={`${
                    CloudinaryConfig.CLOUDINARY_URL
                  }/image/upload/${item?.image_id?.[0]?.replace(/"/g, "")}`}
                  alt={item.name}
                  className="sm:w-52 sm:h-52 w-[150px] h-[160px] object-cover rounded-md m-auto"
                />
                <div className="flex justify-between sm:pb-2 p-1 gap-1 sm:gap-2 sm:pl-4 pl-3 sm:pr-3 w-full">
                  <div className="sm:text-[16px] text-[11px] text-black">
                    <p>{item.name}</p>
                    <div className="flex items-center">
                      <p className="text-[13px] sm:text-[15px] pr-2 line-through opacity-65">
                        ₹{item.price}
                      </p>
                      <p className="text-red-500 pr-1 sm:text-[16px] text-[14px]">
                        ₹{item.discountedPrice}
                      </p>
                    </div>
                    <p className="text-emerald-500 sm:text-[13px] text-[11px]">
                      ({item.discount}% OFF)
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/product/${item._id}`)}
                    type="button"
                    className="bg-red-600 hover:bg-red-500 sm:text-[16px] text-[10px] text-center pt-[3px] sm:w-[80px] sm:h-[38px] w-[45px] h-6 text-white rounded-md"
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 w-full">
              No products available for this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Handicraft;
