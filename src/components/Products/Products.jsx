import React, { useEffect, useState } from "react";
import Heading from "../Shared/Heading";
import ProductCard from "./ProductCard";
import { Axios } from "../../../api";
import { useQuery } from "@tanstack/react-query";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productMenTypes, setProductMenTypes] = useState([]);
  const [productWomenTypes, setProductWomenTypes] = useState([]);
  const [wishlistUpdate, setWishlistUpdate] = useState(false);

  const getAllProduct = async () => {
    try {
      const res = await Axios({
        url: "/product/allproduct",
        method: "GET",
      });
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  const { data: productList } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
  });
  console.log(productList);

  const getProductbyMenTypes = async () => {
    try {
      const res = await Axios({
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
      const res = await Axios({
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
    <div className="overflow-hidden rounded-3xl min-h-[500px] sm:min-h-[650px]  flex  items-center flex-col pt-6  gap-y-3.5">
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
