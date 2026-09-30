import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingServiceHub } from './components/layout/FloatingServiceHub';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Toast } from './components/common/Toast';
import { LiveSearchModal } from './components/common/LiveSearchModal';
import { QuickViewModal } from './components/common/QuickViewModal';
import { ServiceInquiryModal } from './components/common/ServiceInquiryModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { AuthModal } from './components/account/AuthModal';
import { OrderTrackerModal } from './components/account/OrderTrackerModal';
import { UploadReelModal } from './components/reels/UploadReelModal';
import { ReelViewerModal } from './components/reels/ReelViewerModal';
import { ReelsSection } from './components/reels/ReelsSection';
import { BrandedLoader } from './components/common/BrandedLoader';
import { FlyingYarnCart } from './components/common/FlyingYarnCart';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { WishlistPage } from './pages/WishlistPage';
import { AccountPage } from './pages/AccountPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CustomOrderPage } from './pages/CustomOrderPage';
import { AdminPage } from './pages/AdminPage';
import { ArrowUp } from 'lucide-react';

const MainApp = () => {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [routeParams, setRouteParams] = useState({});
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Always start at the top of Home page whenever user refreshes or opens the site
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
    setCurrentRoute('home');
    setRouteParams({});

    const handleBeforeUnload = () => {
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (route, params = {}) => {
    setCurrentRoute(route);
    setRouteParams(params || {});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Branded Boutique Initial Loader */}
      <BrandedLoader />

      {/* Parabolic Flying Yarn Cart System */}
      <FlyingYarnCart />

      {/* Top Promos & Announcement */}
      <AnnouncementBar />

      {/* Main Glassmorphic Navigation */}
      <Header currentRoute={currentRoute} navigate={navigate} />

      {/* Main Page Routing with Soft Route Transitions */}
      <main key={currentRoute} className="page-enter-transition" style={{ flex: 1 }}>
        {currentRoute === 'home' && <HomePage navigate={navigate} />}
        {currentRoute === 'services' && <ServicesPage navigate={navigate} />}
        {currentRoute === 'shop' && (
          <ShopPage
            navigate={navigate}
            initialCategory={routeParams.category || 'all'}
            initialSearch={routeParams.search || ''}
          />
        )}
        {currentRoute === 'categories' && (
          <ShopPage
            navigate={navigate}
            initialCategory="all"
          />
        )}
        {currentRoute === 'reels' && (
          <div style={{ paddingTop: '2rem' }}>
            <ReelsSection navigate={navigate} />
          </div>
        )}
        {currentRoute === 'product' && (
          <ProductDetailPage
            productId={routeParams.id || 'prod-01'}
            navigate={navigate}
          />
        )}
        {currentRoute === 'cart' && <CartPage navigate={navigate} />}
        {currentRoute === 'checkout' && <CheckoutPage navigate={navigate} />}
        {currentRoute === 'order-success' && (
          <OrderSuccessPage
            orderId={routeParams.orderId}
            navigate={navigate}
          />
        )}
        {currentRoute === 'wishlist' && <WishlistPage navigate={navigate} />}
        {currentRoute === 'account' && <AccountPage navigate={navigate} />}
        {currentRoute === 'about' && <AboutPage navigate={navigate} />}
        {currentRoute === 'contact' && <ContactPage navigate={navigate} />}
        {currentRoute === 'custom-order' && <CustomOrderPage navigate={navigate} />}
        {currentRoute === 'admin' && <AdminPage navigate={navigate} />}
      </main>

      {/* Comprehensive Atelier Footer */}
      <Footer navigate={navigate} />

      {/* Global Interactive Drawers & Modals */}
      <LiveSearchModal navigate={navigate} />
      <QuickViewModal navigate={navigate} />
      <ServiceInquiryModal />
      <UploadReelModal />
      <ReelViewerModal navigate={navigate} />
      <Toast />

      {/* Floating Action Hub (Direct WhatsApp) */}
      <FloatingServiceHub navigate={navigate} />

      {/* Mobile Sticky Bottom App Navigation */}
      <MobileBottomNav currentRoute={currentRoute} navigate={navigate} />

      {/* Back to Top Floating Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="btn-icon d-mobile-hidden"
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '24px',
            zIndex: 90,
            background: 'var(--bg-surface)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border-card)',
            animation: 'fadeIn 0.3s ease'
          }}
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
};

export function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}

export default App;
