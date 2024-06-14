import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Darkmode from "./Darkmode";
import { Link, NavLink } from "react-router-dom";
import { isActive } from "@tiptap/react";
import { IoMdArrowDropdown } from "react-icons/io";
import { GrFavorite } from "react-icons/gr";
import { ShopContext } from "../Context/ShopContext";
// const MenuLinks = [
//   {
//     id: 1,
//     name: "Home",
//     link: "/",
//   },
//   {
//     id: 2,
//     name: "Shop",
//     link: "/shop",
//   },
//   {
//     id: 3,
//     name: "About Us",
//     link: "/about",
//   },
//   {
//     id: 4,
//     name: "Contact",
//     link: "/contact",
//   },
// ];

const DropdownLink = [
  {
    id: 1,
    name: "Rani phee",
    link: "/shop",
  },
  {
    id: 2,
    name: "Wangkhei phee",
    link: "/shop",
  },
  {
    id: 3,
    name: "Muka phee",
    link: "/shop",
  },
  {
    id: 4,
    name: "Kurta",
    link: "/shop",
  },
  {
    id: 5,
    name: "Phanek",
    link: "/shop",
  },
  {
    id: 6,
    name: "Pheijom",
    link: "/shop",
  },
  {
    id: 7,
    name: "Khudei",
    link: "/shop",
  },
  {
    id: 8,
    name: "Top",
    link: "/shop",
  },
];

const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);
  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white duration-200  z-40  fixed top-0 right-0 left-0">
      <div className="py-4">
        <div className="container flex justify-between items-center">
          {/* logo and link section */}
          <div className="flex  items-center gap-3">
            <a
              href="#"
              className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl"
            >
              LS Handloom
            </a>
            {/* menu items */}
            <div className="hidden lg:block">
              <ul className="flex items-center gap-6">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-red-400 text-[18px]" : "text-[18px]"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    isActive ? "text-red-400 text-[18px]" : "text-[18px]"
                  }
                >
                  Shop
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "text-red-400 text-[18px]" : "text-[18px]"
                  }
                >
                  About Us
                </NavLink>

                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "text-red-400 text-[18px]" : "text-[18px]"
                  }
                >
                  Contact
                </NavLink>

                <li className="relative cursor-pointer group  ">
                  <a href="" className=" navbar text-[18px] flex ">
                    <span className="navbar flex items-center text-[18px] mt-1">
                      Catalog
                      <IoMdArrowDropdown />
                    </span>
                  </a>
                  <div className="absolute z-[9999] hidden group-hover:block">
                    <ul className="space-y-1 bg-white w-[200px] rounded-lg">
                      {DropdownLink.map((data, index) => (
                        <li>
                          <a
                            className="text-[16px] inline-block w-full p-1 hover:text-gray-600 hover:bg-whitesmoke  dark:text-black dark:hover:text-gray-600"
                            href={data.link}
                          >
                            {data.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* navbar right section */}
          <div className="flex justify-between items-center gap-4">
            {/* Search bar section */}
            <div className="relative group hidden sm:block">
              <input type="text" placeholder="Search" className="search-bar" />
              <FaSearch className="text-xl text-gray-600 group-hover:text-primary dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 duration-200" />
            </div>
            {/* order button section */}
            <NavLink to="/cart" type="button" className="relative p-3">
              <FaShoppingCart className="text-xl text-gray-600 dark:text-gray-400" />
              <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                {getTotalCartItems()}
              </div>
            </NavLink>
            <NavLink to="/wishlist" type="button" className="relative p-3">
              <GrFavorite className="text-xl text-gray-600 dark:text-gray-400" />
            </NavLink>
            <NavLink to="/login" type="button" className="relative p-3">
              <FaUser className="text-xl text-gray-600 dark:text-gray-400" />
            </NavLink>
            {/*  darkmode section */}
            <div>
              <Darkmode />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
