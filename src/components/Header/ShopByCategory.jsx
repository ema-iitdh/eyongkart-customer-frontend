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
            <div className="w-[170px] h-[500px] ">
              <h2 className="p-3 text-[20px]">Filters</h2>
              <div className="text-[14px]">
                <h2 className="p-2 text-[16px]">BRAND</h2>
                <div>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="brand"
                      value="All"
                      onChange={handleCheckboxChange}
                    />
                    <span className=""></span>All
                  </label>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="brand"
                      value="Rani phee"
                      onChange={handleCheckboxChange}
                    />
                    <span className=""></span>Gera Handloom
                  </label>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="brand"
                      value="Wangkhei Phee"
                      onChange={handleCheckboxChange}
                    />
                    <span className=""></span>Phee collection
                  </label>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="brand"
                      value="Digital Print Pheijom"
                      onChange={handleCheckboxChange}
                    />
                    <span className=""></span> Pheijom collection
                  </label>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="brand"
                      value="Muka phee"
                      onChange={handleCheckboxChange}
                    />
                    <span className=""></span>Muka collection
                  </label>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="brand"
                      value="Top"
                      onChange={handleCheckboxChange}
                    />
                    <span className=""></span>Top collection
                  </label>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="brand"
                      value="Phanek"
                      onChange={handleCheckboxChange}
                    />
                    <span className=""></span>Phanek collection
                  </label>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="brand"
                      value="Blouse"
                      onChange={handleCheckboxChange}
                    />
                    <span className=""></span>Blouse collection
                  </label>
                </div>
              </div>

              <div className="text-[14px]">
                <h2 className="p-2 text-[16px]">PRICE</h2>
                <div>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="price"
                      value="5000 to 10000"
                      onChange={handleCheckboxChange}
                    />
                    <span className=""></span>₹ 5000 to ₹ 10000
                  </label>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="price"
                      value="10000 to 15000"
                      onChange={handleCheckboxChange}
                    />
                    <span className=""></span>₹ 10000 to ₹ 15000
                  </label>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="price"
                      value="16000 to 20000"
                      onChange={handleCheckboxChange}
                    />
                    <span className=""></span>₹ 16000 to ₹ 20000
                  </label>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="price"
                      value="20000 above"
                      onChange={handleCheckboxChange}
                    />
                    <span className=""></span>₹ 20000 above
                  </label>
                </div>
              </div>

              <div className="text-[14px]">
                <h2 className="p-2 text-[16px]">COLOR</h2>
                <div>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="color"
                      value="RED"
                      onChange={handleCheckboxChange}
                    />
                    <span className=""></span>RED
                  </label>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="color"
                      value="BLUE"
                      onChange={handleCheckboxChange}
                    />
                    <span className=""></span>BLUE
                  </label>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="color"
                      value="GREEN"
                      onChange={handleCheckboxChange}
                    />
                    <span className=""></span>GREEN
                  </label>
                  <label className="block relative pl-4 mb-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="color"
                      value="PINK"
                      onChange={handleCheckboxChange}
                    />
                    <span className=""></span>PINK
                  </label>
                </div>
              </div>

              <div className="text-[14px]">
                <h2 className="p-2 text-[16px]">SORT BY</h2>
                <Select
                  placeholder="Sort by"
                  onChange={setSortCriteria}
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
