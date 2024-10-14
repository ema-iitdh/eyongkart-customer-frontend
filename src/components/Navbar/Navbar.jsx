import React, { useContext, useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { GrFavorite } from "react-icons/gr";
import { ShopContext } from "../Context/ShopContext";
import { BsFillArchiveFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/auth";
import instance from "../../../api";
import { Tooltip, Button } from "@mantine/core";
import { BsFillBoxFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "@mantine/core";
import { X, Menu } from "lucide-react";
import handloom from "./Handloom.json";
import { Accordion } from "@mantine/core";
// Remove this
function CategoryOption({ title, data }) {
  const navigate = useNavigate();
  //hamburger
  return (
    <div className="group relative">
      {/* Main title (category) */}
      <p className="cursor-pointer p-2 hover:bg-red-500">{title}</p>
      {/* Dropdown for subcategories */}
      <div className="hidden group-hover:grid absolute left-0 top-0 z-10 bg-gray-100 px-4  grid-cols-3 gap-4  overflow-y-auto w-[600px]">
        {data?.categories?.map((category) => (
          <div key={category._id} className="category">
            {/* Category Name */}
            <p
              className="font-bold text-red-500 cursor-pointer"
              onClick={() => {
                navigate(`/productList/${category._id}`);
              }}
            >
              {category.name}
            </p>

            {/* Subcategories List */}
            <ul className="list-none mt-2">
              {category?.subCategories?.map((subcategory) => (
                <li key={subcategory._id} className="text-sm text-black">
                  {subcategory.subCategoryName}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// till here

const Navbar = ({ data }) => {
  const navigate = useNavigate();
  const [DropdownLink, setDropdownLink] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [auth, setAuth] = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const getAllCategory = async () => {
    try {
      const res = await instance({
        url: "/category",
        method: "GET",
      });
      // const sortedCategory = res.data.category.sort((a, b) =>
      //   a.name.localeCompare(b.name)
      // );
      // setDropdownLink(
      //   res.data.category.sort((a, b) => a.name.localeCompare(b.name))
      // );
    } catch (error) {
      console.log(error);
    }
  };
  console.log(DropdownLink);

  // let allcategory = [];
  // const addCategory = () => {
  //   let category = [];
  //   if (DropdownLink.length) DropdownLink.map((i) => category.push(i.name));
  //   return allCategory.push([...category]);
  // };
  // addCategory();
  // console.log(allcategory);

  useEffect(() => {
    getAllCategory();
  }, []);

  // Remove this
  const { data: menCategory, isLoading } = useQuery({
    queryKey: ["menCategory"],
    queryFn: () =>
      instance({
        url: "/category?sex=male&isProductForKids=false",
        method: "GET",
      }),
  });

  const { data: womenCategory, isLoading: isLoadingWomenCategory } = useQuery({
    queryKey: ["womenCategory"],
    queryFn: () =>
      instance({
        url: "/category?sex=female&isProductForKids=false",
        method: "GET",
      }),
  });
  const { data: kidsCategory, isLoading: isLoadingKidsCategory } = useQuery({
    queryKey: ["kidsCategory"],
    queryFn: () =>
      instance({
        url: "/category?isProductForKids=true",
        method: "GET",
      }),
  });

  // till here

  const { getTotalCartItems } = useContext(ShopContext);

  return (
    <>
      <div className=" bg-white duration-200 z-40 fixed top-0 right-0 left-0">
        {/* Remove this */}
        {/* <div className="flex items-center gap-2">
        <CategoryOption title="Men" data={isLoading ? [] : menCategory?.data} />
        <CategoryOption
          title="Women"
          data={isLoadingWomenCategory ? [] : womenCategory?.data}
        />
        <CategoryOption
          title="Kids"
          data={isLoadingKidsCategory ? [] : kidsCategory?.data}
        />
      </div> */}
        {/* till here */}
        <div className=" p-2 relative ">
          <div className="container flex  justify-between items-center">
            <div className="flex  items-center gap-7">
              <NavLink
                to="/"
                className="text-primary tracking-widest uppercase sm:text-3xl"
              >
                <img
                  className="w-[80px] h-[40px] object-fit "
                  src="/mainLogo.png"
                  alt=""
                />
              </NavLink>

              <div className="hidden lg:block  ">
                <ul className="flex items-center font-semibold gap-5 ">
                  <li className="relative cursor-pointer group   ">
                    <div className=" navbar text-[16px]  ">
                      <span className="flex items-center text-[16px] mt-1">
                        <CategoryOption
                          title="MEN"
                          // data={isLoading ? [] : menCategory?.data}
                        />
                        <IoMdArrowDropdown />
                      </span>
                    </div>
                    <div className="absolute z-[9999] hidden group-hover:block text-red-400">
                      <div className="">
                        <CategoryOption
                          data={isLoading ? [] : menCategory?.data}
                        />
                      </div>
                    </div>
                  </li>

                  <li className="relative cursor-pointer group  ">
                    <div className=" navbar text-[16px] flex ">
                      <span className="flex items-center text-[16px] mt-1">
                        <CategoryOption title="WOMEN" />
                        <IoMdArrowDropdown />
                      </span>
                    </div>
                    <div
                      className="absolute z-[9999] hidden group-hover:block "
                      style={{ marginLeft: "-90px" }}
                    >
                      <div className="">
                        {/* <div className="ml-3 "> */}
                        {/* <p className="text-red-400">Wangkhei phee</p> */}
                        {/* <div className="ml-8 text-[15px]">
                          <p>Ningam samji</p>
                          <p>Kheiroi Thekpa</p>
                          <p>Border Chatpa</p>
                          <p>Wangkhei phee Maraktaibi</p>
                          <p>Lamthang Khulak</p>
                          <p>Moirang Phijang</p>
                          <p>Angom mayek</p>
                        </div> */}
                        <CategoryOption
                          data={
                            isLoadingWomenCategory ? [] : womenCategory?.data
                          }
                        />
                        {/*removing */}
                      </div>
                    </div>
                  </li>

                  <li className="relative cursor-pointer group  ">
                    <div className=" navbar text-[16px] flex ">
                      <span className="flex items-center text-[16px] mt-1">
                        <CategoryOption title="KIDS" />
                        <IoMdArrowDropdown />
                      </span>
                    </div>
                    <div
                      className="absolute z-[9999] hidden group-hover:block  "
                      style={{ marginLeft: "-200px" }}
                    >
                      <div className="flex flex-col text-red-400  ">
                        <CategoryOption
                          data={isLoadingKidsCategory ? [] : kidsCategory?.data}
                        />
                        {/*removing */}
                      </div>
                    </div>
                  </li>

                  {/* <li className="relative cursor-pointer group  ">
                  <div className=" navbar text-[16px] flex ">
                    <span className="navbar flex items-center text-[16px] mt-1">
                      KIDS
                      <IoMdArrowDropdown />
                    </span>
                  </div>
                  <div className="absolute z-[9999] hidden group-hover:block">
                    <ul className="space-y-1 bg-white w-[200px] rounded-lg">
                      <CategoryOption
                        // title="Kids"
                        data={isLoadingKidsCategory ? [] : kidsCategory?.data}
                      />
                    </ul>
                  </div>
                </li> */}
                </ul>
              </div>
            </div>
            {/* navbar right section */}
            <div className="flex justify-between items-center gap-2">
              {/* Search bar section */}
              <div className="relative group   sm:block">
                <input
                  type="text"
                  placeholder="Search for products "
                  className="search-bar"
                />
                <FaSearch className="text-xl text-gray-600 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3 duration-200" />
              </div>
              {/* order button section */}
              {/* <Tooltip className=" bg-red-500" label="Carts"> */}
              {/* adding hamburger */}
              {/*first  */}
              {/* Hamburger menu button */}
              <button
                type="button"
                onClick={toggleSidebar}
                className="text-black rounded-md md:hidden"
              >
                {!isOpen && <Menu />}
              </button>

              {/* Sidebar */}
              <div
                className={`fixed top-0 left-0 block md:hidden h-full w-64 bg-white text-red-400 transform transition-transform duration-300 ease-in-out ${
                  isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0`}
              >
                <div className="p-4">
                  <div className="flex justify-between ">
                    <NavLink
                      to="/"
                      className="text-primary tracking-widest uppercase sm:text-3xl "
                    >
                      <img
                        className="w-[50px] h-[25px] object-fit mb-3 "
                        src="/mainLogo.png"
                        alt=""
                      />
                    </NavLink>
                    <button
                      type="button"
                      onClick={toggleSidebar}
                      className="text-black rounded-md md:hidden"
                    >
                      <X size={24} />
                    </button>
                    {/* <h2 className="text-2xl font-bold mb-5">Menu</h2> */}
                  </div>
                  <hr className="h-[2px] text-gray-500 bg-gray-500 " />
                  <nav>
                    <ul className="space-y-2">
                      {/* men */}
                      <li>
                        {/* <NavLink to="/sort">
                          <CategoryOption
                            title="MEN"
                            // data={isLoading ? [] : menCategory?.data}
                          />
                        </NavLink> */}
                        <Accordion>
                          {data?.categories?.map((category) => (
                            <Accordion.Item
                              key={category._id}
                              value={category.title}
                            >
                              console.log(data);
                              <Accordion.Control className="text-red-500">
                                {category.title}
                              </Accordion.Control>
                              <Accordion.Panel>
                                {category?.subCategories.map((subcategory) => (
                                  <li key={subcategory._id}>
                                    <div className="text-black w-full grid grid-col-1">
                                      <div>{subcategory.subCategoryName}</div>
                                    </div>
                                  </li>
                                ))}
                              </Accordion.Panel>
                            </Accordion.Item>
                          ))}
                        </Accordion>
                      </li>

                      <li>
                        <NavLink
                          to="/cart"
                          className="flex items-center space-x-2 p-2 rounded-md hover:bg-red-300"
                        >
                          <FaShoppingCart size={20} />
                          <span>Carts</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/wishlist"
                          className="flex items-center space-x-2 p-2 rounded-md hover:bg-red-300"
                        >
                          <GrFavorite size={20} />
                          <span>Wishlist</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/myorder"
                          className="flex items-center space-x-2 p-2 rounded-md hover:bg-red-300"
                        >
                          <BsFillArchiveFill size={20} />
                          <span>Orders</span>
                        </NavLink>
                        <NavLink
                          to=""
                          className="flex items-center space-x-2 p-2 rounded-md hover:bg-red-300"
                        >
                          <BsFillBoxFill size={20} />
                          <span>Become a Seller</span>
                        </NavLink>
                        <NavLink
                          to="/login"
                          className="flex items-center space-x-2 p-2 rounded-md hover:bg-red-300"
                        >
                          <Avatar size={25} color="red" />
                          <span>Login</span>
                        </NavLink>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>

              {/* end */}
              <div className="hidden md:block ">
                <div className="flex justify-center items-center gap-2">
                  <Tooltip className="bg-red-500" label="Wishlist">
                    <NavLink to="/cart" type="button" className="relative p-3">
                      {/* <FaShoppingCart className="text-xl text-gray-600 dark:text-gray-400" /> */}
                      <label htmlFor="">Bags</label>
                      <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                        {getTotalCartItems()}
                      </div>
                    </NavLink>
                  </Tooltip>
                  <Tooltip className="bg-red-500" label="Wishlist">
                    <NavLink
                      to="/wishlist"
                      type="button"
                      className="relative p-3"
                    >
                      {/* <GrFavorite className="text-xl text-gray-600 dark:text-gray-400" /> */}
                      <label htmlFor="">Wishlist</label>
                    </NavLink>
                  </Tooltip>
                  <div>
                    <Button
                      className="text-white px-2 py-[-2px]  "
                      variant="filled"
                      color="red"
                    >
                      <BsFillBoxFill className="m-1" />
                      Seller
                    </Button>
                  </div>
                  {auth?.token && (
                    // <Tooltip className="bg-red-500" label="Orders">
                    <NavLink
                      to="/myorder"
                      type="button"
                      className="relative p-3"
                    >
                      {/* <BsFillArchiveFill className="text-xl text-gray-600 dark:text-gray-400" /> */}
                      <label htmlFor="">Orders</label>
                    </NavLink>
                    // </Tooltip>
                  )}
                  {!auth.token ? (
                    // <Tooltip label="Login" className="bg-red-500">
                    <NavLink to="/login" type="button" className="relative p-3">
                      <button type="button">
                        <Avatar src={null} alt="no image here" color="red" />
                      </button>
                    </NavLink>
                  ) : (
                    // </Tooltip>
                    <button
                      type="button"
                      className="bg-white w-[80px] h-[30px] outline-black border  dark:text-white dark:bg-black hover:bg-red-500 duration-[3000ms]"
                      onClick={() => {
                        localStorage.removeItem("auth");
                        setAuth({
                          message: "",
                          token: "",
                        });
                      }}
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
