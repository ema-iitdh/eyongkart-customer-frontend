import React, { useState, useEffect } from "react";
import { createContext } from "react";
import all_product from "../../assets/all_products";
import { Axios } from "../../../api";

export const ShopContext = createContext();

const getInitialCartItems = () => {
  const cart = window.localStorage.getItem("cartItems");
  return cart ? JSON.parse(cart) : [];
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getInitialCartItems);
  const [buyProduct, setBuyProduct] = useState([]);
  const [data, setData] = useState(null);

  const buyNow = (id) => {
    const addData = data.filter((data) => data._id === id);
    localStorage.setItem("checkoutItem", JSON.stringify(addData));
    setBuyProduct(addData);
  };

  const buyFromCart = () => {
    let items = localStorage.getItem("cartItems");
    if (items) {
      items = JSON.parse(items);
      localStorage.setItem("checkoutItem", JSON.stringify(items));
      setBuyProduct(items);
    }
  };

  const fetchProducts = async () => {
    const res = await Axios.get("/product/allproduct");
    setData(res.data.products);
    console.log(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

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
                subtotal: (item.quantity + 1) * item.new_price,
              }
            : item
        );
      } else {
        // If the item is not in the cart, add it with a quantity of 1 and calculate the subtotal
        updatedCartItems = [
          ...prev,
          { ...addData, quantity: 1, subtotal: addData.new_price },
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
          item._id === itemId && item.quantity > 0
            ? {
                ...item,
                quantity: item.quantity - 1,
                subtotal: (item.quantity - 1) * item.new_price,
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

  // const getTotalCartAmount = () => {
  //   const totalAmount = cartItems.reduce((total, item) => {
  //     return total + item.subtotal;
  //   }, 0);

  //   return totalAmount;
  // };
  const getTotalCartAmount = () => {
    let total = 0;
    if (buyProduct.length) {
      buyProduct.map((i) => {
        total = total + i.new_price * i.quantity;
      });
    }
    return total;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
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
    buyFromCart,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
