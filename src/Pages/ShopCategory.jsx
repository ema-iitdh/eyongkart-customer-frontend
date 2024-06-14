import React, { useContext } from "react";
import { ShopContext } from "../components/Context/ShopContext";
import Item from "../components/Item/Item";
const ShopCategory = ({ products }) => {
  const { all_product } = useContext(ShopContext);
  console.log(products);
  return (
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
  );
};

export default ShopCategory;
