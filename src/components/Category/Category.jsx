import React from "react";
import { Carousel } from "@mantine/carousel";

const Category = () => {
  return (
    <div className="mt-20 p-6 drop-shadow-md">
      <div className="  overflow-hidden rounded-xl sm:h-[100px] h-[320px]  hero-bg-color ">
        <Carousel
          withIndicators
          height={200}
          slideSize="33.333333%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={3}
        >
          <Carousel.Slide>
            <div className="bg-red-500 h-10 ">text</div>
          </Carousel.Slide>

          {/* ...other slides */}
        </Carousel>
      </div>
    </div>
  );
};

export default Category;
