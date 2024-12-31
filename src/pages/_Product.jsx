import React, { useContext } from 'react';
import { ShopContext } from '../components/Context/ShopContext';
import { useParams } from 'react-router-dom';

import Footer from '../components/Footer/Footer';
import Navbar from '../components/common/Navbar/Navbar';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));

  return (
    <div>
      <Navbar />
      <ProductDisplay product={product} />

      <Footer />
    </div>
  );
};

export default Product;
