// import React, { useState, useEffect } from "react";
// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
// import { Group, Button } from "@mantine/core";
// import Shop from "../Header/Shop";
// import { Link } from "react-router-dom";
// import { ScrollArea } from "@mantine/core";
// import instance from "../../../api";
// const SidebarSort = () => {
//   const [products, setproducts] = useState();
//   const [loading, setLoading] = useState(false);
//   const [newproducts, setNewproducts] = useState();
//   const [searchProduct, setSearchProduct] = useState("");
//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await instance({
//         url: "/product/allproduct",
//         method: "GET",
//       });
//       // console.log(res.data.products);
//       setproducts(res.data.products);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     fetchProducts();
//   }, []);
//   const handleOnChange = (e) => {
//     setSearchProduct(e.target.value);
//     let searchProductnew = products.filter((i) =>
//       i.name.toLowerCase().includes(e.target.value.toLowerCase())
//     );
//     setNewproducts(searchProductnew);
//   };
//   return (
//     <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden ">
//       <Navbar />
//       <div className="pt-20 ">
//         <div className="overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color pb-5 gap-10 flex justify-start">
//           <ScrollArea
//             h={600}
//             type="never"
//             w={170}
//             scrollbars="y"
//             scrollHideDelay={200}
//           >
//             <div className="w-[170px] h-[500px] ">
//               <h2 className="p-3 text-[20px]">Filters</h2>
//               <div className="text-[14px]">
//                 <h2 className="p-2 text-[16px]">BRAND</h2>
//                 <div>
//                   <label className="block relative pl-4 mb-3 cursor-pointer">
//                     <input type="checkbox" name="phee" id="" />
//                     <span className=""></span>All
//                   </label>
//                   <label className="block relative pl-4 mb-3 cursor-pointer">
//                     <input type="checkbox" name="phee" id="" />
//                     <span className=""></span>Rani phee
//                   </label>
//                   <label className="block relative pl-4 mb-3 cursor-pointer">
//                     <input type="checkbox" name="phee" id="" />
//                     <span className=""></span>Wangkhei Phee
//                   </label>
//                   <label className="block relative pl-4 mb-3 cursor-pointer">
//                     <input type="checkbox" name="phee" id="" />
//                     <span className=""></span>Digital Print Pheijom
//                   </label>
//                   <label className="block relative pl-4 mb-3 cursor-pointer">
//                     <input type="checkbox" name="phee" id="" />
//                     <span className=""></span>Muka phee
//                   </label>
//                   <label className="block relative pl-4 mb-3 cursor-pointer">
//                     <input type="checkbox" name="phee" id="" />
//                     <span className=""></span>Top
//                   </label>
//                   <label className="block relative pl-4 mb-3 cursor-pointer">
//                     <input type="checkbox" name="phee" id="" />
//                     <span className=""></span>
//                     Phanek
//                   </label>
//                   <label className="block relative pl-4 mb-3 cursor-pointer">
//                     <input type="checkbox" name="phee" id="" />
//                     <span className=""></span>
//                     Blouse
//                   </label>
//                 </div>
//               </div>

//               <div className="text-[14px]">
//                 <h2 className="p-2 text-[16px]">PRICE</h2>
//                 <div>
//                   <label className="block relative pl-4 mb-3 cursor-pointer">
//                     <input type="checkbox" name="phee" id="" />
//                     <span className=""></span>₹ 5000 to ₹ 10000
//                   </label>
//                   <label className="block relative pl-4 mb-3 cursor-pointer">
//                     <input type="checkbox" name="phee" id="" />
//                     <span className=""></span>₹ 10000 to ₹ 15000
//                   </label>
//                   <label className="block relative pl-4 mb-3 cursor-pointer">
//                     <input type="checkbox" name="phee" id="" />
//                     <span className=""></span>₹ 16000 to ₹ 20000
//                   </label>

//                   <label className="block relative pl-4 mb-3 cursor-pointer">
//                     <input type="checkbox" name="phee" id="" />
//                     <span className=""></span>₹ 20000 above
//                   </label>
//                 </div>
//               </div>
//               <div className="text-[14px]">
//                 <h2 className="p-2 text-[16px]">COLOR</h2>
//                 <div>
//                   <label className="block  relative pl-4 mb-3 cursor-pointer">
//                     <input type="checkbox" name="phee" id="" />
//                     <span className=""></span>RED
//                   </label>
//                   <label className="block relative pl-4 mb-3 cursor-pointer">
//                     <input type="checkbox" name="phee" id="" />
//                     <span className=""></span>BLUE
//                   </label>
//                   <label className="block relative pl-4 mb-3 cursor-pointer">
//                     <input type="checkbox" name="phee" id="" />
//                     <span className=""></span>GREEN
//                   </label>

//                   <label className="block relative pl-4 mb-3 cursor-pointer">
//                     <input type="checkbox" name="phee" id="" />
//                     <span className=""></span>PINK
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </ScrollArea>
//           <ScrollArea h={600} type="never" scrollbars="y">
//             <div className="  ">
//               <h1 className="pt-3 pl-12">Recommended</h1>
//               <Group gap="xs" className="pl-12">
//                 <Link to="/sort">
//                   <Button variant="default">All products</Button>
//                 </Link>
//                 <Link to="/shopByCategory/Rani-Phee">
//                   <Button variant="default">Rani phee</Button>
//                 </Link>
//                 <Link to="/shopByCategory/Wangkhei-Phee">
//                   <Button variant="default">Wangkhei phee</Button>
//                 </Link>
//                 <Link to="/shopByCategory/Digital-Print-Pheijom">
//                   <Button variant="default">Digital pheijom</Button>
//                 </Link>
//                 <Link to="/shopByCategory/Phanek">
//                   <Button variant="default">Phanek</Button>
//                 </Link>
//                 <Button variant="default">Blouse</Button>
//                 <Link to="/shopByCategory/Top">
//                   <Button variant="default">Top</Button>
//                 </Link>
//                 <Link to="/shopByCategory/Muka-Phee">
//                   <Button variant="default">Muka phee</Button>
//                 </Link>
//               </Group>

//               <Shop />
//             </div>
//           </ScrollArea>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default SidebarSort;

import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Group, Button, Select } from "@mantine/core";
import Shop from "../Header/Shop";
import { Link } from "react-router-dom";
import { ScrollArea } from "@mantine/core";
import instance from "../../../api";

const SidebarSort = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    brand: [],
    price: [],
    color: [],
  });
  const [sortCriteria, setSortCriteria] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await instance({
        url: "/product/allproduct",
        method: "GET",
      });
      setProducts(res.data.products);
      setFilteredProducts(res.data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

  useEffect(() => {
    const filterProducts = () => {
      let updatedProducts = products;

      // Filter by brand
      if (selectedFilters.brand.length > 0) {
        updatedProducts = updatedProducts.filter((product) =>
          selectedFilters.brand.includes(product.brand)
        );
      }

      // Filter by price
      if (selectedFilters.price.length > 0) {
        updatedProducts = updatedProducts.filter((product) => {
          return selectedFilters.price.some((priceRange) => {
            const [min, max] = priceRange.split(" to ").map(Number);
            return product.price >= min && (max ? product.price <= max : true);
          });
        });
      }

      // Filter by color
      if (selectedFilters.color.length > 0) {
        updatedProducts = updatedProducts.filter((product) =>
          selectedFilters.color.includes(product.color)
        );
      }

      setFilteredProducts(updatedProducts);
    };

    filterProducts();
  }, [selectedFilters, products]);

  useEffect(() => {
    const sortProducts = () => {
      let sortedProducts = [...filteredProducts];
      switch (sortCriteria) {
        case "price-asc":
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        case "name-asc":
          sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name-desc":
          sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }
      setFilteredProducts(sortedProducts);
    };

    sortProducts();
  }, [sortCriteria, filteredProducts]);

  const handleSearchChange = (e) => {
    setSearchProduct(e.target.value);
    let searchProductnew = products.filter((i) =>
      i.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(searchProductnew);
  };

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

          <ScrollArea h={600} type="never" scrollbars="y">
            <div className="">
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
              <Shop products={filteredProducts} />
            </div>
          </ScrollArea>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SidebarSort;
