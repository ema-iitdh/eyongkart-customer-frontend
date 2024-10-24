import React from "react";
import { ScrollArea, Box } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "../../../api";
import { CloudinaryConfig } from "../../../Cloudinary";

const PriceStores = () => {
  const fetchCategories = async () => {
    const response = await Axios.get("/category");
    return response.data;
  };
  const categoriesCompoment = useQuery({
    queryKey: "categories",
    queryFn: fetchCategories,
  });
  const categoryList = categoriesCompoment?.data?.categories?.map(
    (category) => category
  );
  console.log(categoryList);

  return (
    <div className="p-2 drop-shadow-md">
      <div className="  overflow-hidden rounded-xl sm:h-[400px] h-[350px]  hero-bg-color ">
        <h1 className=" flex justify-start items-start text-xl font-semibold hover:text-red-500  text-black dark:text-white pl-5 pt-2 ">
          Price Stores
        </h1>
        <ScrollArea
          // h={480}
          // w={800}
          type="never"
          // scrollbars="x"
          // scrollHideDelay={200}
        >
          <Box>
            <div className=" flex flex-grow gap-2 p-5">
              {categoryList?.map((item, id) => {
                return (
                  <div
                    key={item.id}
                    className=" bg-gray-100 drop-shadow-md  sm:h-[320px] sm:w-[250px] h-[270px] w-[180px] rounded-lg flex flex-col items-center justify-center"
                  >
                    <img
                      className="sm:w-[220px] sm:h-[220px] w-[150px] h-[170px]  object-fit rounded-md "
                      src={`${
                        CloudinaryConfig.CLOUDINARY_URL
                      }/image/upload/${item.image?.replace(/"/g, "")}`}
                      alt=""
                    />
                    <div className="w-full flex flex-col justify-center items-center p-2">
                      <h2 className="text-gray-500 sm:text-[18px] text-[15px]">
                        {item.name}
                      </h2>
                      <h2 className="text-black sm:text-[20px] text-[15px] hover:text-red-500">
                        Around 120000
                      </h2>
                    </div>
                  </div>
                );
              })}
            </div>
          </Box>
        </ScrollArea>
      </div>
    </div>
    // </div>
  );
};

export default PriceStores;
