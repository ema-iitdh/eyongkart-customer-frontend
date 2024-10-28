import React from "react";
import { ScrollArea, Box } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "../../../api";
import { Link } from "react-router-dom";
const Category = () => {
  const fetchCategories = async () => {
    const response = await Axios.get("/category");
    return response.data;
  };
  const categoriesComponent = useQuery({
    queryKey: "categories",
    queryFn: fetchCategories,
  });
  const categoryList = categoriesComponent?.data?.categories?.map(
    (category) => category
  );
  // console.log(categoryList);

  return (
    <div className="mt-16 p-1 drop-shadow-md">
      <div className="overflow-hidden rounded-xl sm:h-[100px] h-[60px] ">
        <ScrollArea type="never">
          <Box>
            <Link to="/sorted">
              <div className=" flex flex-grow gap-2 p-2 sm:mt-4 ">
                {categoryList?.map((item, id) => {
                  return (
                    <button
                      type="button"
                      key={item.id}
                      className=" bg-white hover:bg-red-400 drop-shadow-md sm:h-[50px] sm:w-[130px] h-[40px] w-[100px] rounded-2xl flex  items-center justify-center"
                    >
                      <div className="w-full flex flex-col justify-center items-center text-center">
                        <h2
                          type="button"
                          className="text-black sm:text-[15px] drop-shadow-md text-[12px] hover:text-white"
                        >
                          {item.name}
                        </h2>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Link>
          </Box>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Category;
