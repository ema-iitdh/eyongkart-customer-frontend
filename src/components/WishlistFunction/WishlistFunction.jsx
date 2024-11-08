import { Axios } from "../../../api";

export const handleIsWishlist = async (e, p) => {
  e.preventDefault();
  try {
    const { data } = await Axios.put(`/product/updatefav/${p._id}`, {
      fav: p.fav === "No" ? "Yes" : "No",
    });
    if (data) {
      setWishlistUpdate((prev) => !prev);
    }
  } catch (error) {
    toast.error("Something Happened");
  }
};
