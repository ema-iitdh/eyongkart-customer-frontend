import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import instance from "../../api";

function RemProductList() {
  const { categoryId } = useParams("categoryId");

  const {
    data: productList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getProductsCategoryById", "66d98674d6c1306ddc1088a4"],
    queryFn: () =>
      instance(`/product/getProductsCategoryById?id=${categoryId}`),
  });

  if (isLoading) return <>Loading...</>;

  if (isError) return <div>Error: {error?.message}</div>;

  console.log(productList);

  if (productList?.data?.products?.length === 0)
    return <div>No products found for this category</div>;

  return (
    <div>
      Product List
      {productList?.data?.products?.map((product) => (
        <>
          <div>{product?.name}</div>
        </>
      ))}
    </div>
  );
}

export default RemProductList;
