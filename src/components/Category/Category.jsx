import React from "react";
import Button from "../Shared/Button";
import Category1 from "../../assets/Category/raniphi.png";
import Category2 from "../../assets/Category/pheijom.png";
import Category3 from "../../assets/Category/wangkheiphi.png";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <div className="py-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="py-10 pl-5 bg-gradient-to-br from-gray-600/90 to-gray-300 text-white rounded-3xl relative h-[320px] flex items-end  ">
            {/* <img
              src={Category1}
              alt=""
              className="w-[210px] h-4/6 absolute bottom-4 ml-4  mb-6 top-2 rounded-md"
            /> */}

            <div>
              <div className=" mb-4">
                <p className="text-2xl font-semibold  mb-[2px]  ">
                  Beauty of Rani phi
                </p>
                {/* <p className="mb-[2px] text-gray-400">Beauty</p>
                <p className="text-2xl font-semibold mb-[2px] "> of the </p>
                <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">
                  Rani phi
                </p> */}

                <Link to="/shopByCategory/Rani-Phee">
                  <Button
                    text="Browse"
                    bgColor={"bg-primary"}
                    textColor={"text-white"}
                  />
                </Link>

                <img
                  src={Category1}
                  alt=""
                  className="w-[250px] h-3/5 absolute bottom-4  mb-6 top-2 rounded-md"
                />
              </div>
            </div>
          </div>
          {/* second column */}
          <div className="py-10 pl-5 bg-gradient-to-br from-gray-600/90 to-gray-300 text-white rounded-3xl relative h-[320px] flex items-end">
            <div>
              <div className=" mb-4">
                <p className="text-2xl font-semibold  mb-[2px] ">
                  Beauty of Pheijom
                </p>
                {/* <p className="mb-[2px] text-gray-400">Beauty</p>
                <p className="text-2xl font-semibold mb-[2px] "> of the </p>
                <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">
                  Rani phi
                </p> */}
                <Link to="/shopByCategory/Pheijom">
                  <Button
                    text="Browse"
                    bgColor={"bg-primary"}
                    textColor={"text-white"}
                  />
                </Link>
                <img
                  src={Category2}
                  alt=""
                  className="w-[280px] h-4/6 absolute bottom-4  mb-6 top-2 rounded-md"
                />
              </div>
            </div>
          </div>
          {/* third column */}
          <div className="sm:col-span-2 py-10 pl-5 bg-gradient-to-br from-gray-600/90 to-gray-300 text-white rounded-3xl relative h-[320px] flex items-end">
            <div>
              <div className="space-y-2 mb-4 ">
                {/* <p className="text-2xl font-semibold  mb-[2px] ">
                  Beauty of Wangkhei Phi
                </p> */}
                <p className="mb-[2px] text-white">Beauty</p>
                <p className="text-2xl font-semibold  "> of the </p>
                <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">
                  Wangkhei phi
                </p>
                <Link to="/shopByCategory/Wangkhei-Phee">
                  <Button
                    text="Browse"
                    bgColor={"bg-primary"}
                    textColor={"text-white"}
                  />
                </Link>
                <img
                  src={Category3}
                  alt=""
                  className="w-[280px] h-5/6 absolute top-1/2 -translate-y-1/2 -right-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
