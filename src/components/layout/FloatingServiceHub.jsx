import React from 'react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { useStore } from '../../context/StoreContext';

export const FloatingServiceHub = () => {
  const { directWhatsAppChat } = useStore();

  return (
    <div
      className="floating-whatsapp-fab d-mobile-hidden"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 900
      }}
    >
      <button
        onClick={() => directWhatsAppChat()}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: 'var(--radius-xs)',
          background: '#25D366',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
          border: '1.5px solid #FFFFFF',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.55)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.45)';
        }}
        aria-label="Chat on WhatsApp with Saloni"
        title="Chat on WhatsApp with Artist Saloni"
      >
        <WhatsAppIcon size={26} color="#FFFFFF" />
      </button>
    </div>
  );
};

export default FloatingServiceHub;
