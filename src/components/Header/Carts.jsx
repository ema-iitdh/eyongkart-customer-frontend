import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import CartsItems from "../CartITems/CartItems";
import ChatBox from "../Chat/ChatBox";
const Carts = () => {
  return (
    <>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden pt-16">
        <Navbar />

        <CartsItems />
      </div>
      <ChatBox />
      <Footer />
    </>
  );
};

export default Carts;
