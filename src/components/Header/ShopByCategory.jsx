import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import instance from "../../../api";
import ShopCategory from "../../Pages/ShopCategory";
import axios from "axios";
import { useParams } from "react-router-dom";
import Item from "../Item/Item.jsx";

const ShopByCategory = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState();
  // const fetchProducts = async (id) => {
  //   try {
  //     // const { data } = await axios.get(
  //     //   `https://7bjx1c7g-3000.inc1.devtunnels.ms/product/getProductCategoryById/${id}`
  //     // );
  //     // setproducts(data.product);
  //     if (params.category === "Rani-Phee") {
  //       const res = await instance({
  //         url: `/product/getProductCategoryById/664d9c6ad3fbe4146f8e3baa`,
  //         method: "GET",
  //       });
  //       setproducts(res.data.product);
  //     } else if (params.category === "Wangkhei-Phee") {
  //       const res = await instance({
  //         url: `/product/getProductCategoryById/664d9c63d3fbe4146f8e3ba7`,
  //         method: "GET",
  //       });
  //       setproducts(res.data.product);
  //     } else if (params.category === "Phanek") {
  //       const res = await instance({
  //         url: `/product/getProductCategoryById/664d9c81d3fbe4146f8e3bb0`,
  //         method: "GET",
  //       });
  //       setproducts(res.data.product);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   // if (params.category === "Rani-Phee")
  //   //   fetchProducts("664d9c6ad3fbe4146f8e3baa");
  //   // if (params.category === "Wangkhei-Phee")
  //   //   fetchProducts("664d9c63d3fbe4146f8e3ba7");
  //   // if (params.category === "Phanek") fetchProducts("664d9c81d3fbe4146f8e3bb0");
  //   fetchProducts();
  // }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let categoryId;

        switch (params.category) {
          case "Rani-Phee":
            categoryId = "664d9c6ad3fbe4146f8e3baa";
            break;
          case "Wangkhei-Phee":
            categoryId = "664d9c63d3fbe4146f8e3ba7";
            break;
          case "Phanek":
            categoryId = "664d9c81d3fbe4146f8e3bb0";
            break;
          default:
            break;
        }

        if (categoryId) {
          const res = await instance({
            url: `/product/getProductCategoryById/${categoryId}`,
            method: "GET",
          });
          setProducts(res.data.product);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [params.category]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  console.log(products);
  return (
    <>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden pt-16">
        <Navbar />
        <div className="container text-2xl overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex  items-center flex-col pt-8 gap-y-3.5">
          <div className="container">
            <div className="m-2 grid grid-cols-4 gap-5">
              {products?.map((item, i) => {
                // if (props.category === item.category) {
                return (
                  <Item
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    img={item?.image_id[0]}
                    price={item.price}
                  />
                );
                // } else {
                //   return null;
                // }
              })}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ShopByCategory;
