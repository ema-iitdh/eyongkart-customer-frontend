import React, { useEffect, useState } from "react";
import { ScrollArea, Box } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { CloudinaryConfig } from "../../../Cloudinary";
import { Link, useNavigate } from "react-router-dom";
import Heading from "../Shared/Heading";

import { fetchProducts } from "../../BaseURL/Product";

const Handicraft = () => {
  const navigate = useNavigate();
  const [filteredHandicraftList, setFilterHandicraftList] = useState([]);

  const { data: handicraftData = {} } = useQuery({
    queryKey: ["handicraft"],
    queryFn: fetchProducts,
  });

  const handicraftLists = handicraftData?.products || [];

  useEffect(() => {
    const filteredHandicraftProduct = handicraftLists?.filter(
      (handicraftItem) => handicraftItem?.gender === "Neutral"
    );

    const sortedHandicraftList = filteredHandicraftProduct?.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setFilterHandicraftList(sortedHandicraftList);
  }, [handicraftLists]);

  return (
    <div className="p-2 drop-shadow-md">
      <div className="overflow-hidden rounded-xl sm:h-[420px] h-[330px] ">
        <Heading
          title="Handicraft Products"
          subtitle={"Explore our products"}
        />
        <ScrollArea type="never">
          <Box>
            <div className="flex sm:gap-5 gap-2 p-2">
              {filteredHandicraftList?.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="bg-gray-100 drop-shadow-md sm:h-[340px] sm:w-[250px] h-[240px] w-[180px] rounded-lg flex flex-col items-center "
                  >
                    <div className="">
                      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                      <img
                        onClick={() => navigate(`/product/${item._id}`)}
                        className="sm:w-52 sm:h-56 w-[150px] h-[160px] object-fit m-auto p-3"
                        src={`${
                          CloudinaryConfig.CLOUDINARY_URL
                        }/image/upload/${item?.image_id?.[0]?.replace(
                          /"/g,
                          ""
                        )}`}
                        alt=""
                      />
                    </div>
                    <div className="flex justify-between sm:p-1 p-1 gap-1 sm:gap-2 sm:pl-4 pl-3 w-full">
                      <div className="sm:text-[16px] text-[11px] text-black">
                        <p className="">{item?.name}</p>
                        <div className="flex items-center">
                          <p className="text-[13px] sm:text-[15px] pr-2 line-through opacity-65">
                            ₹{item.price}
                          </p>
                          <p className="text-red-500 pr-1 sm:text-[16px] text-[14px]">
                            ₹{item.discountedPrice}
                          </p>
                        </div>
                        <p className="text-emerald-500 sm:text-[13px] text-[11px]">
                          ({item.discount} % OFF)
                        </p>
                      </div>
                      <button
                        onClick={() => navigate(`/product/${item._id}`)}
                        type="button"
                        className="bg-red-600 hover:bg-red-500 sm:text-[16px] text-[10px] text-center pt-[3px] sm:w-[80px] sm:h-[38px] w-[45px] h-6 text-white rounded-md"
                      >
                        Visit
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Box>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Handicraft;
