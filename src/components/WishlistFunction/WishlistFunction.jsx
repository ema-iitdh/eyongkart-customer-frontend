import { useState } from "react";
import { Axios } from "../../../api";

// const [wishlistUpdate, setWishlistUpdate] = useState(false);
export const handleIsWishlist = async (e, p) => {
  e.preventDefault();
  try {
    const { data } = await Axios.put(`/product/updatefav/${p._id}`, {
      fav: p.fav === "No" ? "Yes" : "No",
    });
    if (data) {
      setWishlistUpdate((prev) => !prev);
      toast.success("Success");
    }
  } catch (error) {
    a;
    toast.error("Something Happened");
  }
};
