import React, { useEffect, useState } from "react";
import Heading from "../Shared/Heading";
import ProductCard from "./ProductCard";
import instance from "../../../api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productMenTypes, setProductMenTypes] = useState([]);
  const [productWomenTypes, setProductWomenTypes] = useState([]);
  const [wishlistUpdate, setWishlistUpdate] = useState(false);

  const getAllProduct = async () => {
    try {
      const res = await instance({
        url: "/product/allproduct",
        method: "GET",
      });
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductbyMenTypes = async () => {
    try {
      const res = await instance({
        url: "/product/getproductType/667019bc4e4491b37de49d2d",
        method: "GET",
      });
      setProductMenTypes(res.data.productType);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductbyWomenTypes = async () => {
    try {
      const res = await instance({
        url: "/product/getproductType/66704a48ec25cce3b11c92e0",
        method: "GET",
      });
      setProductWomenTypes(res.data.productType);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
    getProductbyMenTypes();
    getProductbyWomenTypes();
  }, [wishlistUpdate]);

  return (
    <div>
      <div className="container">
        <Heading title="Latest Products" subtitle={"Explore our products"} />
        <ProductCard
          data={products}
          type="all"
          setWishlistUpdate={setWishlistUpdate}
        />
      </div>

      <div className="container">
        <Heading title="Men Products" subtitle={"Explore our men products"} />
        <ProductCard
          data={productMenTypes}
          type="men"
          setWishlistUpdate={setWishlistUpdate}
        />
      </div>

      <div className="container">
        <Heading
          title="Women Products"
          subtitle={"Explore our women products"}
        />
        <ProductCard
          data={productWomenTypes}
          type="women"
          setWishlistUpdate={setWishlistUpdate}
        />
      </div>
    </div>
  );
};

export default Products;
