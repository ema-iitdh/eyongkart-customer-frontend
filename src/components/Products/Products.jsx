import React from "react";
import Heading from "../Shared/Heading";
import ProductCard from "./ProductCard";

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

const ProductsData = [
  {
    id: 1,
    img: img1,
    title: "Rani phi",
    price: "15000",
    aosDelay: "0",
  },
  {
    id: 2,
    img: img2,
    title: "Top",
    price: "1200",
    aosDelay: "200",
  },
  {
    id: 3,
    img: img3,
    title: "Phanek Mayek Naibi",
    price: "1600",
    aosDelay: "400",
  },
  {
    id: 4,
    img: img4,
    title: "Muka phi suit",
    price: "2000",
    aosDelay: "600",
  },
];
const ProductsData2 = [
  {
    id: 1,
    img: img5,
    title: "Pheichom Pumyat suit",
    price: "15000",
    aosDelay: "0",
  },
  {
    id: 2,
    img: img6,
    title: "Wangkhei phi ",
    price: "1200",
    aosDelay: "200",
  },
  {
    id: 3,
    img: img7,
    title: "One ply khudei",
    price: "1600",
    aosDelay: "400",
  },
  {
    id: 4,
    img: img8,
    title: "Inaphi",
    price: "2000",
    aosDelay: "600",
  },
];

const Products = () => {
  return (
    <div>
      <div className="container">
        {/* Heading section */}
        <Heading title="Our Products" subtitle={"Explore our products"} />
        {/* Body section */}
        {/* <Link to="/product/productId"> */}
        <Link to="/shop">
          <ProductCard data={ProductsData} />
          <ProductCard data={ProductsData2} />
        </Link>
      </div>

      <div className="container">
        {/* Heading section */}
        <Heading title="Men Products" subtitle={"Explore our men products"} />
        {/* Body section */}
        {/* <Link to="/product/productId"> */}
        <Link to="/shop">
          <ProductCard data={collection_men} />
        </Link>
      </div>

      <div className="container">
        {/* Heading section */}
        <Heading
          title="Women Products"
          subtitle={"Explore our women products"}
        />
        {/* Body section */}
        {/* <Link to="/product/productId"> */}
        <Link to="/shop">
          <ProductCard data={collection_women} />
        </Link>
      </div>
    </div>
  );
};

export default Products;
