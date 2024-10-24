import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Axios } from "../../api";

function RemProductList() {
  const { categoryId } = useParams("categoryId");

  const {
    data: productList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getProductsCategoryById", "66d98674d6c1306ddc1088a4"],
    queryFn: () => Axios(`/product/getProductsCategoryById?id=${categoryId}`),
  });

  if (isLoading) return <>Loading...</>;

  if (isError) return <div>Error: {error?.message}</div>;

  console.log(productList);

  if (productList?.data?.products?.length === 0)
    return (
      <div className="flex justify-center items-center">
        No products found for this category
      </div>
    );

  return (
    <div>
      Product List
      <Link to="/productList/:categoryId">
        {productList?.data?.products?.map((product) => (
          <>
            <div>{product?.name}</div>
          </>
        ))}
      </Link>
    </div>
  );
}

export default RemProductList;
