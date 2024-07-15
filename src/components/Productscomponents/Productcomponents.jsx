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
const Productcomponents = () => {
  return (
    <div className="pt-2">
      <div className="overflow-hidden rounded-3xl h-[350px] sm:h-[380px] hero-bg-color flex flex-row ">
        {/* <div className="grid grid-cols-1 p-3 sm:grid-cols-3 md:grid-cols-5 gap-5 items-center "> */}
        <ScrollArea
          // h={480}
          // w={800}
          type="never"
          // scrollbars="y"
          // scrollHideDelay={200}
        >
          <Box>
            <div className="flex flex-grow gap-2 p-5">
              <Link to="/shopByCategory/Rani-Phee">
                <div className=" bg-gray-300  h-[320px] w-[250px]  rounded-lg flex flex-col items-center justify-center">
                  <img className="w-[220px] h-[220px]" src={rani} alt="" />
                  <div className="w-full flex flex-col justify-center items-center">
                    <h2 className="text-black text-[18px]">Rani phee</h2>
                    <h2 className="text-black text-[20px] hover:text-red-500">
                      Shop Now
                    </h2>
                  </div>
                </div>
              </Link>

              <Link to="/shopByCategory/Wangkhei-Phee">
                <div className=" bg-gray-300 h-[320px] w-[250px]  rounded-lg flex flex-col items-center justify-center">
                  <img className="w-[220px] h-[220px]" src={wangkhei} alt="" />
                  <div className="w-full flex flex-col items-center justify-center">
                    <h2 className="text-black text-[18px]">Wangkhei phee</h2>
                    <h2 className="text-black text-[20px] hover:text-red-500">
                      Shop Now
                    </h2>
                  </div>
                </div>
              </Link>

              <Link to="/shopByCategory/Digital-Print-Pheijom">
                <div className=" bg-gray-300 h-[320px] w-[250px]  rounded-lg flex flex-col items-center justify-center">
                  <img className="w-[220px] h-[220px]" src={pheijom} alt="" />
                  <div className="w-full flex flex-col items-center justify-center">
                    <h2 className="text-black text-[18px]">Kurta pheijom</h2>
                    <h2 className="text-black text-[20px] hover:text-red-500">
                      Shop Now
                    </h2>
                  </div>
                </div>
              </Link>
              <Link to="/shopByCategory/Blouse">
                <div className=" bg-gray-300 h-[320px] w-[250px]  rounded-lg flex flex-col items-center justify-center">
                  <img className="w-[220px] h-[220px]" src={blouse} alt="" />
                  <div className="w-full flex flex-col items-center justify-center">
                    <h2 className="text-black text-[18px]">Blouse</h2>
                    <h2 className="text-black text-[20px] hover:text-red-500">
                      Shop Now
                    </h2>
                  </div>
                </div>
              </Link>
              <Link to="/shopByCategory/Top">
                <div className=" bg-gray-300 h-[320px] w-[250px]  rounded-lg flex flex-col items-center justify-center">
                  <img className="w-[220px] h-[220px]" src={top} alt="" />
                  <div className="w-full flex flex-col items-center justify-center">
                    <h2 className="text-black text-[18px]">Top</h2>
                    <h2 className="text-black text-[20px] hover:text-red-500">
                      Shop Now
                    </h2>
                  </div>
                </div>
              </Link>
              <Link to="/shopByCategory/Muka-phee">
                <div className=" bg-gray-300 h-[320px] w-[250px]  rounded-lg flex flex-col items-center justify-center">
                  <img className="w-[220px] h-[220px]" src={muka} alt="" />
                  <div className="w-full flex flex-col items-center justify-center">
                    <h2 className="text-black text-[18px]">Muka phee</h2>
                    <h2 className="text-black text-[20px] hover:text-red-500">
                      Shop Now
                    </h2>
                  </div>
                </div>
              </Link>
              <Link to="/shopByCategory/Phanek">
                <div className=" bg-gray-300 h-[320px] w-[250px]  rounded-lg flex flex-col items-center justify-center">
                  <img className="w-[220px] h-[220px]" src={phanek} alt="" />
                  <div className="w-full flex flex-col items-center justify-center">
                    <h2 className="text-black text-[18px]">Phanek</h2>
                    <h2 className="text-black text-[20px] hover:text-red-500">
                      Shop Now
                    </h2>
                  </div>
                </div>
              </Link>
            </div>
          </Box>
        </ScrollArea>
        {/* </div> */}
      </div>
    </div>
    // </div>
  );
};

export default Productcomponents;
