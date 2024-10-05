import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import instance from "../../../api";
import { Select } from "@mantine/core";
import ShopCategory from "../../Pages/ShopCategory";
import axios from "axios";
import { useParams } from "react-router-dom";
import Item from "../Item/Item.jsx";
import { Group, Button } from "@mantine/core";
import { ScrollArea } from "@mantine/core";
import { Link } from "react-router-dom";
const ShopByCategory = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState();
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  // const fetchProducts = async (id) => {
  //   try {
  //     // const { data } = await axios.get(
  //     //   `https://7bjx1c7g-3000.inc1.devtunnels.ms/product/getProductCategoryById/${id}`
  //     // );
  //     // setproducts(data.product);
  //     if (params.category === "Rani-Phee") {
  //       const res = await instance({
  //         url: `/product/getProductCategoryById/664d9c6ad3fbe4146f8e3baa`,
  //         method: "GET",
  //       });
  //       setproducts(res.data.product);
  //     } else if (params.category === "Wangkhei-Phee") {
  //       const res = await instance({
  //         url: `/product/getProductCategoryById/664d9c63d3fbe4146f8e3ba7`,
  //         method: "GET",
  //       });
  //       setproducts(res.data.product);
  //     } else if (params.category === "Phanek") {
  //       const res = await instance({
  //         url: `/product/getProductCategoryById/664d9c81d3fbe4146f8e3bb0`,
  //         method: "GET",
  //       });
  //       setproducts(res.data.product);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   // if (params.category === "Rani-Phee")
  //   //   fetchProducts("664d9c6ad3fbe4146f8e3baa");
  //   // if (params.category === "Wangkhei-Phee")
  //   //   fetchProducts("664d9c63d3fbe4146f8e3ba7");
  //   // if (params.category === "Phanek") fetchProducts("664d9c81d3fbe4146f8e3bb0");
  //   fetchProducts();
  // }, []);
  const [selectedFilters, setSelectedFilters] = useState({
    brand: [],
    price: [],
    color: [],
  });
  const [sortCriteria, setSortCriteria] = useState("");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let categoryId;

        switch (params.category) {
          case "Rani-Phee":
            categoryId = "664d9c6ad3fbe4146f8e3baa";
            break;
          case "Wangkhei-Phee":
            categoryId = "664d9c63d3fbe4146f8e3ba7";
            break;
          case "Phanek":
            categoryId = "664d9c81d3fbe4146f8e3bb0";
            break;
          case "Digital-Print-Pheijom":
            categoryId = "664d9c9cd3fbe4146f8e3bb3";
            break;
          case "Muka-Phee":
            categoryId = "664d9c75d3fbe4146f8e3bad";
            break;
          case "Blouse":
            categoryId = "6678fec2ff86abec768f96a7";
            break;
          case "Top":
            categoryId = "6673f97a8b7f735de0751f60";
            break;
          default:
            break;
        }

        if (categoryId) {
          const res = await instance({
            url: `/product/getProductCategoryById/${categoryId}`,
            method: "GET",
          });
          setProducts(res.data.product);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [params.category]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  console.log(products);
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (checked) {
        updatedFilters[name] = [...updatedFilters[name], value];
      } else {
        updatedFilters[name] = updatedFilters[name].filter(
          (item) => item !== value
        );
      }
      return updatedFilters;
    });
  };
  return (
    <>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden pt-16">
        <Navbar />

        <div className="  overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color pt-8 flex gap-y-3.5">
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
                  {/* <Link to="/shopByCategory/Rani-Phee"> */}
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
                  {/* </Link> */}

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
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <label htmlFor="2000">₹ 2000 - ₹ 3500</label>
                  </div>
                  <div className="flex items-center gap-2 pl-2">
                    <input
                      name="price"
                      id="5000"
                      type="radio"
                      value={"₹ 5000 - ₹ 10000"}
                      className="appearance-none w-3 h-3 rounded-full border-2  border-gray-500 checked:bg-red-500  focus:outline-none transition-colors"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <label htmlFor="5000">₹ 5000 - ₹ 10000</label>
                  </div>
                  <div className="flex items-center gap-2 pl-2">
                    <input
                      name="price"
                      id="12000"
                      type="radio"
                      value={"₹ 12000 - ₹ 15000"}
                      className="appearance-none w-3 h-3 rounded-full border-2  border-gray-500 checked:bg-red-500  focus:outline-none transition-colors"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <label htmlFor="12000">₹ 12000 - ₹ 15000</label>
                  </div>
                  <div className="flex items-center gap-2 pl-2">
                    <input
                      name="price"
                      id="15000"
                      type="radio"
                      value={"₹ 15000 - ₹ 20000"}
                      className="appearance-none w-3 h-3 rounded-full border-2  border-gray-500 checked:bg-red-500  focus:outline-none transition-colors"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <label htmlFor="15000">₹ 15000 - ₹ 20000</label>
                  </div>
                  <div className="flex items-center gap-2 pl-2">
                    <input
                      name="price"
                      id="20000"
                      type="radio"
                      value={"₹ 20000 - ₹ 30000"}
                      className="appearance-none w-3 h-3 rounded-full border-2  border-gray-500 checked:bg-red-500  focus:outline-none transition-colors"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <label htmlFor="20000">₹ 20000 - ₹ 30000</label>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="container">
            <div>
              <h1 className="pt-3 pl-5">Recommended</h1>
              <Group gap="xs" className="pl-5">
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
            </div>
            <div className="m-5 grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
              {products?.map((item, i) => {
                // if (props.category === item.category) {
                return (
                  <Item
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    img={item?.image_id[0]}
                    new_price={item.new_price}
                    old_price={item.old_price}
                  />
                );
                //  } else {
                //    return null;
                //  }
              })}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ShopByCategory;
