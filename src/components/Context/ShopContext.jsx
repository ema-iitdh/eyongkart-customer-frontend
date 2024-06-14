import React, { useState, useEffect } from "react";
import { createContext } from "react";
import all_product from "../../assets/all_products";
import instance from "../../../api";

export const ShopContext = createContext();

// const getDefaultCart = () => {
//   let cart = {};
//   for (let index = 0; index < data.length + 1; index++) {
//     cart[index] = 0;
//   }
//   return cart;
// };
const getInitialCartItems = () => {
  const cart = window.localStorage.getItem("cartItems");
  return cart ? JSON.parse(cart) : [];
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getInitialCartItems);
  const [buyProduct, setBuyProduct] = useState();

  const buyNow = (id) => {
    console.log("buy product");
    const addData = data.find((data) => data._id === id);
    console.log(addData);
    setBuyProduct(addData);
  };
  const [data, setData] = useState(null);

  const fetchProducts = async () => {
    const res = await instance.get("/product/allproduct");
    setData(res.data.products);
    console.log(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  // const addToCart = (itemId) => {
  //   console.log("addtocart function");
  //   console.log(itemId);
  //   const addData = data.find((data) => data._id === itemId);
  //   setCartItems((prev) => [{ ...prev, ...addData }]);
  //   console.log(cartItems);
  // };

  // const addToCart = (itemId) => {
  //   console.log("addToCart function");
  //   console.log(itemId);

  //   // Find the item data by itemId
  //   const addData = data.find((data) => data._id === itemId);

  //   // Update the cartItems state by adding the new item
  //   setCartItems((prev) => {
  //     // Check if the item is already in the cart
  //     const existingItem = prev.find((item) => item._id === itemId);

  //     if (existingItem) {
  //       // If the item is already in the cart, update its quantity and subtotal
  //       return prev.map((item) =>
  //         item._id === itemId
  //           ? {
  //               ...item,
  //               quantity: item.quantity + 1,
  //               subtotal: (item.quantity + 1) * item.price,
  //             }
  //           : item
  //       );
  //     }
  //     // If the item is not in the cart, add it with a quantity of 1 and calculate the subtotal
  //     return [...prev, { ...addData, quantity: 1, subtotal: addData.price }];
  //   });
  // };
  const addToCart = (itemId) => {
    console.log("addToCart function");
    console.log(itemId);

    // Find the item data by itemId
    const addData = data.find((data) => data._id === itemId);

    // Update the cartItems state by adding the new item
    setCartItems((prev) => {
      // Check if the item is already in the cart
      const existingItem = prev.find((item) => item._id === itemId);

      let updatedCartItems;
      if (existingItem) {
        // If the item is already in the cart, update its quantity and subtotal
        updatedCartItems = prev.map((item) =>
          item._id === itemId
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.price,
              }
            : item
        );
      } else {
        // If the item is not in the cart, add it with a quantity of 1 and calculate the subtotal
        updatedCartItems = [
          ...prev,
          { ...addData, quantity: 1, subtotal: addData.price },
        ];
      }

      // Store the updated cartItems in localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      return updatedCartItems;
    });
  };

  const substractQuantity = (itemId) => {
    setCartItems((prev) => {
      // Find the item in the cart
      let updatedCartItems;
      const item = prev.find((item) => item._id === itemId);
      if (item) {
        // If the item is already in the cart, update its quantity and subtotal
        updatedCartItems = prev.map((item) =>
          item._id === itemId
            ? {
                ...item,
                quantity: item.quantity - 1,
                subtotal: (item.quantity - 1) * item.price,
              }
            : item
        );
      }
      return updatedCartItems;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      // Find the item in the cart
      const item = prev.find((item) => item._id === itemId);

      // If the item is not in the cart, return the previous state
      if (!item) {
        return prev;
      }

      // If the quantity is 1, remove the item from the cart
      // if (item.quantity === 1) {
      const updatedCartItems = prev.filter((item) => item._id !== itemId);

      // Update the cart in local storage
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      return updatedCartItems;

      // Otherwise, decrease the quantity and update the subtotal
    });
  };

  const getTotalCartAmount = () => {
    const totalAmount = cartItems.reduce((total, item) => {
      return total + item.subtotal;
    }, 0);

    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    console.log("total item");
    console.log(cartItems.length);
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    console.log(totalItem);
    return cartItems.length;
  };
  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    substractQuantity,
    buyNow,
    buyProduct,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
