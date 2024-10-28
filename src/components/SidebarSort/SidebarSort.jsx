import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Group, Button, Select } from "@mantine/core";
import Shop from "../Header/Shop";
import { Link } from "react-router-dom";
import { ScrollArea, Radio } from "@mantine/core";
import Item from "../Item/Item";
import ChatBox from "../Chat/ChatBox";
import { Axios } from "../../../api";

const SidebarSort = () => {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [products, setproducts] = useState();
  const [loading, setLoading] = useState(false);
  const [newproducts, setNewproducts] = useState();
  const [searchProduct, setSearchProduct] = useState("");
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await instance({
        url: "/product/allproduct",
        method: "GET",
      });
      // console.log(res.data.products);
      setproducts(res.data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrice = async (lcost, hcost) => {
    try {
      const { data } = await Axios.get(
        `http://localhost:3000/product/filterbyprice/${lcost}-${hcost}`
      );
      setproducts(data.products);
      // console.log(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const handleOnChange = (e) => {
    setSearchProduct(e.target.value);
    const searchProductnew = products.filter((i) =>
      i.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setNewproducts(searchProductnew);
  };
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden ">
      <Navbar />
      <div className="pt-16 ">
        <div className="overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color pb-5 gap-10 flex justify-start">
          <ScrollArea
            h={600}
            type="never"
            w={170}
            scrollbars="y"
            scrollHideDelay={200}
          >
            <div className="w-[170px] h-[400px] ">
              <h2 className="p-3 text-[20px]">Filters</h2>
              <div className="text-[14px]">
                <h2 className="p-2 text-[16px]">BRAND</h2>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 pl-2">
                    <input
                      name="brand"
                      id="all"
                      type="radio"
                      value={"All"}
                      className="appearance-none w-3 h-3 rounded-full border-2  border-gray-500 checked:bg-red-500  focus:outline-none transition-colors"
                      onChange={(e) => setBrand(e.target.value)}
                    />
                    <label htmlFor="all">All</label>
                    {/* <Radio size="xs" name="brand" label="All" color="red" /> */}
                  </div>
                  <Link to="/shopByCategory/Rani Phee">
                    <div className="flex items-center gap-2 pl-2">
                      <input
                        name="brand"
                        id="rani"
                        type="radio"
                        value={"Rani Handloom"}
                        className="appearance-none w-3 h-3 rounded-full border-2  border-gray-500 checked:bg-red-500  focus:outline-none transition-colors"
                        onChange={(e) => setBrand(e.target.value)}
                      />
                      <label htmlFor="rani">Rani Handloom</label>
                    </div>
                  </Link>

                  <div className="flex items-center gap-2 pl-2">
                    <input
                      name="brand"
                      id="muga"
                      type="radio"
                      value={"Muga Handloom"}
                      className="appearance-none w-3 h-3 rounded-full border-2  border-gray-500 checked:bg-red-500  focus:outline-none transition-colors"
                      onChange={(e) => setBrand(e.target.value)}
                    />
                    <label htmlFor="muga">Muga Handloom</label>
                  </div>

                  <div className="flex items-center gap-2 pl-2">
                    <input
                      name="brand"
                      id="pheijom"
                      type="radio"
                      value={"Pheijom Handloom"}
                      className="appearance-none w-3 h-3 rounded-full border-2  border-gray-500 checked:bg-red-500  focus:outline-none transition-colors"
                      onChange={(e) => setBrand(e.target.value)}
                    />
                    <label htmlFor="pheijom"> Pheijom Handloom</label>
                  </div>
                  <div className="flex items-center gap-2 pl-2">
                    <input
                      name="brand"
                      id="pheijom"
                      type="radio"
                      value={"Pheijom Handloom"}
                      className="appearance-none w-3 h-3 rounded-full border-2  border-gray-500 checked:bg-red-500  focus:outline-none transition-colors"
                      onChange={(e) => setBrand(e.target.value)}
                    />
                    <label htmlFor="pheijom">Blouse Handloom</label>
                  </div>
                  <div className="flex items-center gap-2 pl-2">
                    <input
                      name="brand"
                      id="top"
                      type="radio"
                      value={"Top Handloom"}
                      className="appearance-none w-3 h-3 rounded-full border-2  border-gray-500 checked:bg-red-500  focus:outline-none transition-colors"
                      onChange={(e) => setBrand(e.target.value)}
                    />
                    <label htmlFor="top">Top Handloom</label>
                  </div>
                  <div className="flex items-center gap-2 pl-2">
                    <input
                      name="brand"
                      id="phanek "
                      type="radio"
                      value={"Phanek  Handloom"}
                      className="appearance-none w-3 h-3 rounded-full border-2  border-gray-500 checked:bg-red-500  focus:outline-none transition-colors"
                      onChange={(e) => setBrand(e.target.value)}
                    />
                    <label htmlFor="phanek ">Phanek Handloom</label>
                  </div>
                  <div className="flex items-center gap-2 pl-2">
                    <input
                      name="brand"
                      id="wangkheiphee"
                      type="radio"
                      value={"Wangkheiphee Handloom"}
                      className="appearance-none w-3 h-3 rounded-full border-2  border-gray-500 checked:bg-red-500  focus:outline-none transition-colors"
                      onChange={(e) => setBrand(e.target.value)}
                    />
                    <label htmlFor="wangkheiphee">Wangkheiphee Handloom</label>
                  </div>
                </div>
              </div>

              <div className="text-[14px]">
                <h2 className="p-2 text-[16px]">PRICE</h2>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 pl-2">
                    <input
                      name="price"
                      id="2000"
                      type="radio"
                      value={"₹ 2000 - ₹ 3500"}
                      className="appearance-none w-3 h-3 rounded-full border-2  border-gray-500 checked:bg-red-500  focus:outline-none transition-colors"
                      onChange={(e) => handlePrice(1, 999)}
                    />
                    <label htmlFor="2000">Less than 1000</label>
                  </div>
                  <div className="flex items-center gap-2 pl-2">
                    <input
                      name="price"
                      id="5000"
                      type="radio"
                      value={"₹ 5000 - ₹ 10000"}
                      className="appearance-none w-3 h-3 rounded-full border-2  border-gray-500 checked:bg-red-500  focus:outline-none transition-colors"
                      onChange={(e) => handlePrice(1000, 3000)}
                    />
                    <label htmlFor="5000">₹ 1000 - ₹ 3000</label>
                  </div>
                  <div className="flex items-center gap-2 pl-2">
                    <input
                      name="price"
                      id="12000"
                      type="radio"
                      value={"₹ 12000 - ₹ 15000"}
                      className="appearance-none w-3 h-3 rounded-full border-2  border-gray-500 checked:bg-red-500  focus:outline-none transition-colors"
                      onChange={(e) => handlePrice(3001, 5000)}
                    />
                    <label htmlFor="12000">₹ 3000 - ₹ 5000</label>
                  </div>
                  <div className="flex items-center gap-2 pl-2">
                    <input
                      name="price"
                      id="15000"
                      type="radio"
                      value={"₹ 15000 - ₹ 20000"}
                      className="appearance-none w-3 h-3 rounded-full border-2  border-gray-500 checked:bg-red-500  focus:outline-none transition-colors"
                      onChange={(e) => handlePrice(5001, 10000)}
                    />
                    <label htmlFor="15000">₹5000 - ₹10000</label>
                  </div>
                  <div className="flex items-center gap-2 pl-2">
                    <input
                      name="price"
                      id="20000"
                      type="radio"
                      value={"₹ 20000 - ₹ 30000"}
                      className="appearance-none w-3 h-3 rounded-full border-2  border-gray-500 checked:bg-red-500  focus:outline-none transition-colors"
                      onChange={(e) => handlePrice(10001, 20000)}
                    />
                    <label htmlFor="20000">More than ₹ 10000</label>
                  </div>
                </div>
              </div>

              <div className="text-[14px]">
                <h2 className="p-2 text-[16px]">SORT BY</h2>
                <Select
                  placeholder="Sort by"
                  data={[
                    { value: "price-asc", label: "Price: Low to High" },
                    { value: "price-desc", label: "Price: High to Low" },
                    { value: "name-asc", label: "Name: A to Z" },
                    { value: "name-desc", label: "Name: Z to A" },
                  ]}
                />
              </div>
            </div>
          </ScrollArea>
        </div>
        <ChatBox />
      </div>
      <Footer />
    </div>
  );
};

export default SidebarSort;
