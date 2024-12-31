import { toast } from 'react-toastify';
import Axios from '../../../api';

export const handleIsWishlist = async (e, product, updateProductState) => {
  e.preventDefault();

  try {
    const newFavStatus = product.fav === 'No' ? 'Yes' : 'No';
    const { data } = await Axios.put(`/product/updatefav/${product._id}`, {
      fav: newFavStatus,
    });

    if (data) {
      updateProductState(product._id, newFavStatus);

      toast.success(
        newFavStatus === 'Yes'
          ? 'Added to wishlist successfully!'
          : 'Removed from wishlist.'
      );
    }
  } catch (error) {
    console.error('Error updating wishlist:', error);
    toast.error('Something went wrong. Please try again.');
  }
};
