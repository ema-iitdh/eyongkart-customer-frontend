import Button from "../Shared/Button";
import React from "react";
import Top from "../../assets/Category/top.png";
import Phanek from "../../assets/Category/phanek.png";
import Muka from "../../assets/Category/muka.png";
import { Link } from "react-router-dom";
const Category2 = () => {
  return (
    // <div className="container h-[380px]  hero-bg-color mt-10 rounded-3xl   ">
    <div className=" py-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* first col */}

        <div className="py-10 pl-5 bg-gradient-to-br from-gray-600/90 to-gray-300 text-white rounded-3xl relative h-[320px] flex items-end ">
          {/* <img
              src={Category1}
              alt=""
              className="w-[210px] h-4/6 absolute bottom-4 ml-4  mb-6 top-2 rounded-md"
            /> */}

          <div>
            <div className=" mb-4">
              {/* <p className="text-2xl font-semibold  mb-[2px] ">
                  Beauty of Rani phi
                </p> */}
              <p className="mb-[2px] text-white">Design</p>
              <p className="text-2xl font-semibold mb-[2px] "> of the </p>
              <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">
                Top
              </p>
              <Link to="/shopByCategory/Top">
                <Button
                  text="Browse"
                  bgColor={"bg-primary"}
                  textColor={"text-white"}
                />
              </Link>
              <img
                src={Top}
                alt=""
                className="w-[270px] h-4/6 absolute bottom-4 ml-6  mb-6 top-2 rounded-md"
              />
            </div>
          </div>
        </div>
        {/* second column */}

        <div className="sm:col-span-2 py-10 pl-5 bg-gradient-to-br from-gray-600/90 to-gray-300 text-white rounded-3xl relative h-[320px] flex items-end">
          <div>
            <div className="space-y-2 mb-4 ">
              {/* <p className="text-2xl font-semibold  mb-[2px] ">
                  Beauty of Wangkhei Phi
                </p> */}
              <p className="mb-[2px] text-white">Beauty</p>
              <p className="text-2xl font-semibold  "> of the </p>
              <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">
                Muka suit
              </p>
              <Link to="/shopByCategory/Muka-Phee">
                <Button
                  text="Browse"
                  bgColor={"bg-primary"}
                  textColor={"text-white"}
                />
              </Link>
              <img
                src={Muka}
                alt=""
                className="w-[340px] h-5/6 absolute top-1/2 -translate-y-1/2 -right-0"
              />
            </div>
          </div>
        </div>
        {/* third column */}
        <div className="py-10 pl-5 bg-gradient-to-br from-gray-600/90 to-gray-300 text-white rounded-3xl relative h-[320px] flex items-end">
          <div>
            <div className=" mb-4">
              <p className="text-2xl font-semibold  mb-[2px] ">
                Beauty of Phanek Mayek Naibi
              </p>
              {/* <p className="mb-[2px] text-white-400 ">Beauty</p>
                <p className="text-2xl font-semibold mb-[2px] "> of the </p>
                <p className="text-2xl xl:text-3xl font-bold opacity-20 mb-2">
                  Phanek Mayek Naibi
                </p> */}
              <Link to="/shopByCategory/Phanek">
                <Button
                  text="Browse"
                  bgColor={"bg-primary"}
                  textColor={"text-white"}
                />
              </Link>
              <img
                src={Phanek}
                alt=""
                className="w-[250px] h-3/5 absolute bottom-4  mb-6 top-2 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Category2;
