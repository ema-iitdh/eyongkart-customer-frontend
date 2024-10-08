import React, { useContext, useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { RiAccountCircleLine } from "react-icons/ri";
import Darkmode from "./Darkmode";
import { Link, NavLink } from "react-router-dom";
import { isActive } from "@tiptap/react";
import { IoMdArrowDropdown } from "react-icons/io";
import { GrFavorite } from "react-icons/gr";
import { ShopContext } from "../Context/ShopContext";
import { BsFillArchiveFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/auth";
import instance from "../../../api";
import { Tooltip, Button } from "@mantine/core";
import { BsFillBoxFill } from "react-icons/bs";
import logo from "../../assets/logo.jpg";
import { useQuery } from "@tanstack/react-query";

import { IconPhoto } from "@tabler/icons-react";
// Remove this
function CategoryOption({ title, data }) {
  console.log(data?.subCategories);
  const navigate = useNavigate();

  return (
    <>
      <div className="group relative">
        <p className="cursor-pointer p-2 hover:bg-[#3333337c]">{title}</p>

        <div className="hidden z-10 rounded px-5 py-2 bg-white w-[600px]  text-red-400 group-hover:grid absolute top-full left-0  ">
          {data?.categories?.map((category) => (
            <div key={category._id}>
              <p
                onKeyDown={() => {
                  navigate(`/productList/${category._id}`);
                }}
                onClick={() => {
                  navigate(`/productList/${category._id}`);
                }}
                className="whitespace-nowrap"
              >
                {category.name}
              </p>
              <p className=" text-black  ">
                <p className="ml-8 text-[15px] ">
                  {category?.subCategories?.map((category) => (
                    <>{category.subCategoryName}</>
                  ))}
                </p>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// till here

const Navbar = () => {
  const navigate = useNavigate();
  const [DropdownLink, setDropdownLink] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [auth, setAuth] = useAuth();
  const getAllCategory = async () => {
    try {
      const res = await instance({
        url: "/category/allcategory",
        method: "GET",
      });
      // const sortedCategory = res.data.category.sort((a, b) =>
      //   a.name.localeCompare(b.name)
      // );
      setDropdownLink(
        res.data.category.sort((a, b) => a.name.localeCompare(b.name))
      );
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
    <div className="bg-white dark:bg-gray-800 dark:text-white duration-200  z-40  fixed top-0 right-0 left-0">
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

      <div className="py-4 relative">
        {/* style={{ background: "red" }} */}
        <div className="container flex justify-between items-center">
          {/* logo and link section */}
          <div className="flex  items-center gap-7">
            <NavLink
              to="/"
              className="text-primary  tracking-widest  uppercase sm:text-3xl"
            >
              <img
                className="w-[80px] h-[40px] object-fit "
                src="/mainLogo.png"
                alt=""
              />
            </NavLink>
            {/* menu items */}
            <div className="hidden lg:block ">
              <ul className="flex items-center font-semibold gap-5">
                <li className="relative cursor-pointer group  ">
                  <div className=" navbar text-[16px]  ">
                    <span className="navbar flex items-center text-[16px] mt-1">
                      <CategoryOption
                        title="MEN"
                        // data={isLoading ? [] : menCategory?.data}
                      />
                      <IoMdArrowDropdown />
                    </span>
                  </div>
                  <div
                    className="absolute z-[9999] hidden group-hover:block text-red-400"
                    style={{ marginLeft: "-30px" }}
                  >
                    <div className="">
                      {/* <p>Digital Print Pheijom</p>
                      <p>Kurta Men</p>
                      <p>Lengyan</p>
                      <p>Khudei</p> */}
                      <CategoryOption
                        data={isLoading ? [] : menCategory?.data}
                      />
                    </div>
                  </div>
                </li>

                <li className="relative cursor-pointer group  ">
                  <div className=" navbar text-[16px] flex ">
                    <span className="navbar flex items-center text-[16px] mt-1">
                      <CategoryOption
                        title="WOMEN"
                        // data={isLoading ? [] : menCategory?.data}
                      />
                      <IoMdArrowDropdown />
                    </span>
                  </div>
                  <div
                    className="absolute z-[9999] hidden group-hover:block "
                    style={{ marginLeft: "-90px" }}
                  >
                    <div className="flex flex-col ">
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
                        // title="Women"
                        data={isLoadingWomenCategory ? [] : womenCategory?.data}
                      />
                      {/*removing */}
                    </div>
                  </div>
                </li>

                <li className="relative cursor-pointer group  ">
                  <div className=" navbar text-[16px] flex ">
                    <span className="navbar flex items-center text-[16px] mt-1">
                      <CategoryOption
                        title="KIDS"
                        // data={isLoading ? [] : menCategory?.data}
                      />
                      <IoMdArrowDropdown />
                    </span>
                  </div>
                  <div
                    className="absolute z-[9999] hidden group-hover:block  "
                    style={{ marginLeft: "-200px" }}
                  >
                    <div className="flex flex-col text-red-400  ">
                      <CategoryOption
                        // title="Kids"
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
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Search for products "
                className="search-bar"
              />
              <FaSearch className="text-xl text-gray-600 group-hover:text-primary dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 duration-200" />
            </div>

            {/* order button section */}
            <Tooltip className="bg-red-500" label="Carts">
              <NavLink to="/cart" type="button" className="relative p-3">
                {/* <FaShoppingCart className="text-xl text-gray-600 dark:text-gray-400" /> */}
                <label htmlFor="">Bags</label>
                <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                  {getTotalCartItems()}
                </div>
              </NavLink>
            </Tooltip>
            <Tooltip className="bg-red-500" label="Wishlist">
              <NavLink to="/wishlist" type="button" className="relative p-3">
                {/* <GrFavorite className="text-xl text-gray-600 dark:text-gray-400" /> */}
                <label htmlFor="">Wishlist</label>
              </NavLink>
            </Tooltip>

            <div>
              <Button
                className="text-black "
                variant="filled"
                color="rgba(250, 18, 18, 1)"
              >
                <BsFillBoxFill className="m-1" />
                Seller
              </Button>
            </div>

            {auth?.token && (
              <Tooltip className="bg-red-500" label="Orders">
                <NavLink to="/myorder" type="button" className="relative p-3">
                  {/* <BsFillArchiveFill className="text-xl text-gray-600 dark:text-gray-400" /> */}
                  <label htmlFor="">Orders</label>
                </NavLink>
              </Tooltip>
            )}
            {!auth.token ? (
              <Tooltip label="Login" className="bg-red-500">
                <NavLink to="/login" type="button" className="relative p-3">
                  <button type="button">
                    <RiAccountCircleLine
                      size={25}
                      className=" text-gray-600 dark:text-gray-400"
                    />
                  </button>
                </NavLink>
              </Tooltip>
            ) : (
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
            {/*  darkmode section */}
            <div>{/* <Darkmode /> */}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
