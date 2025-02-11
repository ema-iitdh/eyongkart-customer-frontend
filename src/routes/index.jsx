import AuthLayout from '@/layouts/AuthLayout';
import CollectionLayout from '@/layouts/CollectionLayout';
import MainLayout from '@/layouts/MainLayout';
import AboutUs from '@/pages/AboutUs';
import Login from '@/pages/Auth/Login';
import Signup from '@/pages/Auth/Signup';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Collections from '@/pages/Collection/Collections';
import HomePage from '@/pages/Home';
import Orders from '@/pages/Order';
import OrderDetail from '@/pages/Order/OrderDetail';
import Product from '@/pages/Product';
import Wishlist from '@/pages/Wishlist';
import NotFound from '@/pages/not-found';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import ProtectedRoute from './ProtectedRoutes';
import RedirectAuthenticatedUser from './RedirectAuthenticatedUser';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsAndConditions from '@/pages/TermsAndConditions';
import CancellationAndRefund from '@/pages/CancellationAndRefund';
import ContactUs from '@/pages/Contact Us';

// TODO: Add ERROR BOUNDARY
export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<RedirectAuthenticatedUser />}>
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGNUP} element={<Signup />} />
          </Route>
        </Route>

        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.COLLECTIONS} element={<CollectionLayout />}>
            <Route
              path={ROUTES.COLLECTIONS_PRODUCTS}
              element={<Collections />}
            />
          </Route>
          <Route path={ROUTES.PRODUCT.LIST}>
            <Route path={ROUTES.PRODUCT.DETAIL} element={<Product />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.CART} element={<Cart />} />
            <Route
              path={ROUTES.CHECKOUT_USING_BUY_NOW}
              element={<Checkout />}
            />
            <Route path={ROUTES.CHECKOUT_FROM_CART} element={<Checkout />} />
            <Route path={ROUTES.WISHLIST} element={<Wishlist />} />
            <Route path={ROUTES.MY_ORDER} element={<Orders />} />
            <Route path={ROUTES.ORDER_DETAIL} element={<OrderDetail />} />
          </Route>
          <Route path={ROUTES.ABOUT_US} element={<AboutUs />} />
          <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicy />} />
          <Route path={ROUTES.TERMS_AND_CONDITIONS} element={<TermsAndConditions />} />
          <Route path={ROUTES.CANCELLATION_AND_REFUND} element={<CancellationAndRefund />} />
          <Route path={ROUTES.CONTACT} element={<ContactUs />} />
        </Route>

        {/* 

        <Route path={ROUTES.SEARCH} element={<SearchBar />} />
        <Route path={ROUTES.SEARCH_RESULTS} element={<SearchResults />} />

        <Route path={ROUTES.ABOUT} element={<AboutUs />} />

          <Route path={ROUTES.CART} element={<Carts />} />
          <Route
            path={ROUTES.ORDER_CONFIRMATION}
            element={<OrderConfirmation />}
          />
          <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
          <Route path={ROUTES.WISHLIST} element={<Wishlist />} />
          <Route path={ROUTES.MY_ORDER} element={<Myorder />} />
          <Route
            path={ROUTES.SHIPPING_AND_DELIVERY}
            element={<ShippingAndDelivery />}
          />

        <Route path={ROUTES.PRODUCT.LIST} element={<Product />}>
          <Route path={ROUTES.PRODUCT.DETAIL} element={<ProductDisplay />} />
        </Route>

        <Route path={ROUTES.SORTED} element={<CategorySort />} />
        <Route path={ROUTES.CATEGORY} element={<Category />} />

        <Route path={ROUTES.CHAT} element={<ChatBox />} />

        <Route path={ROUTES.SELLER_FORM} element={<BecomeSeller />} />
        <Route path={ROUTES.SELL_ON} element={<HowToSellOn />} />
      </Routes>
      <Routes>
        <Route path={ROUTES.SELLER_DASHBOARD} element={<SellerDashboard />} />
        <Route path={ROUTES.SELLER_PRODUCT} element={<SellerProduct />} />
        <Route path={ROUTES.SELLER_ORDER} element={<SellerOrder />} />
      </Routes>

      <Routes>
        <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicy />} />
        <Route
          path={ROUTES.TERMS_AND_CONDITIONS}
          element={<TermsAndConditions />}
        />
        <Route
          path={ROUTES.CANCELLATION_AND_REFUND}
          element={<CancellationAndRefund />}
        />

        <Route path={ROUTES.CONTACT} element={<Contact />} /> */}
        <Route path={'/admin/*'} element={null} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
