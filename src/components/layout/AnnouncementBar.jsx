import React, { useState, useEffect } from 'react';
import { Sparkles, X, Heart, Gift, Truck } from 'lucide-react';

export const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [mobileIndex, setMobileIndex] = useState(0);

  const announcements = [
    {
      icon: <Sparkles size={13} style={{ color: '#C85A32' }} />,
      highlight: '100% Handcrafted',
      text: 'Crochet, Yarns & Wool Atelier'
    },
    {
      icon: <Gift size={13} style={{ color: '#C85A32' }} />,
      highlight: 'Custom Orders Open',
      text: 'Personalized Gifting Across India 🌸'
    },
    {
      icon: <Heart size={13} style={{ color: '#DE8C82' }} />,
      highlight: 'Made with Love',
      text: "by Artist Saloni Ma'am ♡"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % announcements.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [announcements.length]);

  if (!isVisible) return null;

  return (
    <div style={{
      background: '#F5EBE1',
      color: '#3D261A',
      borderBottom: '1px solid rgba(140, 88, 50, 0.12)',
      padding: '0.38rem 0.75rem',
      fontSize: '0.8rem',
      fontWeight: '600',
      letterSpacing: '0.01em',
      position: 'relative',
      zIndex: 50,
      overflow: 'hidden'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        paddingRight: '1.75rem',
        paddingLeft: '0.5rem'
      }}>
        {/* Desktop View: Full Announcement Line */}
        <div className="d-desktop-announcement" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#8C4328', fontWeight: '700' }}>
            <Sparkles size={13} style={{ color: '#C85A32' }} /> 100% Handcrafted Crochet, Yarns & Wool Atelier
          </span>
          <span style={{ opacity: 0.35, color: '#8C5832' }}>•</span>
          <span style={{ color: '#5A4336' }}>
            Custom Orders & Personalized Gifting Open Across India 🌸
          </span>
          <span style={{ opacity: 0.35, color: '#8C5832' }}>•</span>
          <span style={{ color: '#C85A32', fontWeight: '700' }}>
            Made with Love by Saloni Ma'am ♡
          </span>
        </div>

        {/* Mobile View: Clean Rotating Single-Line Announcement */}
        <div className="d-mobile-announcement" style={{
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: 'calc(100vw - 65px)',
          fontSize: '0.75rem'
        }}>
          {announcements[mobileIndex].icon}
          <span style={{ color: '#8C4328', fontWeight: '700' }}>
            {announcements[mobileIndex].highlight}
          </span>
          <span style={{ color: '#5A4336', opacity: 0.9 }}>
            • {announcements[mobileIndex].text}
          </span>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss announcement"
          style={{
            position: 'absolute',
            right: '0.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'transparent',
            border: 'none',
            color: '#8C5832',
            cursor: 'pointer',
            opacity: 0.7,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
            padding: '2px'
          }}
        >
          <X size={14} />
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .d-desktop-announcement {
            display: none !important;
          }
          .d-mobile-announcement {
            display: inline-flex !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AnnouncementBar;
