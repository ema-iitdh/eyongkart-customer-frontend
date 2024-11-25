import { useState, useEffect, useCallback } from "react";
import { Axios } from "../../api";
import { toast } from "react-toastify";

export const useWishlist = () => {
  const [isInWishlist, setIsInWishlist] = useState({}); // Initialize as an object
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await Axios.get("/product/allproduct");

        if (!Array.isArray(data?.products)) {
          console.error("Invalid products data:", data);
          toast.error("Failed to load products.");
          return;
        }

        const wishlistState = data.products.reduce((acc, product) => {
          if (product?._id && product?.fav !== undefined) {
            acc[product._id] = product.fav === "Yes";
          } else {
            console.warn("Product missing id or fav:", product);
          }
          return acc;
        }, {});

        setIsInWishlist(wishlistState);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleWishlist = useCallback(
    async (productId) => {
      try {
        const newFavStatus = isInWishlist[productId] ? "No" : "Yes";
        const { data } = await Axios.put(`/product/updatefav/${productId}`, {
          fav: newFavStatus,
        });

        if (data) {
          setIsInWishlist((prev) => ({
            ...prev,
            [productId]: newFavStatus === "Yes",
          }));

          if (newFavStatus === "Yes") {
            toast.success("Added to wishlist!");
          } else {
            toast.info("Removed from wishlist.");
          }
        } else {
          toast.error("Failed to update wishlist.");
        }
      } catch (error) {
        console.error("Error updating wishlist:", error);
        toast.error("Something went wrong.");
      }
    },
    [isInWishlist]
  );

  const isInWishlists = useCallback(
    (productId) => Boolean(isInWishlist[productId] || false),
    [isInWishlist]
  );

  return { isInWishlists, toggleWishlist, loading };
};
