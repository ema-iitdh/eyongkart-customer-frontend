import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";

export default function Layout() {
  return (
    <main>
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
