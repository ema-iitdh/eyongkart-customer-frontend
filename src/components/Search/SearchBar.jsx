import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Axios } from "../../../api";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchProduct, setSearchProduct] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch all products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await Axios({
          url: "/product/allproduct",
          method: "GET",
        });
        setProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Handle search input change
  const handleOnChange = (e) => {
    const value = e.target.value;
    setSearchProduct(value);

    // Filter products based on the search term
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchProduct) {
      navigate(`/search/${searchProduct}`);
    }
  };

  const handleProductClick = (product) => {
    console.log("Selected product:", product);
    setSearchProduct(product.name);
    setFilteredProducts([]);
    navigate(`/search/${product.name}`);
  };

  return (
    <div className="relative group sm:block">
      <input
        type="text"
        placeholder="Search for products"
        className="search-bar"
        value={searchProduct}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      />
      <FaSearch
        onClick={() => searchProduct && navigate(`/search/${searchProduct}`)}
        className="text-xl text-gray-600 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3 duration-200 cursor-pointer"
      />

      {/* Display filtered product list */}
      {searchProduct && filteredProducts.length > 0 && (
        <div className="dropdown">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="dropdown-item cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              {product.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
