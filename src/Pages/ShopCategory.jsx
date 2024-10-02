import React, { useContext } from "react";
import { ShopContext } from "../components/Context/ShopContext";
import Item from "../components/Item/Item";
import { Skeleton } from "@mantine/core";
const ShopCategory = ({ products, isSearch, isLoading }) => {
  const { all_product } = useContext(ShopContext);

  return (
    <div className="m-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
      {products && products.length === 0 && isSearch !== "" ? (
        <p className="flex justify-center items-center flex-col text-xl">
          Not Match Product found
        </p>
      ) : (
        products?.map((item, i) => {
          // if (props.category === item.category) {
          return (
            <Item
              key={item._id}
              id={item._id}
              name={item.name}
              img={item?.image_id[0]}
              old_price={item.old_price}
              new_price={item.new_price}
            />
          );
        })
      )}
      {isLoading && (
        <>
          <Skeleton height={300} width={250} square="xl" />
          <Skeleton height={300} width={250} square="xl" />
          <Skeleton height={300} width={250} square="xl" />
          <Skeleton height={300} width={250} square="xl" />
        </>
      )}
    </div>
  );
};

export default ShopCategory;
