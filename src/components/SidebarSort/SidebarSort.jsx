import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Group, Button } from "@mantine/core";
import Shop from "../Header/Shop";
import { Link } from "react-router-dom";
import { ScrollArea } from "@mantine/core";
const SidebarSort = () => {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden ">
      <Navbar />
      <div className="pt-20 ">
        <div className="overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color pb-5 gap-10 flex justify-start">
          <ScrollArea
            h={600}
            type="never"
            w={170}
            scrollbars="y"
            scrollHideDelay={200}
          >
            <div className="w-[170px] h-[500px] ">
              <h2 className="p-3 text-[20px]">Filters</h2>
              <div className="text-[14px]">
                <h2 className="p-2 text-[16px]">BRAND</h2>
                <div>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input type="checkbox" name="phee" id="" />
                    <span className=""></span>All
                  </label>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input type="checkbox" name="phee" id="" />
                    <span className=""></span>Rani phee
                  </label>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input type="checkbox" name="phee" id="" />
                    <span className=""></span>Wangkhei Phee
                  </label>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input type="checkbox" name="phee" id="" />
                    <span className=""></span>Digital Print Pheijom
                  </label>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input type="checkbox" name="phee" id="" />
                    <span className=""></span>Muka phee
                  </label>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input type="checkbox" name="phee" id="" />
                    <span className=""></span>Top
                  </label>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input type="checkbox" name="phee" id="" />
                    {/* <span className="absolute top-0 left-0 h-5 w-5 bg-brandWhite"></span> */}
                    Phanek
                  </label>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input type="checkbox" name="phee" id="" />
                    {/* <span className="absolute top-0 left-0 h-5 w-5 bg-brandWhite"></span> */}
                    Blouse
                  </label>
                </div>
              </div>

              <div className="text-[14px]">
                <h2 className="p-2 text-[16px]">PRICE</h2>
                <div>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input type="checkbox" name="phee" id="" />
                    <span className=""></span>₹ 5000 to ₹ 10000
                  </label>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input type="checkbox" name="phee" id="" />
                    <span className=""></span>₹ 10000 to ₹ 15000
                  </label>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input type="checkbox" name="phee" id="" />
                    <span className=""></span>₹ 16000 to ₹ 20000
                  </label>

                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input type="checkbox" name="phee" id="" />
                    <span className=""></span>₹ 20000 above
                  </label>
                </div>
              </div>
              <div className="text-[14px]">
                <h2 className="p-2 text-[16px]">COLOR</h2>
                <div>
                  <label className="block  relative pl-4 mb-3 cursor-pointer">
                    <input type="checkbox" name="phee" id="" />
                    <span className=""></span>RED
                  </label>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input type="checkbox" name="phee" id="" />
                    <span className=""></span>BLUE
                  </label>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input type="checkbox" name="phee" id="" />
                    <span className=""></span>GREEN
                  </label>

                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input type="checkbox" name="phee" id="" />
                    <span className=""></span>PINK
                  </label>
                </div>
              </div>
            </div>
          </ScrollArea>
          <ScrollArea h={600} type="never" scrollbars="y">
            <div className="  ">
              <h1 className="pt-3 pl-12">Recommended</h1>
              <Group gap="xs" className="pl-12">
                <Link to="/sort">
                  <Button variant="default">All products</Button>
                </Link>
                <Link to="/shopByCategory/Rani-Phee">
                  <Button variant="default">Rani phee</Button>
                </Link>
                <Link to="/shopByCategory/Wangkhei-Phee">
                  <Button variant="default">Wangkhei phee</Button>
                </Link>
                <Link to="/shopByCategory/Digital-Print-Pheijom">
                  <Button variant="default">Digital pheijom</Button>
                </Link>
                <Link to="/shopByCategory/Phanek">
                  <Button variant="default">Phanek</Button>
                </Link>
                <Button variant="default">Blouse</Button>
                <Link to="/shopByCategory/Top">
                  <Button variant="default">Top</Button>
                </Link>
                <Link to="/shopByCategory/Muka-Phee">
                  <Button variant="default">Muka phee</Button>
                </Link>
              </Group>

              <Shop />
            </div>
          </ScrollArea>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SidebarSort;
