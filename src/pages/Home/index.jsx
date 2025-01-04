import { motion } from 'framer-motion';
import { useProducts } from '@/features/products/hooks/useProducts';
import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CarouselTraditional from '@/components/Hero/CarouselTraditional';
import Navbar from '@/components/common/Navbar/Navbar';
import Category from '@/components/Category/Category';
import TopSales from '@/components/Topsales/TopSales';
import PriceStores from '@/components/Pricestores/PriceStores';
import Handicraft from '@/components/Handicraft/Handicraft';
import LatestProducts from '@/components/Products/LatestProducts';
import MenProduct from '@/components/Products/MenProduct';
import Banner from './_components/Banner/Banner';
import raniphi from '@/assets/Category/rani.png';
import { ROUTES } from '@/constants/routes';
import { useCategory } from '@/features/category/hooks/useCategory';
import Footer from '@/components/Footer/Footer';
import WomenProduct from '@/components/Products/WomenProduct';

const HomePage = () => {
  const { data: products, isLoading } = useProducts({ filter: '' });
  const [activeCategory, setActiveCategory] = useState('all');

  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = direction === 'left' ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const filteredProducts =
    activeCategory === 'all'
      ? products?.products
      : products?.products?.filter(
          (product) => product.category === activeCategory
        );

  const { data: categoryData } = useCategory({
    filter: '',
  });

  const beautyCategory = categoryData?.categories?.find(
    (category) => category.name === 'Beauty'
  );

  return (
    <>
      <div className=' bg-gray-50 relative'>
        <Category />
        {/* Hero Section */}
        <CarouselTraditional />
        <TopSales />
        <PriceStores />
        <Handicraft />
        <LatestProducts />
        <MenProduct />
        <WomenProduct />
        {/* <Banner
          discount={50}
          title='Beauty'
          date='1st July to 30th July'
          imageUrl={raniphi}
          title2='Manipur Traditional'
          title3='Attire Sales'
          bgColor='#f42c37'
          to={`${ROUTES.COLLECTIONS}/Beauty?${
            beautyCategory ? `category=${beautyCategory._id}&` : ''
          }variants.price.discount_gte=50`}
        /> */}
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
