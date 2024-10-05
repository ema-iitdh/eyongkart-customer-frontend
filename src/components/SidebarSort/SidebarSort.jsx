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
import { ScrollArea, Radio } from "@mantine/core";
import instance from "../../../api";

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
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleOnChange = (e) => {
    setSearchProduct(e.target.value);
    let searchProductnew = products.filter((i) =>
      i.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setNewproducts(searchProductnew);
  };
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden  pt-16 ">
      <Navbar />
      {/* <div className="pt-20 "> */}
      <div className="overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color pt-8 flex gap-y-3.5">
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

            {/* <div className="text-[14px]">
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
              </div> */}
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
            <Shop />
          </div>
        </ScrollArea>
      </div>
      {/* </div> */}
      <Footer />
    </div>
  );
};

export default SidebarSort;
