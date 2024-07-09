import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import pic1 from "../../assets/images/rani1.jpg";
const Offers = (props) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <div className="container  pt-6">
        <div className="overflow-hidden rounded-3xl h-[350px] sm:h-[400px] hero-bg-color flex justify-center items-center bg-green-400">
          <div className="container pb-2 ml-0 pr-0  sm:pb-0">
            <h1 className=" flex justify-start items-start text-2xl font-semibold text-red-500 hover:text-black dark:hover:text-white pt-3 pb-0">
              Top sales
            </h1>
            <Carousel responsive={responsive}>
              <div className=" bg-gray-300 h-[300px] w-[250px] p-4 sm:mt-4 mt-1 rounded-lg flex flex-col items-center justify-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREO9JCt80KZ19i_5SPCZ8DXSwsaBbCTbumjQ&s"
                  alt=""
                  className="h-fill object-fill aspect-square"
                />
                {/* </Link> */}
                <div className="w-full flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">Rani phee</h2>
                    <h2 className="font-bold">₹ 2300</h2>
                  </div>
                  <button
                    type="button"
                    className="bg-red-600 hover:bg-red-500  text-white py-3 mt-2 px-4 rounded-full "
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              <div className=" bg-gray-300 h-[300px] w-[250px] p-4 sm:mt-4 mt-1 rounded-lg flex flex-col items-center justify-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaMX-Oh8phzPOnMODmYYqCKNeuEyV8RRe4fw&s"
                  alt=""
                  className="h-fill object-fill aspect-square"
                />

                <div className="w-full flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">Rani phee</h2>
                    <h2 className="font-bold">₹ 2300</h2>
                  </div>
                  <button
                    type="button"
                    className="bg-red-600 hover:bg-red-500  text-white py-3 mt-2 px-4 rounded-full "
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              <div className=" bg-gray-300 h-[300px] w-[250px] p-4 sm:mt-4 mt-1 rounded-lg flex flex-col items-center justify-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREO9JCt80KZ19i_5SPCZ8DXSwsaBbCTbumjQ&s"
                  alt=""
                  className="h-fill object-fill aspect-square"
                />

                <div className="w-full flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">Rani phee</h2>
                    <h2 className="font-bold">₹ 2300</h2>
                  </div>
                  <button
                    type="button"
                    className="bg-red-600 hover:bg-red-500  text-white py-3 mt-2 px-4 rounded-full "
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              <div className=" bg-gray-300 h-[300px] w-[250px] p-4 sm:mt-4 mt-1 rounded-lg flex flex-col items-center justify-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREO9JCt80KZ19i_5SPCZ8DXSwsaBbCTbumjQ&s"
                  alt=""
                  className="h-fill object-fill aspect-square"
                />

                <div className="w-full flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">Rani phee</h2>
                    <h2 className="font-bold">₹ 2300</h2>
                  </div>
                  <button
                    type="button"
                    className="bg-red-600 hover:bg-red-500  text-white py-3 mt-2 px-4 rounded-full "
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              <div className=" bg-gray-300 h-[300px] w-[250px] p-4 sm:mt-4 mt-1 rounded-lg flex flex-col items-center justify-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREO9JCt80KZ19i_5SPCZ8DXSwsaBbCTbumjQ&s"
                  alt=""
                  className="h-fill object-fill aspect-square"
                />

                <div className="w-full flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">Rani phee</h2>
                    <h2 className="font-bold">₹ 2300</h2>
                  </div>
                  <button
                    type="button"
                    className="bg-red-600 hover:bg-red-500  text-white py-3 mt-2 px-4 rounded-full "
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offers;
