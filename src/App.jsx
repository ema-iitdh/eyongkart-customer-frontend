import React from "react";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import HomePage from "./Pages/HomePage";
import Shop from "../src/components/Header/Shop";
import AboutUs from "../src/components/Header/AboutUs";
import Contact from "../src/components/Header/Contact";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/LoginSignup/Login";
import ProductDisplay from "./components/ProductDisplay/ProductDisplay";
import Product from "./Pages/Product";
import ShopCategory from "./Pages/ShopCategory";
import CreateAccount from "./components/LoginSignup/CreateAccount";
import Carts from "./components/Header/Carts";

const App = () => {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/productdisplay" element={<ProductDisplay />} />
          <Route path="/cart" element={<Carts />} />
          {/* <Route path="/shop" element={<ShopCategory />} /> */}
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<ProductDisplay />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
};

export default App;
