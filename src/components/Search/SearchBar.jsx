import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Axios } from "../../../api";
const SearchBar = () => {
  const [products, setproducts] = useState();
  const [newproducts, setNewproducts] = useState();
  const [searchProduct, setSearchProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await Axios({
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

  const handleOnChange = (e) => {
    setSearchProduct(e.target.value);
    const searchProductnew = products.filter((i) =>
      i.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setNewproducts(searchProductnew);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  console.log(searchProduct);
  console.log(newproducts);
  return (
    <>
      <div className="relative group   sm:block">
        <input
          type="text"
          placeholder="Search for products "
          className="search-bar"
          onChange={handleOnChange}
        />
        <FaSearch className="text-xl text-gray-600 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3 duration-200" />
      </div>
    </>
  );
};

export default SearchBar;
