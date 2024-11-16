import React from "react";
import "./App.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import HomePage from "./Pages/HomePage";

import AboutUs from "../src/components/Header/AboutUs";
import Contact from "../src/components/Header/Contact";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDisplay from "./components/ProductDisplay/ProductDisplay";
import Product from "./Pages/Product";

import Carts from "./components/Header/Carts";
import Checkout from "./components/Checkout/Checkout";
import Wishlist from "./components/Wishlist/Wishlist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Myorder from "./components/Myorders/Myorder";
import RemProductList from "./components/RemProductList";
import ChatBox from "./components/Chat/ChatBox";
import SearchBar from "./components/Search/SearchBar";

import CategorySort from "./components/SidebarSort/CategorySort";
import SignupForm from "./components/LoginSignup/SignupForm";
import SignIn from "./components/LoginSignup/SignIn";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchResults from "./components/Search/SearchResult";
import Category from "./components/Category/Category";
import OrderConfirmation from "./components/Myorders/OrderConfirm";

const App = () => {
  const queryclient = new QueryClient();
  return (
    <QueryClientProvider client={queryclient}>
      <MantineProvider>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/" element={<HomePage />} />

            <Route path="/search" element={<SearchBar />} />
            <Route path="/search/:searchTerm" element={<SearchResults />} />

            <Route path="/about" element={<AboutUs />} />

            <Route path="/cart" element={<Carts />} />

            <Route path="/product" element={<Product />}>
              <Route path=":productId" element={<ProductDisplay />} />
            </Route>

            <Route
              path="/sorted/:categoryId/:subcategoryId?"
              element={<CategorySort />}
            />
            <Route path="/category" element={<Category />} />

            <Route path="/orderconfirm" element={<OrderConfirmation />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/myorder" element={<Myorder />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/chat" element={<ChatBox />} />

            <Route
              path="/productList/:categoryId"
              element={<RemProductList />}
            />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
