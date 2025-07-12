import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './Components/SingleComponents/ScrollToTop';
// Lazy-loaded components
const NavigationAll = lazy(() => import('./Components/Navigation/NavigationAll'));
const Footer = lazy(() => import('./Components/SingleComponents/Footer'));
const Home = lazy(() => import('./Pages/Home/Home'));
const Sustainibility = lazy(() => import('./Pages/Sustainibility/Sustainibility'));
const About = lazy(() => import('./Pages/About/About'));
const Wheretobuy = lazy(() => import('./Pages/WhereToBuy/Wtb'));
const Shop = lazy(() => import('./Pages/Shop/Shop'));
const Subscribe = lazy(() => import('./Pages/SubscribeAndSave/Sas'));
const Cart = lazy(() => import('./Pages/Cart/Cart'));
const Signup = lazy(() => import('./Pages/Signup/Signup'));
const Login = lazy(() => import('./Pages/LogIn/Login'));
const ForgetPassword = lazy(() => import('./Pages/ForgetPassword/ForgetPassword'));
const UserProfile = lazy(() => import("./Pages/Userprofile/Up"));
const ProductDetails = lazy(() => import('./Pages/ProductDetailsPage/Pdp'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        {/* Navigation Bar */}
        <NavigationAll />
        <Toaster position="top-right" className="w-auto"/>
        {/* Main Content */}
        <main className="min-h-screen pt-[5.9rem]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sustainability" element={<Sustainibility />} />
            <Route path="/about" element={<About />} />
            <Route path="/wheretobuy" element={<Wheretobuy />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </Suspense>
    </Router>
  );
}

export default App;
