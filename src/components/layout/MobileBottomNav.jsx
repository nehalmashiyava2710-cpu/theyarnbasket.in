import React from 'react';
import { Home, Grid, Sparkles, Flower2 } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { useStore } from '../../context/StoreContext';

export const MobileBottomNav = ({ currentRoute, navigate }) => {
  const { directWhatsAppChat } = useStore();

  const handleNav = (route) => {
    navigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className="mobile-bottom-nav"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 950,
        backgroundColor: 'rgba(250, 247, 242, 0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid var(--border-subtle)',
        boxShadow: '0 -4px 20px rgba(46, 28, 20, 0.08)',
        padding: '0.45rem 0.5rem calc(0.45rem + env(safe-area-inset-bottom, 0px)) 0.5rem',
        display: 'none',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}
    >
      {/* Home */}
      <button
        onClick={() => handleNav('home')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          background: 'transparent',
          border: 'none',
          color: currentRoute === 'home' ? 'var(--primary-terracotta)' : 'var(--text-muted)',
          padding: '4px 10px',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        <Home size={20} strokeWidth={currentRoute === 'home' ? 2.5 : 1.8} />
        <span style={{ fontSize: '0.68rem', fontWeight: currentRoute === 'home' ? '700' : '500' }}>
          Home
        </span>
      </button>

      {/* Creations / Shop */}
      <button
        onClick={() => handleNav('shop')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          background: 'transparent',
          border: 'none',
          color: currentRoute === 'shop' || currentRoute === 'categories' ? 'var(--primary-terracotta)' : 'var(--text-muted)',
          padding: '4px 10px',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        <Grid size={20} strokeWidth={currentRoute === 'shop' ? 2.5 : 1.8} />
        <span style={{ fontSize: '0.68rem', fontWeight: currentRoute === 'shop' ? '700' : '500' }}>
          Creations
        </span>
      </button>

      {/* Services & Overview */}
      <button
        onClick={() => handleNav('services')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          background: currentRoute === 'services' ? 'var(--primary-rose-light)' : 'transparent',
          borderRadius: 'var(--radius-sm)',
          border: currentRoute === 'services' ? '1px dashed var(--primary-terracotta)' : '1px solid transparent',
          color: currentRoute === 'services' ? 'var(--primary-terracotta)' : 'var(--text-muted)',
          padding: '4px 10px',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        <Flower2 size={20} strokeWidth={currentRoute === 'services' ? 2.5 : 1.8} />
        <span style={{ fontSize: '0.68rem', fontWeight: currentRoute === 'services' ? '700' : '500' }}>
          Services
        </span>
      </button>

      {/* Custom Order Center Button */}
      <button
        onClick={() => handleNav('custom-order')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          background: currentRoute === 'custom-order' ? 'var(--primary-rose-light)' : 'transparent',
          borderRadius: 'var(--radius-sm)',
          border: currentRoute === 'custom-order' ? '1px dashed var(--primary-terracotta)' : '1px solid transparent',
          color: currentRoute === 'custom-order' ? 'var(--primary-terracotta)' : 'var(--text-muted)',
          padding: '4px 10px',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        <Sparkles size={20} style={{ color: 'var(--accent-gold)' }} strokeWidth={2} />
        <span style={{ fontSize: '0.68rem', fontWeight: '700', color: 'var(--primary-terracotta)' }}>
          Custom
        </span>
      </button>

      {/* Direct WhatsApp Ordering */}
      <button
        onClick={() => directWhatsAppChat('Hi Saloni ma\'am! I would like to inquire about ordering handcrafted creations from The Yarn Basket.')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          background: 'transparent',
          border: 'none',
          color: '#25D366',
          padding: '4px 10px',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        <WhatsAppIcon size={20} color="#25D366" />
        <span style={{ fontSize: '0.68rem', fontWeight: '700', color: '#128C7E' }}>
          WhatsApp
        </span>
      </button>
    </nav>
  );
};
