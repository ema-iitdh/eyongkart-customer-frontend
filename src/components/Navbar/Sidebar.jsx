import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { GrFavorite } from "react-icons/gr";
import { BsFillArchiveFill, BsFillBoxFill } from "react-icons/bs";
import { Avatar } from "@mantine/core";
import MenCategoryOption from "./MenCategoryOption";
import WomenCategoryOption from "./WomenCategoryOption";
import CategoryOption from "./CategoryOption";
import { X } from "lucide-react";
export default function Sidebar({
  isOpen,
  toggleSidebar,
  filteredMen,
  filteredWomen,
  filteredKids,
}) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 md:w-80 lg:w-96 bg-white text-red-400 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between">
          <NavLink
            to="/"
            className="text-primary tracking-widest uppercase sm:text-3xl"
          >
            <img
              className="w-[55px] h-[50px] object-contain mb-3"
              src="/logo.png"
              alt="Logo"
            />
          </NavLink>
          <button
            type="button"
            onClick={toggleSidebar}
            className="text-black rounded-md md:hidden"
          >
            <X size={24} />
          </button>
        </div>
        <hr className="h-[2px] bg-gray-500" />
        <nav>
          <ul className="space-y-2">
            <li>
              <MenCategoryOption title="MEN" filteredMen={filteredMen} />
            </li>
            <li>
              <WomenCategoryOption
                title="WOMEN"
                filteredWomen={filteredWomen}
              />
            </li>
            <li>
              <CategoryOption title="KIDS" filteredKids={filteredKids} />
            </li>
            <li>
              <NavLink
                to="/cart"
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-red-300"
              >
                <FaShoppingCart size={20} />
                <span>Cart</span>
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
                <span>Sign In</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
