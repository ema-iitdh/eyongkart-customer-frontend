import React, { useEffect, useState } from "react";
import Heading from "../Shared/Heading";
import ProductCard from "./ProductCard";
import { Axios } from "../../../api";
import { useQuery } from "@tanstack/react-query";
import MenProduct from "./MenProduct";
import AllProductList from "./AllProductList";

const Products = () => {
  const [products, setProducts] = useState();
  const [wishlistUpdate, setWishlistUpdate] = useState(false);
  const [filteredWomenProductList, setFilterWomnenProductList] = useState([]);
  const [filteredMenProductList, setFilterMenProductList] = useState([]);

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
  console.log("products", productList);

  // filteres Men and Women products
  const filteredProduct = () => {
    if (productList?.products) {
      const filteredWomenProduct = productList?.products?.filter(
        (productListItem) => productListItem?.gender === "Female"
      );
      setFilterWomnenProductList(filteredWomenProduct);

      const filteredMenProduct = productList?.products?.filter(
        (productListItem) => productListItem?.gender === "Male"
      );
      setFilterMenProductList(filteredMenProduct);
    }
  };
  useEffect(() => {
    filteredProduct();
  }, [productList]);
  //end

  // const getProductbyMenTypes = async () => {
  //   try {
  //     const res = await Axios({
  //       url: "/product/getproductType/667019bc4e4491b37de49d2d",
  //       method: "GET",
  //     });
  //     setProductMenType s(res.data.productType);
  //   } catch (error) {
  //     console.log(error );
  //   }
  // };
  useEffect(() => {
    getAllProduct();
  }, [wishlistUpdate]);
  return (
    <div className="overflow-hidden rounded-3xl min-h-[500px] sm:min-h-[650px]  flex  items-center flex-col pt-6  gap-y-3.5">
      <div className="container">
        <Heading title="Latest Products" subtitle={"Explore our products"} />
        <AllProductList
          AllProduct={productList}
          type="all"
          setWishlistUpdate={setWishlistUpdate}
        />
      </div>

      <div className="container">
        <Heading title="Men Products" subtitle={"Explore our men products"} />
        <MenProduct
          filteredMenProductList={filteredMenProductList}
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
          filteredWomenProductList={filteredWomenProductList}
          type="women"
          setWishlistUpdate={setWishlistUpdate}
        />
      </div>
    </div>
  );
};

export default Products;
