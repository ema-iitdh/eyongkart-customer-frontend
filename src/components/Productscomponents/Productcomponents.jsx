import React from "react";
import { Link } from "react-router-dom";
import rani from "../../assets/images/rani6.jpg";
import wangkhei from "../../assets/images/wangkhei1.jpg";
import pheijom from "../../assets/images/pheijom5.jpg";
import blouse from "../../assets/images/top3.jpg";
import phanek from "../../assets/images/phanek1.jpg";
import top from "../../assets/images/top.jpg";
import muka from "../../assets/images/muka4.jpg";
import { Carousel } from "@mantine/carousel";
import { ScrollArea, Box } from "@mantine/core";
const ProductComponents = () => {
  return (
    <div className="pt-2">
      <div className="overflow-hidden rounded-3xl sm:h-[360px] h-[310px]  hero-bg-color ">
        {/* <h1 className=" flex justify-start items-start text-xl font-semibold hover:text-red-500  text-black dark:text-white pl-5 pt-2 ">
          Price Stores
        </h1> */}

        <ScrollArea
          // h={480}
          // w={800}
          type="never"
          // scrollbars="y"
          // scrollHideDelay={200}
        >
          <Box>
            <div className="flex flex-grow gap-2 p-5">
              <Link to="/shopByCategory/Wangkhei Phee">
                <div className=" bg-gray-300  sm:h-[320px] sm:w-[250px] h-[270px] w-[180px] rounded-lg flex flex-col items-center justify-center">
                  <img
                    className="sm:w-[220px] sm:h-[220px] w-[150px] h-[170px]  object-fit "
                    src={wangkhei}
                    alt=""
                  />
                  <div className="w-full flex flex-col justify-center items-center p-2">
                    <h2 className="text-black sm:text-[18px] text-[15px]">
                      Wangkhei Phee
                    </h2>
                    <h2 className="text-black sm:text-[20px] text-[15px] hover:text-red-500">
                      Shop now
                    </h2>
                  </div>
                </div>
              </Link>

              <Link to="/shopByCategory/Digital Print Pheijom">
                <div className=" bg-gray-300  sm:h-[320px] sm:w-[250px] h-[270px] w-[180px] rounded-lg flex flex-col items-center justify-center">
                  <img
                    className="sm:w-[220px] sm:h-[220px] w-[150px] h-[170px]  object-fit "
                    src={pheijom}
                    alt=""
                  />
                  <div className="w-full flex flex-col justify-center items-center p-2">
                    <h2 className="text-black sm:text-[18px] text-[15px]">
                      Kurta Pheijom
                    </h2>
                    <h2 className="text-black sm:text-[20px] text-[15px] hover:text-red-500">
                      Shop now
                    </h2>
                  </div>
                </div>
              </Link>
              <Link to="/shopByCategory/Blouse">
                <div className=" bg-gray-300  sm:h-[320px] sm:w-[250px] h-[270px] w-[180px] rounded-lg flex flex-col items-center justify-center">
                  <img
                    className="sm:w-[220px] sm:h-[220px] w-[150px] h-[170px]  object-fit "
                    src={blouse}
                    alt=""
                  />
                  <div className="w-full flex flex-col justify-center items-center p-2">
                    <h2 className="text-black sm:text-[18px] text-[15px]">
                      Blouse
                    </h2>
                    <h2 className="text-black sm:text-[20px] text-[15px] hover:text-red-500">
                      Shop now
                    </h2>
                  </div>
                </div>
              </Link>
              <Link to="/shopByCategory/Rani Phee">
                <div className=" bg-gray-300  sm:h-[320px] sm:w-[250px] h-[270px] w-[180px] rounded-lg flex flex-col items-center justify-center">
                  <img
                    className="sm:w-[220px] sm:h-[220px] w-[150px] h-[170px]  object-fit "
                    src={rani}
                    alt=""
                  />
                  <div className="w-full flex flex-col justify-center items-center p-2">
                    <h2 className="text-black sm:text-[18px] text-[15px]">
                      Rani phee
                    </h2>
                    <h2 className="text-black sm:text-[20px] text-[15px] hover:text-red-500">
                      Shop now
                    </h2>
                  </div>
                </div>
              </Link>
              <Link to="/shopByCategory/Phanek">
                <div className=" bg-gray-300  sm:h-[320px] sm:w-[250px] h-[270px] w-[180px] rounded-lg flex flex-col items-center justify-center">
                  <img
                    className="sm:w-[220px] sm:h-[220px] w-[150px] h-[170px]  object-fit "
                    src={phanek}
                    alt=""
                  />
                  <div className="w-full flex flex-col justify-center items-center p-2">
                    <h2 className="text-black sm:text-[18px] text-[15px]">
                      Phanek
                    </h2>
                    <h2 className="text-black sm:text-[20px] text-[15px] hover:text-red-500">
                      Shop now
                    </h2>
                  </div>
                </div>
              </Link>
              <Link to="/shopByCategory/Top">
                <div className=" bg-gray-300  sm:h-[320px] sm:w-[250px] h-[270px] w-[180px] rounded-lg flex flex-col items-center justify-center">
                  <img
                    className="sm:w-[220px] sm:h-[220px] w-[150px] h-[170px]  object-fit "
                    src={top}
                    alt=""
                  />
                  <div className="w-full flex flex-col justify-center items-center p-2">
                    <h2 className="text-black sm:text-[18px] text-[15px]">
                      Top
                    </h2>
                    <h2 className="text-black sm:text-[20px] text-[15px] hover:text-red-500">
                      Shop now
                    </h2>
                  </div>
                </div>
              </Link>
              <Link to="/shopByCategory/Muka-phee">
                <div className=" bg-gray-300  sm:h-[320px] sm:w-[250px] h-[270px] w-[180px] rounded-lg flex flex-col items-center justify-center">
                  <img
                    className="sm:w-[220px] sm:h-[220px] w-[150px] h-[170px]  object-fit "
                    src={muka}
                    alt=""
                  />
                  <div className="w-full flex flex-col justify-center items-center p-2">
                    <h2 className="text-black sm:text-[18px] text-[15px]">
                      Muka phee
                    </h2>
                    <h2 className="text-black sm:text-[20px] text-[15px] hover:text-red-500">
                      Shop now
                    </h2>
                  </div>
                </div>
              </Link>
            </div>
          </Box>
        </ScrollArea>
      </div>
    </div>
    // </div>
  );
};

export default ProductComponents;
