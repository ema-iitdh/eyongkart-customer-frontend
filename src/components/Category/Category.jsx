import React, { useState } from "react";
import { ScrollArea, Box, Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "../../../api";
import { Link } from "react-router-dom";

const Category = () => {
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);
    const response = await Axios.get("/category");
    return response.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: "categories",
    queryFn: fetchCategories,
  });

  // Sort categories alphabetically by name
  const categoryList = data?.categories
    ?.sort((a, b) => a.name.localeCompare(b.name)) // Sorting categories alphabetically
    .map((category) => category);

  return (
    <div className="mt-16 p-1 drop-shadow-md">
      <div className="overflow-hidden rounded-xl sm:h-[100px] h-[60px]">
        <ScrollArea type="never">
          <Box>
            <div className="flex flex-grow sm:gap-2 gap-3 p-2 sm:mt-4">
              {categoryList?.map((item) => (
                <Link to={`/sorted/${item._id}`} key={item._id}>
                  <button
                    type="button"
                    className="bg-white hover:bg-red-400 hover:text-slate-50 drop-shadow-md sm:h-[50px] sm:w-[130px] h-[40px] w-[100px] rounded-2xl flex items-center justify-center"
                    disabled={isLoading} // Disable button when loading
                  >
                    <div className="w-full flex flex-col justify-center items-center text-center">
                      <h2 className="text-black sm:text-[15px] drop-shadow-md text-[12px]">
                        {item.name}
                      </h2>
                    </div>
                  </button>
                </Link>
              ))}
            </div>
          </Box>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Category;
