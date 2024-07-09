import React, { useEffect, useState } from "react";
import Heading from "../Shared/Heading";
import ProductCard from "./ProductCard";
import axios from "axios";
import instance from "../../../api";
import img1 from "../../assets/images/rani1.jpg";
import img2 from "../../assets/images/top1.jpg";
import img3 from "../../assets/images/phanek1.jpg";
import img4 from "../../assets/images/muka2.jpg";
import img5 from "../../assets/images/pheijom3.jpg";
import img6 from "../../assets/images/wangkhei1.jpg";
import img7 from "../../assets/Category/oneplykhudei.jpg";
import img8 from "../../assets/Category/inaphi.jpg";

import { Link } from "react-router-dom";
import collection_men from "../../assets/collection_men";
import collection_women from "../../assets/collection_women";

// const ProductsData = [
//   {
//     id: 1,
//     img: img1,
//     title: "Rani phi",
//     price: "15000",
//     aosDelay: "0",
//   },
//   {
//     id: 2,
//     img: img2,
//     title: "Top",
//     price: "1200",
//     aosDelay: "200",
//   },
//   {
//     id: 3,
//     img: img3,
//     title: "Phanek Mayek Naibi",
//     price: "1600",
//     aosDelay: "400",
//   },
//   {
//     id: 4,
//     img: img4,
//     title: "Muka phi suit",
//     price: "2000",
//     aosDelay: "600",
//   },
// ];
// const ProductsData2 = [
//   {
//     id: 1,
//     img: img5,
//     title: "Pheichom Pumyat suit",
//     price: "15000",
//     aosDelay: "0",
//   },
//   {
//     id: 2,
//     img: img6,
//     title: "Wangkhei phi ",
//     price: "1200",
//     aosDelay: "200",
//   },
//   {
//     id: 3,
//     img: img7,
//     title: "One ply khudei",
//     price: "1600",
//     aosDelay: "400",
//   },
//   {
//     id: 4,
//     img: img8,
//     title: "Inaphi",
//     price: "2000",
//     aosDelay: "600",
//   },
// ];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productMenTypes, setProductMenTypes] = useState([]);
  const [productWomenTypes, setProductWomenTypes] = useState([]);
  const getAllProduct = async () => {
    try {
      const res = await instance({
        url: `/product/allproduct`,
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
        url: `/product/getproductType/667019bc4e4491b37de49d2d`,
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
        url: `/product/getproductType/66704a48ec25cce3b11c92e0`,
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

  console.log(products);
  console.log(productMenTypes);

  return (
    <div className="container  overflow-hidden rounded-3xl min-h-[500px] sm:min-h-[650px] hero-bg-color flex  items-center flex-col pt-6  gap-y-3.5">
      <div className="container">
        {/* Heading section */}
        <Heading title="Latest Products" subtitle={"Explore our products"} />
        {/* Body section */}
        {/* <Link to="/product/productId"> */}

        <ProductCard data={products} />
        {/* <ProductCard data={ProductsData2} /> */}
      </div>

      <div className="container">
        {/* Heading section */}
        <Heading title="Men Products" subtitle={"Explore our men products"} />
        {/* Body section */}
        {/* <Link to="/product/productId"> */}

        <ProductCard data={productMenTypes} />
      </div>

      <div className="container">
        {/* Heading section */}
        <Heading
          title="Women Products"
          subtitle={"Explore our women products"}
        />
        {/* Body section */}
        {/* <Link to="/product/productId"> */}

        <ProductCard data={productWomenTypes} />
      </div>
    </div>
  );
};

export default Products;
