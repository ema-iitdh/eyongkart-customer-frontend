import { useProducts } from '@/features/products/hooks/useProducts';
import GroupCardViewMore from '@/components/common/GroupCardViewMore';
import { ROUTES } from '@/constants/routes';

const queriesString = {
  discountLessThan50:
    'variants.price.discount_gt=0&variants.price.discount_lte=50&limit=none',
  priceLessThan500:
    'variants.price.discountedPrice_lte=500&variants.price.discountedPrice_gt=0&limit=none',
  priceLessThan1000:
    'variants.price.discountedPrice_lte=1000&variants.price.discountedPrice_gt=500&limit=none',
};

export default function OffersWrapper() {
  const { data: productsDiscount50Percent, isLoading: isLoading50Percent } =
    useProducts({
      filter: queriesString.discountLessThan50,
    });

  const { data: productsDiscountPriceBelow500, isLoading: isLoadingBelow500 } =
    useProducts({
      filter: queriesString.priceLessThan500,
    });

  const {
    data: productsDiscountPriceBelow1000,
    isLoading: isLoadingBelow1000,
  } = useProducts({
    filter: queriesString.priceLessThan1000,
  });

  return (
    <div className='bg-gray-50 my-2 container '>
      <div className='flex flex-col gap-2 sm:flex-row sm:flex-wrap justify-center lg:justify-between '>
        <GroupCardViewMore
          loading={isLoading50Percent}
          products={productsDiscount50Percent?.products}
          seeMoreLink={`${
            ROUTES.COLLECTIONS
          }/Upto 50 Off?${queriesString.discountLessThan50.replace(
            '&limit=none',
            ''
          )}`}
          title='Upto 50% Off | Top Picks'
        />
        <GroupCardViewMore
          loading={isLoadingBelow500}
          products={productsDiscountPriceBelow500?.products}
          seeMoreLink={`${
            ROUTES.COLLECTIONS
          }/Under 500?${queriesString.priceLessThan500.replace(
            '&limit=none',
            ''
          )}`}
          title='Under ₹500 | Best Deals'
        />
        <GroupCardViewMore
          loading={isLoadingBelow1000}
          products={productsDiscountPriceBelow1000?.products}
          seeMoreLink={`${
            ROUTES.COLLECTIONS
          }/Under 1000?${queriesString.priceLessThan1000.replace(
            '&limit=none',
            ''
          )}`}
          title='Under ₹1000 | Best Deals'
        />
      </div>
    </div>
  );
}
