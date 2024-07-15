import React, { useEffect, useState } from "react";
import Heading from "../Shared/Heading";
import ProductCard from "./ProductCard";
import axios from "axios";
import instance from "../../../api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productMenTypes, setProductMenTypes] = useState([]);
  const [productWomenTypes, setProductWomenTypes] = useState([]);
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
      // const { data } = await axios.get(
      //   `https://7bjx1c7g-3000.inc1.devtunnels.ms/product/getproductType/667019bc4e4491b37de49d2d`
      // );
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
      // const { data } = await axios.get(
      //   `https://7bjx1c7g-3000.inc1.devtunnels.ms/product/getproductType/66704a48ec25cce3b11c92e0`
      // );
      setProductWomenTypes(res.data.productType);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProduct();
    getProductbyMenTypes();
    getProductbyWomenTypes();
  }, []);

  return (
    <div className="overflow-hidden rounded-3xl min-h-[500px] sm:min-h-[650px]  flex  items-center flex-col pt-6  gap-y-3.5">
      <div className="container">
        {/* Heading section */}
        <Heading title="Latest Products" subtitle={"Explore our products"} />
        {/* Body section */}
        {/* <Link to="/product/productId"> */}

        <ProductCard data={products} get={getAllProduct} type="all" />
        {/* <ProductCard data={ProductsData2} /> */}
      </div>

      <div className="container">
        {/* Heading section */}
        <Heading title="Men Products" subtitle={"Explore our men products"} />
        {/* Body section */}
        {/* <Link to="/product/productId"> */}

        <ProductCard data={products} get={getProductbyMenTypes} type="men" />
      </div>

      <div className="container">
        {/* Heading section */}
        <Heading
          title="Women Products"
          subtitle={"Explore our women products"}
        />
        {/* Body section */}
        {/* <Link to="/product/productId"> */}

        <ProductCard data={products} get={getAllProduct} type="women" />
      </div>
    </div>
  );
};

export default Products;
