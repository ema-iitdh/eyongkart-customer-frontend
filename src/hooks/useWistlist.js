import React, { useState } from "react";
import { Axios } from "../../api";
import { toast } from "react-toastify"; // Ensure this is imported if you're using toast notifications

export const useWishlist = (productId, initialFavStatus) => {
  const [isInWishlist, setIsInWishlist] = useState(initialFavStatus === "Yes");

  const toggleWishlist = async (e) => {
    e.preventDefault();
    try {
      const newFavStatus = isInWishlist ? "No" : "Yes";
      const { data } = await Axios.put(`/product/updatefav/${productId}`, {
        fav: newFavStatus,
      });

      if (data) {
        setIsInWishlist((prev) => !prev);

        if (newFavStatus === "Yes") {
          toast.success("Wishlist updated successfully!");
        } else {
          toast.info("Removed from wishlist.");
        }
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("Something went wrong.");
    }
  };

  return { isInWishlist, toggleWishlist };
};
